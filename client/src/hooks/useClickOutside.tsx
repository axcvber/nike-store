import React from 'react'

export const useOnClickOutside = (ref: React.RefObject<HTMLElement>, handler: (event: Event) => void) => {
  React.useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }
    document.addEventListener('click', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('click', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
