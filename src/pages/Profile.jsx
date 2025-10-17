import React, { useState, useEffect } from 'react'
import { ListeningSession } from '@/entities/all'
import { User } from '@/entities/User'
import { useAudio } from '@/components/context/AudioContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'
import { createPageUrl } from '@/utils'
import { User as UserIcon, Settings, Heart, BarChart, Clock, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const mentalStateOptions = ['anxiety', 'stress', 'insomnia', 'depression', 'pain', 'focus_issues', 'emotional_healing']
const categoryOptions = ['healing', 'chakra', 'meditation', 'sleep', 'focus', 'stress_relief', 'pain_relief']

const formatCategoryLabel = (category) => {
  if (!category || typeof category !== 'string') return ''
  const formatted = category.replace(/_/g, ' ')
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}
const formatStateLabel = (state) => {
  if (!state || typeof state !== 'string') return ''
  const formatted = state.replace(/_/g, ' ')
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export default function Profile() {
  const { user, favorites } = useAudio()
  const [sessions, setSessions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ preferred_categories: [], current_mental_states: [] })
  const [localUser, setLocalUser] = useState(user)

  useEffect(() => {
    const loadSessions = async () => {
      if (user) {
        try {
          const listeningSessions = await ListeningSession.list()
          setSessions(listeningSessions)
          setLocalUser(user)
          setEditData({
            preferred_categories: Array.isArray(user.preferred_categories) ? user.preferred_categories : [],
            current_mental_states: Array.isArray(user.current_mental_states) ? user.current_mental_states : []
          })
        } catch (error) {
          console.error('Error loading session data:', error)
        }
      }
      setIsLoading(false)
    }

    if (user !== null) {
      loadSessions()
    }
  }, [user])

  const handleSaveProfile = async () => {
    try {
      await User.updateMyUserData(editData)
      const updatedUser = { ...localUser, ...editData }
      setLocalUser(updatedUser)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const toggleCategory = (category) => {
    setEditData((prev) => ({
      ...prev,
      preferred_categories: (Array.isArray(prev.preferred_categories) ? prev.preferred_categories : []).includes(category)
        ? (Array.isArray(prev.preferred_categories) ? prev.preferred_categories : []).filter((c) => c !== category)
        : [...(Array.isArray(prev.preferred_categories) ? prev.preferred_categories : []), category]
    }))
  }

  const toggleMentalState = (state) => {
    setEditData((prev) => ({
      ...prev,
      current_mental_states: (Array.isArray(prev.current_mental_states) ? prev.current_mental_states : []).includes(state)
        ? (Array.isArray(prev.current_mental_states) ? prev.current_mental_states : []).filter((s) => s !== state)
        : [...(Array.isArray(prev.current_mental_states) ? prev.current_mental_states : []), state]
    }))
  }

  const totalMinutes = sessions.reduce((sum, session) => sum + (session.duration_minutes || 0), 0)
  const totalSessionsCount = sessions.length
  const favoritesCount = favorites?.length || 0

  if (isLoading || user === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <UserIcon className="w-6 h-6 text-purple-600" />
              Login Required
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">Please log in to view and manage your profile.</p>
            <Button onClick={() => User.login()}>Login to Continue</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 pb-28">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-teal-500 rounded-full flex items-center justify-center mx-auto">
            <UserIcon className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{localUser.full_name || 'User'}</h1>
            <p className="text-gray-600">{localUser.email || ''}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-green-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-green-600" />
                Listening Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-6 h-6 text-green-700" />
                  <span className="text-2xl font-bold text-green-800">{totalMinutes}</span>
                </div>
                <p className="text-sm text-green-600">Minutes Listened</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-700" />
                  <span className="text-2xl font-bold text-green-800">{totalSessionsCount}</span>
                </div>
                <p className="text-sm text-green-600">Total Sessions</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-6 h-6 text-green-700" />
                  <span className="text-2xl font-bold text-green-800">{favoritesCount}</span>
                </div>
                <p className="text-sm text-green-600">Favorites</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-purple-100 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  Profile Settings
                </CardTitle>
                <Button onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))} className={isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'}>
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold text-gray-700">Preferred Categories</Label>
                <p className="text-sm text-gray-500 mb-3">Select your preferred frequency categories for better recommendations.</p>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((category) => {
                    const isSelected = (editData.preferred_categories || []).includes(category)
                    return (
                      <button
                        key={category}
                        onClick={() => isEditing && toggleCategory(category)}
                        disabled={!isEditing}
                        className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          isSelected ? 'bg-purple-100 text-purple-700 border-2 border-purple-300' : 'bg-gray-100 text-gray-600 border-2 border-gray-200'
                        } ${isEditing ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}`}
                      >
                        {formatCategoryLabel(category)}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold text-gray-700">Current Focus Areas</Label>
                <p className="text-sm text-gray-500 mb-3">Let us know what you're currently working on improving.</p>
                <div className="flex flex-wrap gap-2">
                  {mentalStateOptions.map((state) => {
                    const isSelected = (editData.current_mental_states || []).includes(state)
                    return (
                      <button
                        key={state}
                        onClick={() => isEditing && toggleMentalState(state)}
                        disabled={!isEditing}
                        className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          isSelected ? 'bg-teal-100 text-teal-700 border-2 border-teal-300' : 'bg-gray-100 text-gray-600 border-2 border-gray-200'
                        } ${isEditing ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}`}
                      >
                        {formatStateLabel(state)}
                      </button>
                    )
                  })}
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditData({
                        preferred_categories: Array.isArray(localUser.preferred_categories) ? localUser.preferred_categories : [],
                        current_mental_states: Array.isArray(localUser.current_mental_states) ? localUser.current_mental_states : []
                      })
                      setIsEditing(false)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-teal-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Manage Favorites
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">You can view and manage all your saved frequencies in one place.</p>
              <Link to={createPageUrl('Favorites')}>
                <Button variant="outline">Go to My Favorites</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
