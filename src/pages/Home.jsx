import React, { useState, useEffect } from 'react'
import { SolfeggioFrequency } from '@/entities/all'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { createPageUrl } from '@/utils'
import { Music, Heart, Sparkles, ArrowRight, TrendingUp, Clock, Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAudio } from '@/components/context/AudioContext'
import MentalStateFilter from '@/components/filters/MentalStateFilter'
import FrequencyCard from '@/components/frequencies/FrequencyCard'

export default function Home() {
  const { playTrack, handleFavorite, isFavorited } = useAudio()
  const [frequencies, setFrequencies] = useState([])
  const [recommendedFrequencies, setRecommendedFrequencies] = useState([])
  const [popularFrequencies, setPopularFrequencies] = useState([])
  const [selectedStates, setSelectedStates] = useState([])
  const [selectedIntensity, setSelectedIntensity] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    const filterRecommendations = () => {
      let filtered = frequencies

      if (selectedStates.length > 0) {
        filtered = filtered.filter((freq) => freq.mental_states?.some((state) => selectedStates.includes(state)))
      }

      if (selectedIntensity) {
        filtered = filtered.filter((freq) => freq.intensity_level === selectedIntensity)
      }

      const sorted = [...filtered].sort(() => 0.5 - Math.random())
      setRecommendedFrequencies(sorted.slice(0, 3))
    }

    filterRecommendations()
  }, [selectedStates, selectedIntensity, frequencies])

  const loadData = async () => {
    const allFrequencies = await SolfeggioFrequency.list()
    setFrequencies(allFrequencies)
    const sortedPopular = [...allFrequencies].sort(() => 0.5 - Math.random())
    setPopularFrequencies(sortedPopular.slice(0, 6))
  }

  const handleStateChange = (stateId) => {
    setSelectedStates((prev) => (prev.includes(stateId) ? prev.filter((id) => id !== stateId) : [...prev, stateId]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto p-6 space-y-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-6 py-12">
        
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-700 via-teal-600 to-purple-600 bg-clip-text text-transparent">HealingTones</h1>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
          </div>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the transformative power of solfeggio frequencies and therapeutic sound healing. Find peace, reduce stress, and enhance your well-being
            through scientifically-tuned frequencies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={createPageUrl('Library')}>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 shadow-xl hover:shadow-2xl transition-all duration-300">
                <Music className="w-5 h-5 mr-2" />
                Explore Frequencies
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <MentalStateFilter
            selectedStates={selectedStates}
            selectedIntensity={selectedIntensity}
            onStateChange={handleStateChange}
            onIntensityChange={setSelectedIntensity}
            onClear={() => {
              setSelectedStates([])
              setSelectedIntensity('')
            }}
          />
        </motion.div>

        {(selectedStates.length > 0 || selectedIntensity) && recommendedFrequencies.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-purple-600" />
                Recommended For You
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedFrequencies.map((frequency) => (
                <FrequencyCard key={frequency.id} frequency={frequency} onPlay={playTrack} onFavorite={handleFavorite} isFavorited={isFavorited(frequency.id)} />
              ))}
            </div>
          </motion.section>
        )}

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-teal-600" />
              Popular Frequencies
            </h2>
            <Link to={createPageUrl('Library')}>
              <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularFrequencies.map((frequency) => (
              <FrequencyCard key={frequency.id} frequency={frequency} onPlay={playTrack} onFavorite={handleFavorite} isFavorited={isFavorited(frequency.id)} />
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="py-12">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose HealingTones?</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg text-center">Based on Proven Science</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">Each sound is crafted using proven scientific principles to help you feel better, calmer, and more focused.</p>
                </CardContent>
              </Card>
              

              <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-white">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-lg text-center">Personalized For You</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">Get smart recommendations based on how you feel. Find the right sound for your mood and wellness goals.</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-white">
                <CardHeader>
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <CardTitle className="text-lg text-center">Track Your Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">See which frequencies work best for you and keep track of your listening history to understand your path to wellness.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
