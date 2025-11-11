"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOverWhite, setIsOverWhite] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Get the navbar height
      const navbarHeight = 100
      
      // Check if we're in the white section (About Us section)
      // Adjust these values based on your actual section positions
      const scrollPosition = window.scrollY + navbarHeight
      
      // Get the about section element
      const aboutSection = document.querySelector('section.bg-white')
      
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect()
        const aboutTop = window.scrollY + rect.top
        const aboutBottom = aboutTop + rect.height
        
        // Check if navbar is over the white section
        setIsOverWhite(scrollPosition > aboutTop && scrollPosition < aboutBottom)
      }
    }

    // Initial check
    handleScroll()
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const textColor = isOverWhite ? 'text-slate-900' : 'text-white'
  const logoSrc = isOverWhite ? '/Gradient.png' : '/White.png'
  const borderColor = isOverWhite ? 'border-slate-200' : 'border-white/10'
  const mobileMenuBg = isOverWhite ? 'bg-white/95' : 'bg-slate-900/95'
  const mobileHoverBg = isOverWhite ? 'hover:bg-slate-100' : 'hover:bg-white/10'

  return (
  // Fixed transparent navbar with blur effect and bottom border
  // backdrop-blur-md creates a frosted glass effect
  <nav aria-label="Main navigation" className={`fixed top-0 left-0 right-0 z-50 w-full bg-transparent backdrop-blur-md border-b ${borderColor} transition-colors duration-300`}>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          {/* Logo that changes based on background */}
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src={logoSrc}
              alt="Square 1 Ai Logo" 
              width={135} 
              height={50}
              className="object-contain w-[100px] sm:w-[120px] md:w-[135px] h-auto transition-opacity duration-300"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/link1" className={`${textColor} text-sm lg:text-base transition-all hover:scale-110`}>
            About
          </Link>
          <Link href="/link2" className={`${textColor} text-sm lg:text-base transition-all hover:scale-110`}>
            Feedback
          </Link>
          <Link href="/link3" className={`${textColor} text-sm lg:text-base transition-all hover:scale-110`}>
            Community
          </Link>
          <Link href="/link4" className={`${textColor} text-sm lg:text-base transition-all hover:scale-110`}>
            Waitlist
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden ${textColor} p-2 ${mobileHoverBg} rounded-lg transition-colors`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 ${mobileMenuBg} backdrop-blur-lg border-b ${borderColor}`}>
          <div className="flex flex-col px-4 py-4 space-y-4">
            <Link 
              href="/link1" 
              className={`${textColor} text-base py-2 px-4 ${mobileHoverBg} rounded-lg transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/link2" 
              className={`${textColor} text-base py-2 px-4 ${mobileHoverBg} rounded-lg transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              Feedback
            </Link>
            <Link 
              href="/link3" 
              className={`${textColor} text-base py-2 px-4 ${mobileHoverBg} rounded-lg transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              href="/link4" 
              className={`${textColor} text-base py-2 px-4 ${mobileHoverBg} rounded-lg transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              Waitlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
