// Apple/Mac-style sound effects
class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {}
  private enabled: boolean = true

  constructor() {
    if (typeof window !== 'undefined') {
      this.initSounds()
    }
  }

  private initSounds() {
    // Create audio contexts for different Mac-style sounds
    this.createSound('click', this.generateClickSound())
    this.createSound('success', this.generateSuccessSound())
    this.createSound('error', this.generateErrorSound())
    this.createSound('whoosh', this.generateWhooshSound())
    this.createSound('ping', this.generatePingSound())
    this.createSound('pop', this.generatePopSound())
    this.createSound('notification', this.generateNotificationSound())
  }

  private createSound(name: string, audioBuffer: AudioBuffer | string) {
    if (typeof audioBuffer === 'string') {
      // For generated sounds using Web Audio API
      this.sounds[name] = new Audio()
      this.sounds[name].volume = 0.3
    }
  }

  // Generate Mac-style click sound
  private generateClickSound(): string {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioCtx.destination)
    
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1)
    
    oscillator.start(audioCtx.currentTime)
    oscillator.stop(audioCtx.currentTime + 0.1)
    
    return '' // Placeholder - in real implementation would return audio data URL
  }

  private generateSuccessSound(): string {
    // Generate Mac-style success chime
    return ''
  }

  private generateErrorSound(): string {
    // Generate Mac-style error sound
    return ''
  }

  private generateWhooshSound(): string {
    // Generate whoosh sound for transitions
    return ''
  }

  private generatePingSound(): string {
    // Generate ping sound for notifications
    return ''
  }

  private generatePopSound(): string {
    // Generate pop sound for modals/overlays
    return ''
  }

  private generateNotificationSound(): string {
    // Generate notification sound
    return ''
  }

  // Simple Web Audio API implementation for cross-browser compatibility
  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      
      oscillator.type = type
      oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime)
      
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration)
      
      oscillator.start(audioCtx.currentTime)
      oscillator.stop(audioCtx.currentTime + duration)
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  public play(soundName: string) {
    if (!this.enabled) return

    try {
      switch (soundName) {
        case 'click':
          this.playTone(1000, 0.1, 'sine', 0.05)
          break
        case 'success':
          // Mac success chime - three ascending tones
          this.playTone(523.25, 0.2, 'sine', 0.1) // C5
          setTimeout(() => this.playTone(659.25, 0.2, 'sine', 0.1), 100) // E5
          setTimeout(() => this.playTone(783.99, 0.3, 'sine', 0.1), 200) // G5
          break
        case 'error':
          // Mac error sound - descending tone
          this.playTone(300, 0.5, 'square', 0.1)
          break
        case 'whoosh':
          // Transition whoosh - sweeping frequency
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
          const oscillator = audioCtx.createOscillator()
          const gainNode = audioCtx.createGain()
          
          oscillator.connect(gainNode)
          gainNode.connect(audioCtx.destination)
          
          oscillator.type = 'sine'
          oscillator.frequency.setValueAtTime(200, audioCtx.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.3)
          
          gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
          gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.05)
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3)
          
          oscillator.start(audioCtx.currentTime)
          oscillator.stop(audioCtx.currentTime + 0.3)
          break
        case 'ping':
          this.playTone(2000, 0.15, 'sine', 0.08)
          break
        case 'pop':
          // Quick pop for modals
          this.playTone(800, 0.1, 'sine', 0.06)
          setTimeout(() => this.playTone(400, 0.05, 'sine', 0.04), 50)
          break
        case 'notification':
          // Gentle notification sound
          this.playTone(1046.50, 0.2, 'sine', 0.07) // C6
          setTimeout(() => this.playTone(1318.51, 0.3, 'sine', 0.07), 150) // E6
          break
        default:
          console.warn(`Sound "${soundName}" not found`)
      }
    } catch (error) {
      console.log('Audio playback failed:', error)
    }
  }

  public toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }

  public isEnabled() {
    return this.enabled
  }
}

// Export singleton instance
export const soundManager = new SoundManager()

// Utility hook for React components
export const useSounds = () => {
  return {
    playClick: () => soundManager.play('click'),
    playSuccess: () => soundManager.play('success'),
    playError: () => soundManager.play('error'),
    playWhoosh: () => soundManager.play('whoosh'),
    playPing: () => soundManager.play('ping'),
    playPop: () => soundManager.play('pop'),
    playNotification: () => soundManager.play('notification'),
    toggleSounds: () => soundManager.toggle(),
    soundsEnabled: soundManager.isEnabled()
  }
}