export const isStandalone = (): boolean => {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  )
}

export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export const isAndroid = (): boolean => {
  return /Android/.test(navigator.userAgent)
}

export const isMobile = (): boolean => {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const canInstall = (): boolean => {
  return !isStandalone() && 'serviceWorker' in navigator
}

export const isOffline = (): boolean => {
  return !navigator.onLine
}

export const getPlatform = (): 'ios' | 'android' | 'desktop' => {
  if (isIOS()) return 'ios'
  if (isAndroid()) return 'android'
  return 'desktop'
}

export const getPWAStatus = ():
  | 'not-supported'
  | 'installed'
  | 'available'
  | 'unsupported-browser' => {
  if (!('serviceWorker' in navigator)) return 'not-supported'
  if (isStandalone()) return 'installed'
  return 'available'
}

export const getInstallInstructions = () => {
  const platform = getPlatform()
  
  switch (platform) {
    case 'ios':
      return {
        title: 'Install Nelson-GPT on iOS',
        steps: [
          'Tap the Share button at the bottom of your browser',
          'Scroll down and tap "Add to Home Screen"',
          'Tap "Add" to confirm'
        ],
        icon: '⚙️'
      }
    case 'android':
      return {
        title: 'Install Nelson-GPT on Android',
        steps: [
          'Look for the installation prompt that appears automatically',
          'Tap "Install" when the banner appears',
          'Or open the browser menu and tap "Add to Home Screen"'
        ],
        icon: '🤖'
      }
    default:
      return {
        title: 'Install Nelson-GPT',
        steps: [
          'Click the install button in your browser',
          'Or look for the installation prompt',
          'Follow the browser-specific installation process'
        ],
        icon: '💻'
      }
  }
}