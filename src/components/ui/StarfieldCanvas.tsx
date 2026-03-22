import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  twinkleSpeed: number
  twinkleOffset: number
  colorHue: number // 0=white, 1=ice-blue, 2=violet
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const frameRef = useRef(0)
  const rafRef = useRef<number>(0)
  const frameCountRef = useRef(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const starCount = reduceMotion ? 0 : isMobile ? 110 : 180

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 0.5 + Math.random() * 1.5,
      opacity: 0.3 + Math.random() * 0.7,
      speed: 0.02 + Math.random() * 0.06,
      twinkleSpeed: 0.005 + Math.random() * 0.015,
      twinkleOffset: Math.random() * Math.PI * 2,
      colorHue: Math.random() < 0.7 ? 0 : Math.random() < 0.6 ? 1 : 2,
    }))

    const getStarColor = (star: Star, computedOpacity: number): string => {
      if (star.colorHue === 1) return `rgba(0, 180, 216, ${computedOpacity})`
      if (star.colorHue === 2) return `rgba(123, 47, 255, ${computedOpacity * 0.8})`
      return `rgba(232, 234, 246, ${computedOpacity})`
    }

    const onVisibilityChange = () => {
      pausedRef.current = document.hidden || reduceMotion
    }
    onVisibilityChange()
    document.addEventListener('visibilitychange', onVisibilityChange)

    const draw = () => {
      if (pausedRef.current) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      frameCountRef.current++
      // Throttle to ~30fps
      if (frameCountRef.current % 2 !== 0) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      starsRef.current.forEach(star => {
        // Twinkle
        const twinkle = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(frameRef.current * star.twinkleSpeed + star.twinkleOffset))
        const computedOpacity = star.opacity * twinkle

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = getStarColor(star, computedOpacity)
        ctx.fill()

        // Slow downward drift
        star.y += star.speed
        if (star.y > canvas.height + 2) {
          star.y = -2
          star.x = Math.random() * canvas.width
        }
      })

      frameRef.current++
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
