import React, { useRef, useState, useEffect } from 'react'

const DESIGN_WIDTH = 1440

function ScaleWrapper({ children }) {
  const innerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    function computeScale() {
      const newScale = window.innerWidth / DESIGN_WIDTH
      setScale(newScale)
      if (innerRef.current) {
        setHeight(innerRef.current.scrollHeight * newScale)
      }
    }

    computeScale()
    window.addEventListener('resize', computeScale)

    const observer = new ResizeObserver(computeScale)
    if (innerRef.current) observer.observe(innerRef.current)

    return () => {
      window.removeEventListener('resize', computeScale)
      observer.disconnect()
    }
  }, [])

  return (
    <div style={{ width: '100%', height, overflow: 'hidden' }}>
      <div
        ref={innerRef}
        style={{
          width: DESIGN_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default ScaleWrapper