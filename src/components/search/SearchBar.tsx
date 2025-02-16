"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Search, Loader2, BookOpen, GraduationCap, X } from "lucide-react";
import { useId } from "react";
import { Input } from "@/components";
import { searchCourses } from "@/actions/course/search-courses";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";
import { Course } from "@/interface";

interface SearchBarProps {
  onSearch?: (results: Course[]) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Course[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchId = useId();
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchCourses(term);
      setResults(searchResults);
      onSearch?.(searchResults);
    } catch (error) {
      console.error("Error searching courses:", error);
    } finally {
      setIsLoading(false);
    }
  }, [onSearch]);

  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, handleSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      setIsSearching(true);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
    setIsSearching(false);
    inputRef.current?.focus();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!searchRef.current?.contains(e.target as Node)) {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div 
        role="search" 
        aria-label="Buscar cursos"
        className="relative group"
      >
        <div className="relative">
          <Search
            className="absolute w-5 h-5 text-gray-400 transition-colors -translate-y-1/2 left-4 top-1/2 group-focus-within:text-primaryper"
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            aria-labelledby={searchId}
            id={searchId}
            type="search"
            placeholder="¿Qué quieres aprender hoy?"
            className="w-full pl-12 py-3 bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-neutral-800 rounded-2xl transition-all duration-200 
              focus:border-primaryper dark:focus:border-primaryper focus:ring-1 focus:ring-primaryper dark:focus:ring-primaryper
              placeholder:text-gray-400 dark:placeholder:text-gray-500"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsSearching(true)}
          />
        </div>
      </div>

      {isSearching && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden bg-white border shadow-lg dark:bg-neutral-900 rounded-xl border-neutral-200 dark:border-neutral-800">
          <div className="p-2">
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="w-5 h-5 animate-spin text-primaryper" />
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">
                  {searchTerm ? "No se encontraron cursos" : "Empieza a escribir para buscar cursos"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-neutral-800">
                {results.map((course) => (
                  <Link
                    key={course.id}
                    href={`/app/course/${course.id}`}
                    className="flex items-start gap-3 p-3 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800"
                  >
                    <div className="p-2 rounded-lg bg-primaryper/10">
                      <GraduationCap className="w-5 h-5 text-primaryper" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {course.category && (
                          <span className="px-2 py-1 text-xs font-medium text-primaryper bg-primaryper/10 rounded-full">
                            {course.category.name}
                          </span>
                        )}
                        {course.UserProgress?.[0] && (
                          <span className="text-xs text-gray-400">
                            {course.UserProgress[0].progress}% completado
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
