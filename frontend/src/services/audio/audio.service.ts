type AudioType = 'action' | 'success' | 'error' | 'warning'

const sounds: Record<AudioType, string> = {
  action: '/sounds/click.wav',
  success: '/sounds/success.wav',
  error: '/sounds/error.wav',
  warning: '/sounds/warning.wav',
}

class AudioService {
  private audio: Partial<Record<AudioType, HTMLAudioElement>> = {}

  private getAudio(type: AudioType): HTMLAudioElement {
    if (!this.audio[type]) {
      const audio = new Audio(sounds[type])
      audio.preload = 'auto'
      audio.volume = 0.7
      this.audio[type] = audio
    }

    return this.audio[type]!
  }

  play(type: AudioType) {
    try {
      const audio = this.getAudio(type)

      audio.currentTime = 0

      const playPromise = audio.play()
      if (playPromise) {
        void playPromise.catch(() => {
          console.warn(`Não foi possível reproduzir o áudio de tipo: ${type}`)
        })
      }
    } catch (error) {
      console.warn(`Erro ao iniciar o áudio de tipo: ${type}`, error)
    }
  }
}

export const audioService = new AudioService()