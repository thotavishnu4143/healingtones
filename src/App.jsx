import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/layout/Layout'
import Home from '@/pages/Home'
import Library from '@/pages/Library'
import Favorites from '@/pages/Favorites'
import Profile from '@/pages/Profile'
import FrequencyDetails from '@/pages/FrequencyDetails'
import Solfeggio from '@/pages/Solfeggio'




export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/library" element={<Library />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/solfeggio" element={<Solfeggio />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/frequency-details" element={<FrequencyDetails />} />
        {/* Optional informational pages */}
        <Route path="/privacypolicy" element={<div className="p-6">Privacy Policy placeholder</div>} />
        <Route path="/termsofservice" element={<div className="p-6">Terms of Service placeholder</div>} />
      </Routes>
    </Layout>
  )
}
