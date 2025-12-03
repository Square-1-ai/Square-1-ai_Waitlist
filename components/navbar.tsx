"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOverWhite, setIsOverWhite] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Get the navbar height
      const navbarHeight = 100
      
      // Get all sections
      const allSections = document.querySelectorAll('section')
      
      let isOverAnyLightSection = false
      
      // Check each section to see if it's light or dark
      allSections.forEach((section) => {
        const className = section.className || ''
        
        // Check if section has dark background (slate-900, slate-800, etc.)
        const isDarkSection = className.includes('slate-900') || 
                              className.includes('slate-800') ||
                              (className.includes('from-slate-900') && className.includes('to-slate-900'))
        
        // If it's not a dark section, check if it's a light section
        if (!isDarkSection) {
          const isLightSection = className.includes('bg-white') ||
                                className.includes('blue-50') ||
                                className.includes('slate-50') ||
                                className.includes('cyan-50')
          
          if (isLightSection) {
            const rect = section.getBoundingClientRect()
            // getBoundingClientRect() returns position relative to viewport
            // Check if the navbar area (0 to navbarHeight from top of viewport) overlaps with section
            const sectionTop = rect.top
            const sectionBottom = rect.bottom
            
            // Navbar is over section if the section intersects with the top portion of viewport (navbar area)
            // Section intersects navbar if:
            // - Section starts at or above the navbar bottom (sectionTop <= navbarHeight)
            // - Section extends to or below the viewport top (sectionBottom >= 0)
            if (sectionTop <= navbarHeight && sectionBottom >= 0) {
              isOverAnyLightSection = true
            }
          }
        }
      })
      
      setIsOverWhite(isOverAnyLightSection)
    }

    // Initial check
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
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
              className="object-contain w-[100px] sm:w-[120px] md:w-[135px] h-auto transition-opacity duration-300 shadow-none"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/" className={`${textColor} text-sm lg:text-base transition-all hover:scale-110 ${pathname === '/' ? 'border-b-2 border-blue-500 pb-1' : ''}`}>
            Home
          </Link>
          <Link href="/about" className={`${textColor} text-sm lg:text-base transition-all hover:scale-110 ${pathname === '/about' ? 'border-b-2 border-blue-500 pb-1' : ''}`}>
            About
          </Link>
          <Link href="/courses" className={`${textColor} text-sm lg:text-base transition-all hover:scale-110 ${pathname === '/courses' ? 'border-b-2 border-blue-500 pb-1' : ''}`}>
            Courses
          </Link>
          <Link href="/teachers-section" className={`${textColor} text-sm lg:text-base transition-all hover:scale-110 ${pathname === '/teachers-section' ? 'border-b-2 border-blue-500 pb-1' : ''}`}>
            Teachers
          </Link>
          <Link href="/feedback" className={`${textColor} text-sm lg:text-base transition-all hover:scale-110 ${pathname === '/feedback' ? 'border-b-2 border-blue-500 pb-1' : ''}`}>
            Feedback
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
              href="/about" 
              className={`${textColor} text-base py-2 px-4 ${mobileHoverBg} rounded-lg transition-colors ${pathname === '/about' ? 'border-b-2 border-blue-500 pb-1' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/courses" 
              className={`${textColor} text-base py-2 px-4 ${mobileHoverBg} rounded-lg transition-colors ${pathname === '/courses' ? 'border-b-2 border-blue-500 pb-1' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              href="/teacher-waitlist" 
              className={`${textColor} text-base py-2 px-4 ${mobileHoverBg} rounded-lg transition-colors ${pathname === '/teacher-waitlist' ? 'border-b-2 border-blue-500 pb-1' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Teachers
            </Link>
            <Link 
              href="/feedback" 
              className={`${textColor} text-base py-2 px-4 ${mobileHoverBg} rounded-lg transition-colors ${pathname === '/feedback' ? 'border-b-2 border-blue-500 pb-1' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Feedback
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
