import { useEffect } from "react"

import { useAudioFeedback } from "@/hooks/useAudioFeedback"

export function GlobalActionSound() {
  const { playAction } = useAudioFeedback()

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const button = target.closest('button')

      if (!button) {
        return
      }

      if (
        button.disabled ||
        button.getAttribute('aria-disabled') === 'true'
      ) {
        return
      }

      playAction()
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [playAction])

  return null
}