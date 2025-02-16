"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useCompletion } from 'ai/react';
import { 
  Loader2,
  X,
  Plus,
  Sparkles,
  Mail,
  Calendar,
  Building2,
  Trophy,
  Briefcase
} from "lucide-react";
import { toast } from "sonner";
import { getCompanyEmployees,createRequirementAndCourses,getCategories } from "@/actions";

interface Employee {
  id: string;
  name: string;
  lastname?: string;
  email: string;
  role: string;
  exp: number;
  joinedDate: Date;
  completedCourses: number;
  totalXP: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface Requirement {
  name: string;
  description: string;
  categoryId: string;
  skillsDesired: string[];
  employeeIds: string[];
  [key: string]: string | string[];
}

const AIButton = ({ onClick, isLoading }: { onClick: () => void; isLoading: boolean }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className="group flex items-center gap-2 px-4 py-2 
      bg-gradient-to-r from-primaryper/90 to-primaryper 
      hover:from-primaryper hover:to-primaryper/90
      text-white text-sm font-medium rounded-xl
      shadow-sm hover:shadow-md transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isLoading ? (
      <Loader2 className="w-4 h-4 animate-spin" />
    ) : (
      <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
    )}
    <span>Sugerir con IA</span>
  </button>
);

export default function AdminRequirements() {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentRequirement, setCurrentRequirement] = useState<Requirement>({
    name: "",
    description: "",
    categoryId: "",
    skillsDesired: [],
    employeeIds: [],
  });

  const { complete, isLoading: isAILoading } = useCompletion({
    api: '/api/requirementsgeneratecourse',
  });

  // Cargar empleados y categorías
  useEffect(() => {
    const loadData = async () => {
      try {
        if (session?.user?.companyId) {
          // Cargar empleados
          const employeesResult = await getCompanyEmployees(
            session.user.companyId
          );
          setEmployees(employeesResult.employees);

          // Cargar categorías
          const categoriesResult = await getCategories();
          setCategories(categoriesResult);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
        toast.error("Error al cargar datos necesarios");
      }
    };

    loadData();
  }, [session]);

  const resetForm = () => {
    setCurrentRequirement({
      name: "",
      description: "",
      categoryId: "",
      skillsDesired: [],
      employeeIds: [],
    });
  };

  const handleCreateRequirement = async () => {
    try {
      setLoading(true);

      if (!session?.user?.companyId) {
        throw new Error("No se encontró ID de la empresa");
      }

      // Validaciones
      if (!currentRequirement.name.trim()) {
        throw new Error("El nombre es requerido");
      }

      if (!currentRequirement.description.trim()) {
        throw new Error("La descripción es requerida");
      }

      if (!currentRequirement.categoryId) {
        throw new Error("La categoría es requerida");
      }

      if (currentRequirement.skillsDesired.length === 0) {
        throw new Error("Debe especificar al menos una habilidad deseada");
      }

      if (currentRequirement.employeeIds.length === 0) {
        throw new Error("Debe seleccionar al menos un empleado");
      }

      const result = await createRequirementAndCourses({
        ...currentRequirement,
        companyId: session.user.companyId,
      });

      toast.success(
        `Cursos generados exitosamente para ${result.usersAffected} empleados`
      );

      resetForm();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAIGenerate = async (field: string) => {
    try {
      let prompt = '';
      
      if (field === 'skills') {
        prompt = `Genera una lista de habilidades técnicas y competencias necesarias para: "${currentRequirement.name || 'un curso de desarrollo'}"
        IMPORTANTE: Responde SOLO con un JSON en formato: {"skills": ["habilidad1", "habilidad2", ...]}`;
      } else {
        switch (field) {
          case 'name':
            prompt = `Mejora y enriquece profesionalmente este título de curso manteniendo su esencia: "${currentRequirement.name}"
            IMPORTANTE: 
            - Mantén las palabras clave principales
            - Hazlo más profesional y atractivo
            - NO cambies el tema principal
            - Responde en formato: {"name": "título mejorado"}`;
            break;
          case 'description':
            prompt = `Genera una descripción detallada para un requerimiento llamado "${currentRequirement.name}"`;
            break;
        }
      }

      const completion = await complete(prompt);
      if (!completion) return;

      try {
        const aiSuggestion = JSON.parse(completion.trim());
        
        if (field === 'skills' && Array.isArray(aiSuggestion.skills)) {
          setCurrentRequirement(prev => ({
            ...prev,
            skillsDesired: aiSuggestion.skills
          }));
        } else {
          setCurrentRequirement(prev => ({
            ...prev,
            [field]: aiSuggestion[field] || prev[field],
          }));
        }
      } catch (error) {
        console.error('Error parsing AI suggestion:', error);
        toast.error('Error al procesar la sugerencia de IA');
      }
    } catch (error) {
      console.error('Error generating suggestion:', error);
      toast.error('Error al generar sugerencia con IA');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Gestión de Requerimientos
          </h1>
          <AIButton 
            onClick={() => {
              // Generar todo el contenido de una vez
              handleAIGenerate('name');
              setTimeout(() => handleAIGenerate('description'), 1000);
              setTimeout(() => handleAIGenerate('skills'), 2000);
            }}
            isLoading={isAILoading}
          />
        </div>

        <div className="bg-gray-50 dark:bg-neutral-800 rounded-2xl border border-gray-200 dark:border-neutral-700 shadow-sm">
          <div className="p-6 space-y-6">
            {/* Nombre del Requerimiento */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre del Requerimiento
                </label>
              </div>
              <input
                type="text"
                value={currentRequirement.name}
                onChange={(e) => setCurrentRequirement({...currentRequirement, name: e.target.value})}
                className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primaryper focus:border-transparent transition-all"
                placeholder="Ej: Fundamentos de Programación"
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descripción
                </label>
              </div>
              <textarea
                value={currentRequirement.description}
                onChange={(e) => setCurrentRequirement({...currentRequirement, description: e.target.value})}
                className="w-full px-4 py-3 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primaryper focus:border-transparent transition-all"
                rows={4}
                placeholder="Describe los objetivos y expectativas del requerimiento..."
              />
            </div>

            {/* Categoría */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Categoría
              </label>
              <select
                value={currentRequirement.categoryId}
                onChange={(e) =>
                  setCurrentRequirement({
                    ...currentRequirement,
                    categoryId: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primaryper focus:border-transparent transition-all"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Habilidades */}
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Habilidades Deseadas
                  </label>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={currentRequirement.skillsDesired.join(", ")}
                  onChange={(e) =>
                    setCurrentRequirement({
                      ...currentRequirement,
                      skillsDesired: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 
                    border border-gray-300 dark:border-neutral-700 rounded-xl 
                    focus:ring-2 focus:ring-primaryper focus:border-transparent transition-all"
                  placeholder="Ej: JavaScript, React, TypeScript (separadas por coma)"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {currentRequirement.skillsDesired.filter(Boolean).map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 
                        bg-gradient-to-r from-primaryper to-primaryper/80
                        text-white text-sm font-medium rounded-full
                        shadow-sm shadow-primaryper/10"
                    >
                      {skill}
                      <button
                        onClick={() => {
                          const newSkills = currentRequirement.skillsDesired.filter(
                            (_, i) => i !== index
                          );
                          setCurrentRequirement({
                            ...currentRequirement,
                            skillsDesired: newSkills,
                          });
                        }}
                        className="hover:text-red-200 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Empleados */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Seleccionar Empleados
                </label>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {currentRequirement.employeeIds.length} seleccionados
                </span>
              </div>
              
              <div className="mt-2 overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
                <div className="max-h-[400px] overflow-y-auto">
                  {employees.map((employee) => (
                    <label
                      key={employee.id}
                      className="block border-b border-gray-200 dark:border-neutral-700 last:border-0"
                    >
                      <div className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-all cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentRequirement.employeeIds.includes(employee.id)}
                          onChange={(e) => {
                            const newEmployeeIds = e.target.checked
                              ? [...currentRequirement.employeeIds, employee.id]
                              : currentRequirement.employeeIds.filter(
                                  (id) => id !== employee.id
                                );
                            setCurrentRequirement({
                              ...currentRequirement,
                              employeeIds: newEmployeeIds,
                            });
                          }}
                          className="mt-1 rounded border-gray-300 dark:border-neutral-700 text-primaryper focus:ring-primaryper"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white truncate">
                                {employee.lastname ? `${employee.name} ${employee.lastname}` : employee.name}
                              </h4>
                              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <Mail className="w-4 h-4" />
                                <span className="truncate">{employee.email}</span>
                              </div>
                            </div>

                          </div>

                          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <div className="p-1.5 rounded-lg bg-blue-500/10">
                                <Building2 className="w-4 h-4 text-blue-500" />
                              </div>
                              <span className="truncate">
                                {employee.role || 'Sin rol'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <div className="p-1.5 rounded-lg bg-green-500/10">
                                <Calendar className="w-4 h-4 text-green-500" />
                              </div>
                              <span>
                                {new Date(employee.joinedDate || Date.now()).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <div className="p-1.5 rounded-lg bg-amber-500/10">
                                <Trophy className="w-4 h-4 text-amber-500" />
                              </div>
                              <span>{employee.totalXP || 0} XP</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <div className="p-1.5 rounded-lg bg-purple-500/10">
                                <Briefcase className="w-4 h-4 text-purple-500" />
                              </div>
                              <span>{employee.completedCourses || 0} cursos</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                
                {employees.length === 0 && (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No hay empleados disponibles
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-neutral-800/50 border-t border-gray-200 dark:border-neutral-700 rounded-b-2xl">
            <button
              onClick={resetForm}
              type="button"
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateRequirement}
              disabled={loading || currentRequirement.employeeIds.length === 0}
              className="flex items-center gap-2 px-6 py-2 bg-primaryper hover:bg-primaryper/90 disabled:bg-gray-400 dark:disabled:bg-neutral-600 text-white rounded-xl transition-all disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              <span>
                {loading ? "Creando..." : "Crear Requerimiento"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
