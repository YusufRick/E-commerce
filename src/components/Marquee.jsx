import { useEffect, useRef } from "react"

function Marquee() {
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      // Duplicate content for continuous scrolling
      contentRef.current.innerHTML += contentRef.current.innerHTML
    }
  }, [])

  return (
    <div className="marquee">
      <div className="marquee-content" ref={contentRef}>
        <span>UNDEFINED</span>
        <span>ALWAYS STRIVE AND PROSPER</span>
        <span>TESTING</span>
        <span>CREATIVE COLLECTIVE</span>
        <span>LITTLE SPECKS</span>
        <span>ALWAYS STRIVE AND PROSPER</span>
        <span>TESTING</span>
        <span>CREATIVE COLLECTIVE</span>
      </div>
    </div>
  )
}

export default Marquee