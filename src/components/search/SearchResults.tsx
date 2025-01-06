'use client'

import { RecommendedCourse } from '@/interface'

interface SearchResultsProps {
  searchTerm: string
  results: RecommendedCourse[]
}

export function SearchResults({ searchTerm, results }: SearchResultsProps) {
  if (!searchTerm) return null

  const message = results.length
    ? `${results.length} resultados para "${searchTerm}"`
    : `No se encontraron resultados para "${searchTerm}"`

  return (
    <div className="px-3 py-2">
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400" role="status">
        {message}
      </p>
      {results.length > 0 ? (
        <ul className="space-y-1" role="listbox" aria-label="Search results">
          {results.map((course) => (
            <li
              key={course.title}
              role="option"
              aria-selected="false"
              className="p-2 text-sm text-gray-700 transition-colors duration-150 ease-in-out bg-transparent rounded-md cursor-pointer dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]"
              tabIndex={0}
            >
              {course.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400" role="status">
          Intenta con otros términos de búsqueda.
        </p>
      )}
    </div>
  )
}