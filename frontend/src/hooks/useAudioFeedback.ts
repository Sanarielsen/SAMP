import { audioService } from '@/services/audio/audio.service'

export function useAudioFeedback() {
  return {
    playAction: () => audioService.play('action'),
    playSuccess: () => audioService.play('success'),
    playError: () => audioService.play('error'),
    playWarning: () => audioService.play('warning'),
  }
}