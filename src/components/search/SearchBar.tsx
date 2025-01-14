'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Search, } from 'lucide-react'
import { useId } from 'react'
import { RecommendedCourse } from '@/interface'
import { RECOMMENDED_COURSES } from '@/data'
import { Input,  } from '@/components'
import { SearchResults } from './SearchResults'


interface SearchBarProps {
  onSearch: (results: RecommendedCourse[]) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<RecommendedCourse[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const searchId = useId()
  const resultsId = useId()

  const handleSearch = useCallback((term: string) => {
    const filtered = RECOMMENDED_COURSES.filter((c) =>
      c.title.toLowerCase().includes(term.toLowerCase())
    )
    setResults(filtered)
    onSearch(filtered)
  }, [onSearch])

  useEffect(() => {
    if (!searchTerm) {
      setIsSearching(false)
      setResults([])
      return
    }
    setIsSearching(true)
    const timer = setTimeout(() => handleSearch(searchTerm), 300)
    return () => clearTimeout(timer)
  }, [searchTerm, handleSearch])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!searchRef.current?.contains(e.target as Node)) {
        setIsSearching(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])



  return (
    <div ref={searchRef} className="relative w-96">
      <div role="search" aria-label="Buscar cursos" className="relative">
        <label htmlFor={searchId} className="sr-only">
          Buscar cursos
        </label>
        <Search
        
          className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2"
          aria-hidden="true"
        />
        <Input
        aria-labelledby={searchId}
        id={searchId}
          type="search"
          placeholder="Buscar cursos..."
          className="w-full py-2 pl-10 pr-10 bg-gray-100 border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 focus:border-[#6366F1] dark:focus:border-[#7375F3] focus:ring-1 focus:ring-[#6366F1] dark:focus:ring-[#7375F3]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearching(true)}
          aria-controls={resultsId}
          aria-describedby={resultsId}
          role="searchbox"
        />
      
      </div>
      {isSearching && (
        <div
          id={resultsId}
          role="region"
          aria-label="Resultados de búsqueda"
          className="absolute left-0 right-0 z-10 mt-1 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg max-h-80 dark:bg-neutral-800 dark:border-neutral-700 top-full"
        >
          <SearchResults searchTerm={searchTerm} results={results} />
        </div>
      )}
    </div>
  )
}