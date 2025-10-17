import React, { useState, useEffect } from 'react'
import { SolfeggioFrequency } from '@/entities/all'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Music, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '@/components/context/AudioContext'
import FrequencyCard from '@/components/frequencies/FrequencyCard'



const categories = [
  { id: 'all', label: 'All Categories', color: 'bg-gray-100 text-gray-700' },
  { id: 'healing', label: 'Healing', color: 'bg-green-100 text-green-700' },
  { id: 'chakra', label: 'Chakra', color: 'bg-purple-100 text-purple-700' },
  { id: 'meditation', label: 'Meditation', color: 'bg-blue-100 text-blue-700' },
  { id: 'sleep', label: 'Sleep', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'focus', label: 'Focus', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'stress_relief', label: 'Stress Relief', color: 'bg-teal-100 text-teal-700' },
  { id: 'pain_relief', label: 'Pain Relief', color: 'bg-red-100 text-red-700' }
]

export default function Library() {
  const [frequencies, setFrequencies] = useState([])
  const [filteredFrequencies, setFilteredFrequencies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const { playTrack, handleFavorite, isFavorited } = useAudio()

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    const filterFrequencies = () => {
      let filtered = frequencies

  
     if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase()
       filtered = filtered.filter(
         (freq) =>
        freq.name.toLowerCase().includes(lowerSearch) ||
        freq.description?.toLowerCase().includes(lowerSearch) ||
        freq.benefits?.some((benefit) => benefit.toLowerCase().includes(lowerSearch)) ||
        freq.frequency_hz.toString().includes(lowerSearch)
        )
      }


      if (selectedCategory !== 'all') {
        filtered = filtered.filter((freq) => freq.category === selectedCategory)
      }

      setFilteredFrequencies(filtered)
    }

    filterFrequencies()
  }, [searchTerm, selectedCategory, frequencies])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const data = await SolfeggioFrequency.list()
      setFrequencies(data)
      setFilteredFrequencies(data)
    } catch (error) {
      console.error('Error loading frequencies:', error)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 to-teal-600 bg-clip-text text-transparent">Frequency Library</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our comprehensive collection of therapeutic solfeggio frequencies, each carefully crafted to support your wellness journey.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
          <Card className="border-purple-100 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <SlidersHorizontal className="w-5 h-5 text-purple-600" />
                Find Your Perfect Frequency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search frequencies, benefits, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                />
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-gray-700">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                        selectedCategory === category.id ? `${category.color} border-2 border-current shadow-md scale-105` : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-sm text-gray-500">{isLoading ? 'Loading...' : `${filteredFrequencies.length} frequencies found`}</span>
                {(searchTerm || selectedCategory !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('all')
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <Card key={index} className="h-80 animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                        <div className="flex gap-2">
                          <div className="h-6 bg-gray-200 rounded w-16" />
                          <div className="h-6 bg-gray-200 rounded w-20" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : filteredFrequencies.length === 0 ? (
            <div className="text-center py-16">
              <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No frequencies found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search terms or category filters</p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                variant="outline"
              >
                Show All Frequencies
              </Button>
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFrequencies.map((frequency, index) => (
                  <motion.div key={frequency.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: index * 0.1 }}>
                    <FrequencyCard frequency={frequency} onPlay={playTrack} onFavorite={handleFavorite} isFavorited={isFavorited(frequency.id)} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  )
}
