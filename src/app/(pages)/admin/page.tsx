"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getCompanyEmployees } from "@/actions/company/get-company-employees";
import { getCategories } from "@/actions/categories/get-categories";
import { toast } from "sonner";
import { createRequirementAndCourses } from "@/actions/course/create-requirement-course";

interface Employee {
  id: string;
  name: string;
  email: string;
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
}

export default function AdminRequirements() {
  const { data: session } = useSession();
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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">
          Gestión de Requerimientos y Cursos
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Nuevo Requerimiento</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Requerimiento
            </label>
            <input
              type="text"
              value={currentRequirement.name}
              onChange={(e) =>
                setCurrentRequirement({
                  ...currentRequirement,
                  name: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Ej: Fundamentos de Programación"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              value={currentRequirement.description}
              onChange={(e) =>
                setCurrentRequirement({
                  ...currentRequirement,
                  description: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={4}
              placeholder="Describe los objetivos y expectativas del requerimiento..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Habilidades Deseadas
            </label>
            <input
              type="text"
              value={currentRequirement.skillsDesired.join(", ")}
              placeholder="Ej: JavaScript, React, TypeScript (separadas por coma)"
              onChange={(e) =>
                setCurrentRequirement({
                  ...currentRequirement,
                  skillsDesired: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seleccionar Empleados
            </label>
            <div className="mt-2 max-h-48 overflow-y-auto border rounded-md p-2">
              {employees.map((employee) => (
                <label
                  key={employee.id}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={currentRequirement.employeeIds.includes(
                      employee.id
                    )}
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
                    className="rounded border-gray-300"
                  />
                  <span>
                    {employee.name} ({employee.email})
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={resetForm}
              type="button"
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateRequirement}
              disabled={loading || currentRequirement.employeeIds.length === 0}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creando...
                </span>
              ) : (
                "Crear Requerimiento y Generar Cursos"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
