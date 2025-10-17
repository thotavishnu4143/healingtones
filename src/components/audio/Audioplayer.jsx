import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Play, Pause, Heart, Volume2, Volume1, VolumeX, Music, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AudioPlayer({ frequency, onFavorite, isFavorited, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedData = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }
    const handleError = (e) => {
      const audio = e.target
      let errorMessage = 'An unknown audio error occurred.'
      if (audio.error) {
        switch (audio.error.code) {
          case audio.error.MEDIA_ERR_ABORTED:
            errorMessage = 'The playback was aborted by the user.'
            break
          case audio.error.MEDIA_ERR_NETWORK:
            errorMessage = 'A network error caused the audio download to fail.'
            break
          case audio.error.MEDIA_ERR_DECODE:
            errorMessage = 'The audio playback was aborted due to a corruption problem or because the audio used features your browser did not support.'
            break
          case audio.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = 'The audio could not be loaded, either because the server or network failed or because the format is not supported.'
            break
          default:
            errorMessage = `An unknown error occurred (Code: ${audio.error.code}).`
        }
      }
      console.error('Audio Player Error:', errorMessage, audio.error)
      setIsLoading(false)
      setIsPlaying(false)
    }

    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (frequency?.audio_url) {
      if (audio.src !== frequency.audio_url) {
        audio.src = frequency.audio_url
        setIsLoading(true)
        setCurrentTime(0)

        const handleCanPlay = () => {
          audio.play()
            .then(() => {
              setIsPlaying(true)
              setIsLoading(false)
            })
            .catch((err) => {
              console.error('Audio play failed on canplaythrough:', err)
              setIsPlaying(false)
              setIsLoading(false)
            })
          audio.removeEventListener('canplaythrough', handleCanPlay)
        }

        audio.addEventListener('canplaythrough', handleCanPlay)
        audio.load()
      }
    } else {
      audio.pause()
      audio.src = ''
      setIsPlaying(false)
    }
  }, [frequency])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio || isLoading) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((e) => {
          console.error('Failed to play on toggle:', e)
          setIsPlaying(false)
        })
    }
  }

  const handleSeek = (value) => {
    const audio = audioRef.current
    if (!audio || isNaN(value[0])) return
    audio.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value) => {
    const audio = audioRef.current
    if (!audio || isNaN(value[0])) return
    const newVolume = value[0]
    audio.volume = newVolume / 100
    setVolume(newVolume)
  }

  const formatTime = (time) => {
    if (isNaN(time) || time === 0) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2

  if (!frequency) return null

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white/95 backdrop-blur-lg border-t border-purple-100 shadow-[0_-4px_30px_rgba(0,0,0,0.1)] p-4">
        <audio ref={audioRef} preload="metadata" loop />

        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Music className="w-6 h-6 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-gray-900 truncate">{frequency.name}</p>
              <p className="text-sm text-gray-500">{frequency.frequency_hz} Hz</p>
            </div>
          </div>

          <div className="flex-1 hidden md:flex flex-col items-center justify-center gap-2 max-w-lg">
            <div className="flex items-center gap-4">
              <Button onClick={togglePlayPause} disabled={isLoading} size="icon" className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg">
                {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : isPlaying ? <Pause /> : <Play />}
              </Button>
            </div>
            <div className="w-full flex items-center gap-2">
              <span className="text-xs text-gray-500 w-10 text-right">{formatTime(currentTime)}</span>
              <Slider value={[currentTime]} max={duration || 1} onValueChange={handleSeek} disabled={isLoading} />
              <span className="text-xs text-gray-500 w-10">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <VolumeIcon className="w-5 h-5 text-gray-500 cursor-pointer" onClick={() => handleVolumeChange([volume > 0 ? 0 : 70])} />
              <Slider value={[volume]} max={100} onValueChange={handleVolumeChange} className="w-24" />
            </div>

            <Button variant="ghost" size="icon" onClick={() => onFavorite(frequency)}>
              <Heart className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={togglePlayPause} disabled={isLoading}>
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>

            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
