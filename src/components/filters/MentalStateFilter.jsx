import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, Heart, Moon, Zap, Shield, Target, Sparkles } from 'lucide-react'

const mentalStates = [
  { id: 'anxiety', label: 'Anxiety', icon: Brain, color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'stress', label: 'Stress', icon: Zap, color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 'insomnia', label: 'Insomnia', icon: Moon, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { id: 'depression', label: 'Depression', icon: Heart, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'pain', label: 'Pain Relief', icon: Shield, color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'focus_issues', label: 'Focus Issues', icon: Target, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'emotional_healing', label: 'Emotional Healing', icon: Sparkles, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'low energy', label: 'Low Energy', icon: Zap, color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 'low confidence', label: 'Low Confidence', icon: Heart, color: 'bg-pink-100 text-pink-700 border-pink-200' }
]

const intensityLevels = [
  { id: 'mild', label: 'Mild', color: 'bg-green-50 text-green-700 border-green-200' },
  { id: 'moderate', label: 'Moderate', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { id: 'severe', label: 'Severe', color: 'bg-red-50 text-red-700 border-red-200' }
]

export default function MentalStateFilter({ selectedStates = [], selectedIntensity = '', onStateChange, onIntensityChange, onClear }) {
  const safeSelectedStates = Array.isArray(selectedStates) ? selectedStates : []

  return (
    <Card className="bg-gradient-to-br from-white to-purple-50/30 border-purple-100 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          Find Your Healing Frequency
        </CardTitle>
        <p className="text-sm text-gray-600">Select your current mental state and intensity level for personalized recommendations</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">What are you feeling?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {mentalStates.map((state) => {
              const isSelected = safeSelectedStates.includes(state.id)
              const Icon = state.icon

              return (
                <button
                  key={state.id}
                  onClick={() => onStateChange && onStateChange(state.id)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 text-left group hover:scale-105 ${
                    isSelected ? `${state.color} border-current shadow-md scale-105` : 'bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-current' : 'text-gray-600 group-hover:text-purple-600'}`} />
                  <div className={`text-sm font-medium ${isSelected ? 'text-current' : 'text-gray-700 group-hover:text-purple-700'}`}>{state.label}</div>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Intensity Level</h3>
          <div className="flex gap-2">
            {intensityLevels.map((level) => {
              const isSelected = selectedIntensity === level.id

              return (
                <Button
                  key={level.id}
                  variant={isSelected ? 'default' : 'outline'}
                  onClick={() => onIntensityChange && onIntensityChange(level.id)}
                  className={`flex-1 transition-all duration-300 ${isSelected ? `${level.color} border-current hover:scale-105` : 'hover:scale-105'}`}
                >
                  {level.label}
                </Button>
              )
            })}
          </div>
        </div>

        {(safeSelectedStates.length > 0 || selectedIntensity) && (
          <div className="flex items-center justify-between pt-2 border-t border-purple-100">
            <div className="flex flex-wrap gap-1">
              {safeSelectedStates.map((stateId) => {
                const state = mentalStates.find((s) => s.id === stateId)
                return state ? (
                  <Badge key={stateId} variant="secondary" className="text-xs">
                    {state.label}
                  </Badge>
                ) : null
              })}
              {selectedIntensity && (
                <Badge variant="secondary" className="text-xs">
                  {intensityLevels.find((l) => l.id === selectedIntensity)?.label || selectedIntensity}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClear} className="text-gray-500 hover:text-gray-700">
              Clear All
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
