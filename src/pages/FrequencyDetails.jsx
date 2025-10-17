import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SolfeggioFrequency } from '@/entities/all'
import { useAudio } from '@/components/context/AudioContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Heart, Clock, Brain, Sparkles, Check, Ear } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

const formatLabel = (str) => {
  if (!str) return ''
  return str.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

export default function FrequencyDetails() {
  const [searchParams] = useSearchParams()
  const [frequency, setFrequency] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { playTrack, handleFavorite, isFavorited } = useAudio()

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}, [])


  useEffect(() => {
    const frequencyId = searchParams.get('id')
    if (frequencyId) {
      const loadFrequency = async () => {
        setIsLoading(true)
        try {
          const data = await SolfeggioFrequency.get(frequencyId)
          setFrequency(data)
        } catch (error) {
          console.error('Error fetching frequency details:', error)
        }
        setIsLoading(false)
      }
      loadFrequency()
    } else {
      setIsLoading(false)
    }
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-teal-50">
        <div className="w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!frequency) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-teal-50">
        <Card>
          <CardHeader>
            <CardTitle>Frequency Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The requested frequency could not be found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-purple-50 via-white to-teal-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-br from-purple-600 to-teal-500 text-white shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <Badge variant="secondary" className="bg-white/20 text-white mb-2">
                    {formatLabel(frequency.category)}
                  </Badge>
                  <CardTitle className="text-3xl lg:text-4xl font-bold">{frequency.name}</CardTitle>
                  <p className="text-purple-100 text-lg leading-relaxed mt-2">{frequency.description}</p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <p className="text-5xl font-extrabold text-white">
                    {frequency.frequency_hz} <span className="text-2xl font-medium">Hz</span>
                  </p>
                  <Button variant="ghost" onClick={() => handleFavorite(frequency)} className="w-full text-white hover:bg-white/20 rounded-lg flex items-center gap-2">
                    <Heart className={`w-5 h-5 ${isFavorited(frequency.id) ? 'text-red-400 fill-current' : ''}`} />
                    <span>{isFavorited(frequency.id) ? 'Favorited' : 'Add to Favorites'}</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <Button size="lg" onClick={() => playTrack(frequency)} className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white shadow-lg text-lg py-6">
          <Play className="w-6 h-6 mr-3 fill-current" />
          Play This Frequency
        </Button>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" /> Core Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {frequency.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-teal-600" /> Supports Mental State
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {frequency.mental_states?.map((state) => (
                  <Badge key={state} variant="secondary" className="text-base px-3 py-1">
                    {formatLabel(state)}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ear className="w-5 h-5 text-blue-600" />
                  How to Listen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p>For best results, listen with headphones in a quiet, comfortable space where you won't be disturbed.</p>
                <p>Close your eyes, breathe deeply, and allow the sound to wash over you without judgment.</p>
                <p>Consistency is key. Try to incorporate listening sessions into your daily routine.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-600">Intensity</span>
                  <Badge variant="outline">{formatLabel(frequency.intensity_level)}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-600">Duration</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{frequency.duration_minutes} min</span>
                  </div>
                </div>
                {frequency.chakra_association && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-600">Chakra</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {formatLabel(frequency.chakra_association)}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
