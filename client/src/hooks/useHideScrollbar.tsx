import React from 'react'

export const useHideScrollbar = (isOpen: boolean | undefined) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.setAttribute('style', `overflow: hidden;`)
    }
    return () => {
      document.body.setAttribute('style', '')
    }
  }, [isOpen])
}
