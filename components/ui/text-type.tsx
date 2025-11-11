"use client"

import { useState, useEffect } from "react"

interface TextTypeProps {
  text: string[]
  typingSpeed?: number
  pauseDuration?: number
  showCursor?: boolean
  cursorCharacter?: string
}

export default function TextType({
  text,
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
}: TextTypeProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isTyping) {
      if (charIndex < text[textIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[textIndex][charIndex])
          setCharIndex((prev) => prev + 1)
        }, typingSpeed)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, pauseDuration)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1))
        }, typingSpeed / 2)
      } else {
        setTextIndex((prev) => (prev + 1) % text.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [charIndex, displayText, isTyping, text, textIndex, typingSpeed, pauseDuration])

  return (
    <span>
      {displayText}
      {showCursor && <span className="animate-pulse opacity-75">{cursorCharacter}</span>}
    </span>
  )
}
