"use client"

import { useState, useEffect } from "react"

interface TypingTextProps {
  text: string
  typingSpeed?: number
  showCursor?: boolean
  cursorCharacter?: string
}

export default function TypingText({
  text,
  typingSpeed = 50,
  showCursor = false,
  cursorCharacter = "|",
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (!isTyping) return

    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1))
      }, typingSpeed)

      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [displayText, text, typingSpeed, isTyping])

  return (
    <span>
      {displayText}
      {showCursor && isTyping && <span className="animate-pulse opacity-75">{cursorCharacter}</span>}
    </span>
  )
}

