import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download } from 'lucide-react'

const chakraFrequencies = [
  { hz: 396, chakra: 'Root',      icon: '🔴', benefit: 'Releases fear, guilt, and promotes grounding',file: 'audio/396.mp3' },
  { hz: 417, chakra: 'Sacral',    icon: '🟠', benefit: 'Clears past trauma and boosts creativity',  file: 'audio/417.mp3' },
  { hz: 528, chakra: 'Solar Plexus', icon: '🟡', benefit: 'Supports transformation and DNA repair',file: 'audio/528.mp3' },
  { hz: 639, chakra: 'Heart',     icon: '🟢', benefit: 'Encourages love, empathy, and relationship healing',file: 'audio/639.mp3' },
  { hz: 741, chakra: 'Throat',    icon: '🔵', benefit: 'Promotes clear communication and detoxification', file: 'audio/741.mp3' },
  { hz: 852, chakra: 'Third Eye', icon: '🟣', benefit: 'Awakens intuition and spiritual insight', file: 'audio/852.mp3' },
  { hz: 963, chakra: 'Crown',     icon: '⚪', benefit: 'Connects to higher consciousness and unity',file: 'audio/963.mp3' }
]

export default function Solfeggio() {
  // Pause any playing audio before starting a new one
  const handlePlay = (e) => {
    const allAudios = document.querySelectorAll('audio')
    allAudios.forEach(audio => {
      if (audio !== e.target) {
        audio.pause()
        audio.currentTime = 0
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto space-y-10"
      >
        {/* Banner */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src="/assets/banner.png"
            alt="Solfeggio Healing Banner"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-purple-700">
            Solfeggio Frequencies & Chakra Healing
          </h1>
          <p className="text-gray-600 text-base font-semibold max-w-3xl mx-auto">
            Solfeggio frequencies are ancient sound vibrations used to stimulate the body’s energy centers — the chakras. These tones
            promote healing, emotional release, and spiritual awakening by aligning with Earth’s resonance and our brainwave states.
          </p>
        </header>

        {/* Info Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-purple-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-purple-700">🎧 How to Listen</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 font-semibold space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Find a quiet space and relax your body.</li>
                <li>Use headphones or speakers for immersive sound.</li>
                <li>Focus on one chakra at a time or follow a full sequence.</li>
                <li>Visualize energy flowing and blockages clearing.</li>
                <li>Repeat sessions weekly for deeper healing.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-purple-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-purple-700">🌿 Why Choose Solfeggio?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 font-semibold space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Non-invasive healing for body and mind</li>
                <li>Reduces stress, anxiety, and emotional tension</li>
                <li>Stimulates the vagus nerve and brainwave balance</li>
                <li>Rooted in ancient traditions and modern neuroscience</li>
                <li>Correlates with the Earth’s Schumann Resonance</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Chart Image */}
        <img
          src="/assets/chart.webp"
          alt="Chakra Chart"
          className="rounded-lg shadow-md w-full h-auto object-cover"
        />

        {/* Chakra Frequencies Chart */}
        <section>
          <Card className="bg-white/80 backdrop-blur-sm border border-purple-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-purple-700">
                🌈 Chakra Frequencies Chart
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 font-semibold">
              {chakraFrequencies.map(({ hz, chakra, icon, benefit, file }) => (
                <div key={hz} className="space-y-3 p-4 bg-white/60 rounded-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-purple-700 flex items-center gap-3">
                        <span className="text-2xl">{icon}</span>
                        <span>{hz} Hz – {chakra} Chakra</span>
                      </h3>
                      <p className="mt-1 text-gray-600">{benefit}</p>
                    </div>
                    <a
                      href={file}
                      download
                      className="inline-flex items-center gap-2 bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition"
                      aria-label={`Download ${hz} Hz`}
                    >
                      <Download className="w-4 h-4" /> Download
                    </a>
                  </div>
                  <audio
                    controls
                    loop
                    onPlay={handlePlay}
                    className="w-full mt-2 rounded-md"
                    preload="none"
                  >
                    <source src={file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Meditation & Science */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-purple-700">
                  🧘 Guided Meditation Playlist
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 font-semibold space-y-4">
                <p>Follow this sequence to align all chakras:</p>
                <ol className="list-decimal list-inside space-y-1">
                  {chakraFrequencies.map(({ hz, chakra }) => (
                    <li key={hz}>{hz} Hz – {chakra} Chakra</li>
                  ))}
                </ol>
                <p className="text-xs text-gray-500">
                  Tip: Listen in sequence during meditation or yoga for full-body alignment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-purple-100 h-full">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-purple-700">
                  📚 Scientific Support
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 font-semibold space-y-4">
                <p>Scientific studies and sound therapy practitioners suggest that solfeggio frequencies may:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Lower blood pressure and heart rate</li>
                  <li>Reduce pain and inflammation</li>
                  <li>Improve mood and sleep quality</li>
                  <li>Stimulate alpha and theta brainwave states</li>
                  <li>Activate the vagus nerve for emotional regulation</li>
                  <li>Enhance cellular regeneration and immune response</li>
                  <li>Support emotional release and trauma recovery</li>
                  <li>Improve focus, memory, and cognitive clarity</li>
                </ul>
                <p className="text-sm text-gray-600">
                  These effects are often observed in sound healing, vibrational therapy, and meditative practices. While more clinical research is ongoing,
                  many holistic practitioners and wellness communities report consistent benefits from regular exposure to these frequencies.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <img
              src="/assets/bodyhealing.png"
              alt="Healing Frequency Chart"
              className="rounded-lg shadow-md w-full h-full object-cover"
            />
          </div>
        </section>

        {/* PDF Guide */}
        <div className="text-center pt-6">
          <a
            href="/assets/solfeggio-guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            📄 Download PDF Guide
          </a>
        </div>
      </motion.div>
    </div>
  )
}
