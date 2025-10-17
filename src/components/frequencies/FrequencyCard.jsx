import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Heart, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { createPageUrl } from '@/utils'

const categoryColors = {
  healing: 'bg-green-100 text-green-800 border-green-200',
  chakra: 'bg-purple-100 text-purple-800 border-purple-200',
  meditation: 'bg-blue-100 text-blue-800 border-blue-200',
  sleep: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  focus: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  stress_relief: 'bg-teal-100 text-teal-800 border-teal-200',
  pain_relief: 'bg-red-100 text-red-800 border-red-200'
}

const intensityColors = {
  mild: 'bg-green-50 text-green-700 border-green-200',
  moderate: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  severe: 'bg-orange-50 text-orange-700 border-orange-200'
}

const formatLabel = (str) => {
  if (!str || typeof str !== 'string') return 'Unknown'
  return str.replace(/_/g, ' ')
}

export default function FrequencyCard({ frequency, onPlay, onFavorite, isFavorited }) {
  const safeFrequency = frequency || {}
  const categoryLabel = formatLabel(safeFrequency.category)
  const intensityLabel = formatLabel(safeFrequency.intensity_level)
  const benefits = Array.isArray(safeFrequency.benefits) ? safeFrequency.benefits : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link to={`${createPageUrl('FrequencyDetails')}?id=${safeFrequency.id}`} className="block">
        <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden relative flex flex-col cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <CardHeader className="pb-3 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-purple-900 transition-colors duration-200">
                  {safeFrequency.name || 'Unknown Frequency'}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-purple-600">{safeFrequency.frequency_hz || 0}</span>
                  <span className="text-sm text-gray-500 font-medium">Hz</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onFavorite && onFavorite(safeFrequency)
                }}
                className={`w-8 h-8 ${isFavorited ? 'text-red-500' : 'text-gray-400'} hover:scale-110 transition-transform duration-200`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 relative z-10 flex-grow flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {safeFrequency.description || 'No description available'}
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className={`${categoryColors[safeFrequency.category] || 'bg-gray-100 text-gray-700'} border font-medium`}
                >
                  {categoryLabel}
                </Badge>
                {safeFrequency.intensity_level && (
                  <Badge
                    variant="secondary"
                    className={`${intensityColors[safeFrequency.intensity_level] || 'bg-gray-100 text-gray-700'} border font-medium`}
                  >
                    {intensityLabel}
                  </Badge>
                )}
              </div>

              <div className="space-y-2 mt-4">
                <h4 className="font-semibold text-sm text-gray-700">Benefits:</h4>
                <div className="flex flex-wrap gap-1">
                  {benefits.slice(0, 3).map((benefit, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {benefit || 'Unknown benefit'}
                    </Badge>
                  ))}
                  {benefits.length > 3 && (
                    <Badge variant="outline" className="text-xs text-gray-500">
                      +{benefits.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{safeFrequency.duration_minutes || 0} min</span>
              </div>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onPlay && onPlay(safeFrequency)
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Play className="w-4 h-4 mr-2" />
                Play
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
