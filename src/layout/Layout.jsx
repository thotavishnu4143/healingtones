import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { createPageUrl } from '@/utils'
import { Music, Heart, User, Home, Sparkles } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { AudioProvider, useAudio } from '@/components/context/AudioContext'
import AudioPlayer from '@/components/audio/Audioplayer'
import { db } from '@/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const navigationItems = [
  { title: 'Home', url: createPageUrl('Home'), icon: Home },
  { title: 'Frequency Library', url: createPageUrl('Library'), icon: Music },
  { title: 'Solfeggio Frequencies', url: createPageUrl('Solfeggio'), icon: Sparkles },
  { title: 'My Favorites', url: createPageUrl('Favorites'), icon: Heart },
  { title: 'Profile', url: createPageUrl('Profile'), icon: User }
]


function AppLayout({ children }) {
  const location = useLocation()
  const { currentlyPlaying, closePlayer, handleFavorite, isFavorited } = useAudio()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await addDoc(collection(db, 'contacts'), {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: serverTimestamp()
    })
    alert('Message sent successfully!')
    setFormData({ name: '', email: '', message: '' })
  } catch (error) {
    console.error('Error sending message:', error)
    alert('Something went wrong.')
  }
}

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50">
      {/* Main layout */}
      <div className="flex flex-1 w-full">
        <Sidebar className="border-r border-purple-100 bg-white/80 backdrop-blur-sm ">
          <SidebarHeader className="border-b border-purple-100 p-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-teal-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-teal-600 bg-clip-text text-transparent">
                  HealingTones
                </h2>
                <p className="text-sm text-gray-500">Sound Therapy</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-purple-600 uppercase tracking-wider px-2 py-3">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-gradient-to-r hover:from-purple-50 hover:to-teal-50 hover:text-purple-700 transition-all duration-300 rounded-xl mb-1 group ${location.pathname === item.url ||
                            (item.title === 'Frequency Library' &&
                              location.pathname.startsWith(createPageUrl('FrequencyDetails')))
                            ? 'bg-gradient-to-r from-purple-100 to-teal-100 text-purple-700 shadow-sm'
                            : ''
                          }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-purple-100 p-4 space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-xl p-4 text-center">
              <div className="text-sm font-medium text-gray-700">✨ Discover Inner Peace</div>
              <div className="text-xs text-gray-500 mt-1">Through healing frequencies</div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-4 shadow-sm space-y-2">
              <h3 className="text-sm font-bold text-purple-700 mb-2 text-center">📬 Contact Me</h3>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-1 border border-purple-200 rounded text-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-1 border border-purple-200 rounded text-sm"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-3 py-1 border border-purple-200 rounded text-sm"
              />
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-1 rounded text-sm hover:bg-purple-700"
              >
                Send
              </button>
            </form>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-purple-50 p-2 rounded-lg transition-colors duration-200" />
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h1 className="text-xl font-bold text-purple-700">HealingTones</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto pb-28 md:pb-0">{children}</div>

          {currentlyPlaying && (
            <AudioPlayer
              frequency={currentlyPlaying}
              onFavorite={handleFavorite}
              isFavorited={isFavorited(currentlyPlaying.id)}
              onClose={closePlayer}
            />
          )}
        </main>
      </div>

      {/* Full-width Footer */}
      <footer className="w-full bg-gray-800 text-white text-center text-xs py-4 border-t border-gray-700">
        <div className="max-w-5xl mx-auto px-4 space-y-2">
          <p>&copy; {new Date().getFullYear()} HealingTones. All rights reserved.</p>
          <div className="flex justify-center gap-4 text-gray-300">
            <Link to={createPageUrl('PrivacyPolicy')} className="hover:text-white transition">Privacy Policy</Link>
            <Link to={createPageUrl('TermsOfService')} className="hover:text-white transition">Terms of Service</Link>
            <a href="mailto:thotavishnu4143@gmail.com" className="hover:text-white transition">Contact Us</a>
          </div>
          <p className="text-gray-400 pt-2 border-t border-gray-700">
            Disclaimer: This site is for educational purposes only and not medical advice.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AudioProvider>
        <AppLayout>{children}</AppLayout>
      </AudioProvider>
    </SidebarProvider>
  )
}


