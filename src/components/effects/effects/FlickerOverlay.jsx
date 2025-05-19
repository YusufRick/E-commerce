"use client"

import { useEffect, useRef } from "react"

function FlickerOverlay() {
  const overlayRef = useRef(null)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    let flickerTimeout
    let strongFlickerInterval

    function flicker() {
      // Higher intensity for better visibility
      const intensity = 0.3 + Math.random() * 0.4 // Between 0.3 and 0.7

      // Apply flicker
      overlay.style.opacity = intensity

      // Shorter duration for more abrupt effect
      const duration = 30 + Math.random() * 100

      flickerTimeout = setTimeout(() => {
        overlay.style.opacity = 0

        // Shorter delay between flickers
        const delay = 800 + Math.random() * 3000
        flickerTimeout = setTimeout(flicker, delay)
      }, duration)
    }

    // Start immediately
    flicker()

    // Add occasional stronger flickers
    strongFlickerInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        // 40% chance
        const strongIntensity = 0.5 + Math.random() * 0.5 // Between 0.5 and 1.0

        overlay.style.opacity = strongIntensity

        setTimeout(
          () => {
            overlay.style.opacity = 0
          },
          50 + Math.random() * 80,
        )
      }
    }, 2000)

    // Cleanup function
    return () => {
      clearTimeout(flickerTimeout)
      clearInterval(strongFlickerInterval)
    }
  }, [])

  return <div className="flicker-overlay" ref={overlayRef}></div>
}

export default FlickerOverlay
