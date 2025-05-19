import { useEffect, useRef } from "react"

function FlickerOverlay() {
  const overlayRef = useRef(null)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    let flickerTimeout
    let strongFlickerInterval

    function flicker() {
      const intensity = 0.3 + Math.random() * 0.4
      overlay.style.opacity = intensity
      const duration = 30 + Math.random() * 100

      flickerTimeout = setTimeout(() => {
        overlay.style.opacity = 0
        const delay = 800 + Math.random() * 3000
        flickerTimeout = setTimeout(flicker, delay)
      }, duration)
    }

    flicker()

    strongFlickerInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        const strongIntensity = 0.5 + Math.random() * 0.5
        overlay.style.opacity = strongIntensity
        setTimeout(() => {
          overlay.style.opacity = 0
        }, 50 + Math.random() * 80)
      }
    }, 2000)

    return () => {
      clearTimeout(flickerTimeout)
      clearInterval(strongFlickerInterval)
    }
  }, [])

  return <div className="flicker-overlay" ref={overlayRef}></div>
}

export default FlickerOverlay