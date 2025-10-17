import React, { useState, useEffect, useCallback } from 'react'
import { User, SolfeggioFrequency } from '@/entities/all'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { createPageUrl } from '@/utils'
import { motion } from 'framer-motion'
import { useAudio } from '@/components/context/AudioContext'
import FrequencyCard from '@/components/frequencies/FrequencyCard'

export default function Favorites() {
  const [frequencies, setFrequencies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user, favorites, playTrack, handleFavorite, isFavorited } = useAudio()

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      if (favorites.length > 0) {
        const frequencyIds = favorites.map((fav) => fav.frequency_id)
        const allFrequencies = await SolfeggioFrequency.list()
        const favoriteFrequencies = allFrequencies.filter((freq) => frequencyIds.includes(freq.id))
        setFrequencies(favoriteFrequencies)
      } else {
        setFrequencies([])
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
    setIsLoading(false)
  }, [favorites])

  useEffect(() => {
    if (user === null) return
    if (!user) {
      setIsLoading(false)
      return
    }
    loadData()
  }, [user, favorites, loadData])

  const handleRemoveFavorite = async (frequency) => {
    handleFavorite(frequency)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 flex items-center justify-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full max-w-7xl mx-auto">
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
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Login Required
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">Please log in to view and manage your favorite frequencies.</p>
            <Button onClick={() => User.login()}>Login to Continue</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 to-teal-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
            My Favorites
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Your personal collection of healing frequencies. Access your most effective therapeutic sounds for quick and easy wellness sessions.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {frequencies.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-3">No Favorites Yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">Start building your personal collection by exploring our frequency library and saving the ones that resonate with you.</p>
              <Link to={createPageUrl('Library')}>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600">
                  <Plus className="w-5 h-5 mr-2" />
                  Explore Frequencies
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{frequencies.length} Saved Frequencies</h2>
                <Link to={createPageUrl('Library')}>
                  <Button variant="outline" className="border-purple-300 hover:bg-purple-50">
                    <Plus className="w-4 h-4 mr-2" />
                    Add More
                  </Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {frequencies.map((frequency, index) => (
                  <motion.div key={frequency.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <FrequencyCard frequency={frequency} onPlay={playTrack} onFavorite={handleRemoveFavorite} isFavorited={isFavorited(frequency.id)} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
