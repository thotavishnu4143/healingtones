export const createPageUrl = (name) => {
  const map = {
    Home: '/',
    Library: '/library',
    Favorites: '/favorites',
    Profile: '/profile',
    Solfeggio: '/solfeggio',
    FrequencyDetails: '/frequency-details',
    PrivacyPolicy: '/privacypolicy',
    TermsOfService: '/termsofservice'
  }
  return map[name] || '/'
}
