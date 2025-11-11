import { useEffect, useRef, useState } from 'react'

interface UseCountAnimationOptions {
  start?: number
  end: number
  duration?: number
  suffix?: string
}

export function useCountAnimation({
  start = 0,
  end,
  duration = 2000,
  suffix = ''
}: UseCountAnimationOptions) {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.3 }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const range = end - start

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(start + range * easeOutQuart)
      
      setCount(currentCount)

      if (progress === 1) {
        clearInterval(timer)
      }
    }, 16) // ~60fps

    return () => clearInterval(timer)
  }, [isVisible, start, end, duration])

  return {
    count: count + suffix,
    ref: elementRef
  }
}
