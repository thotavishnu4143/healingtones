import React, { createContext, useState, useContext, useEffect } from 'react'
import { User, UserFavorite } from '@/entities/all'

const AudioContext = createContext(null)

export function AudioProvider({ children }) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userInfo = await User.me()
        setUser(userInfo)
        const userFavorites = await UserFavorite.list()
        setFavorites(userFavorites)
      } catch {
        setUser(false)
        setFavorites([])
      }
    }
    loadUserData()
  }, [])

  const playTrack = (frequency) => setCurrentlyPlaying(frequency)
  const closePlayer = () => setCurrentlyPlaying(null)

  const handleFavorite = async (frequency) => {
    if (!user) {
      User.login()
      return
    }
    if (!frequency || !frequency.id) return

    const isCurrentlyFavorited = favorites.some((fav) => fav.frequency_id === frequency.id)
    if (isCurrentlyFavorited) {
      const favoriteRecord = favorites.find((fav) => fav.frequency_id === frequency.id)
      if (favoriteRecord) {
        await UserFavorite.delete(favoriteRecord.id)
        setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteRecord.id))
      }
    } else {
      const newFavorite = await UserFavorite.create({ frequency_id: frequency.id })
      setFavorites((prev) => [...prev, newFavorite])
    }
  }

  const isFavorited = (frequencyId) => favorites.some((fav) => fav.frequency_id === frequencyId)

  const value = { currentlyPlaying, playTrack, closePlayer, handleFavorite, isFavorited, favorites, user }

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
