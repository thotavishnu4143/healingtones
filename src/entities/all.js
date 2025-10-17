import { sampleFrequencies, sampleFavorites, sampleSessions, sampleUser } from './mockData'

export const SolfeggioFrequency = {
  async list() {
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 300))
    return sampleFrequencies
  },
  async get(id) {
    await new Promise((r) => setTimeout(r, 200))
    return sampleFrequencies.find((f) => String(f.id) === String(id))
  }
}

export const UserFavorite = {
  async list() {
    await new Promise((r) => setTimeout(r, 200))
    return sampleFavorites
  },
  async create({ frequency_id }) {
    await new Promise((r) => setTimeout(r, 150))
    const newFav = { id: String(Date.now()), frequency_id }
    sampleFavorites.push(newFav)
    return newFav
  },
  async delete(id) {
    await new Promise((r) => setTimeout(r, 150))
    const idx = sampleFavorites.findIndex((f) => f.id === id)
    if (idx >= 0) sampleFavorites.splice(idx, 1)
    return true
  }
}

export const ListeningSession = {
  async list() {
    await new Promise((r) => setTimeout(r, 200))
    return sampleSessions
  }
}

export const User = {
  async me() {
    await new Promise((r) => setTimeout(r, 200))
    // Return user or throw to simulate not logged in
    return sampleUser
  },
  login() {
    alert('Redirecting to login...')
  },
  async updateMyUserData(update) {
    await new Promise((r) => setTimeout(r, 200))
    Object.assign(sampleUser, update)
    return sampleUser
  }
}
