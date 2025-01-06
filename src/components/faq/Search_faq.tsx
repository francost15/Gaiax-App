'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQInterface } from '@/interface'
import { faqs } from '@/data'
import { Input,Button } from '@/components'

export const SearchFAQ = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<FAQInterface[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (search.length > 1) {
      const searchResults = faqs.filter(faq => 
        faq.question.toLowerCase().includes(search.toLowerCase()) )
      setResults(searchResults)
      setIsSearching(true)
    } else {
      setResults([])
      setIsSearching(false)
    }
  }, [search])

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="relative">
        <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
        <Input
          type="text"
          placeholder="Busca en las preguntas frecuentes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-6 pl-12 pr-12 text-lg transition-all duration-300 border-2 border-gray-200 rounded-full focus:border-primaryper focus:ring-2 focus:ring-primaryper"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute transform -translate-y-1/2 right-3 top-1/2"
            onClick={() => setSearch('')}
          >
            <X className="w-5 h-5 text-gray-400" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-4 overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl"
          >
            {results.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {results.map((result, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 transition-colors duration-150 cursor-pointer hover:bg-gray-50"
                  >
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{result.question}</h3>
                    <p className="text-base text-gray-600">{result.answer}</p>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
            <p className="mb-2 text-lg">No se encontraron resultados para &quot;{search}&quot;</p>
            <p className="text-base">Intenta con otras palabras o revisa nuestras preguntas frecuentes más abajo.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

