"use client"
import { useEffect, useState } from "react";
import { getUserStats } from "@/actions";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Briefcase,
  GraduationCap,
  Search,
  Filter,
  Mail,
  Building2,
  Clock,
  Award,
  Brain,
  Flame,
  ChevronDown,
  ChevronUp,
  Eye
} from "lucide-react";
import Link from "next/link";

interface UserStatsData {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
  image?: string | null;
  streaks: number;
  exp: number;
  company: {
    id: string;
    name: string;
    address: string;
    phone: string;
    membershipId: string;
  };
  learningPreferences: {
    id: string;
    userId: string;
    formats: string[];
    learningStyleKolb: string;
    availableTime: number;
    goals: string[];
    strengths: string[];
    skillLevel: number | null;
    improvementAreas: string[];
  } | null;
  stats: {
    completedCourses: number;
    coursesInProgress: number;
    totalLessonsCompleted: number;
    achievements: number;
    recentAchievements: string[];
    lastTestResults: Array<{
      testType: string;
      score: number;
      date: string;
    }>;
  };
  progress: Array<{
    courseTitle: string;
    progress: number;
    lessonsCompleted: number;
    totalLessons: number;
  }>;
}

export const UserStats = () => {
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState<UserStatsData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserStatsData[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());

  const roles = ["todos", "admin", "manager", "supervisor", "employee", "intern", "hr", "it"];

  useEffect(() => {
    setMounted(true);
    const fetchUsers = async () => {
      try {
        const usersData = await getUserStats();
        if (usersData && Array.isArray(usersData)) {
          setUsers(usersData);
          setFilteredUsers(usersData);
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let result = users;

    // Filtrar por rol
    if (selectedRole !== "todos") {
      result = result.filter(user => user.role?.toLowerCase() === selectedRole);
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      result = result.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(result);
    setCurrentPage(1); // Resetear a primera página cuando cambian los filtros
  }, [selectedRole, searchTerm, users]);

  if (!mounted) return null;

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const toggleUserExpansion = (userId: string) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedUsers(newExpanded);
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Estadísticas de Usuarios
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredUsers.length} usuarios encontrados
          </p>
        </div>
      </motion.div>

      {/* Header y Filtros */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-neutral-700 
              bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primaryper/20 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 min-w-[200px]">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-neutral-700 
              bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primaryper/20 outline-none"
          >
            {roles.map(role => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-neutral-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-neutral-800">
            <tr>
              <th className="px-4 py-3 text-left">Usuario</th>
              <th className="px-4 py-3 text-left">Rol</th>
              <th className="px-4 py-3 text-center">XP</th>
              <th className="px-4 py-3 text-center">Cursos Completados</th>
              <th className="px-4 py-3 text-center">En Progreso</th>
              <th className="px-4 py-3 text-center">Progreso General</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
            {currentUsers.map((user) => (
              <tr 
                key={user.id}
                className="bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primaryper/10 flex items-center justify-center">
                      {user.image ? (
                        <img 
                          src={user.image} 
                          alt={user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-primaryper font-medium">
                          {user.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {user.name} {user.lastname}
                      </div>
                      <div className="text-gray-500 text-xs">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primaryper/10 text-primaryper">
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Trophy className="w-4 h-4 text-primaryper" />
                    <span>{user.exp}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <BookOpen className="w-4 h-4 text-green-500" />
                    <span>{user.stats.completedCourses}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Target className="w-4 h-4 text-orange-500" />
                    <span>{user.stats.coursesInProgress}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                    <div
                      className="bg-primaryper h-2 rounded-full"
                      style={{ 
                        width: `${Math.round((user.stats.completedCourses / 
                          (user.stats.completedCourses + user.stats.coursesInProgress)) * 100)}%` 
                      }}
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg transition-colors inline-flex"
                  >
                    <Eye className="w-4 h-4 text-gray-500" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-800 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? 'bg-primaryper text-white'
                  : 'bg-gray-100 dark:bg-neutral-800'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-800 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

// Componente auxiliar para las tarjetas de estadísticas
const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="p-4 bg-gray-50 dark:bg-neutral-700/50 rounded-xl">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    </div>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
  </div>
); 