"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
  // Fixed transparent navbar with blur effect and bottom border
  // backdrop-blur-md creates a frosted glass effect
  <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          {/* Logo with white.png image */}
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/White.png" 
              alt="Square 1 Ai Logo" 
              width={135} 
              height={50}
              className="object-contain w-[100px] sm:w-[120px] md:w-[135px] h-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/link1" className="text-white text-sm lg:text-base transition-transform hover:scale-110">
            About
          </Link>
          <Link href="/link2" className="text-white text-sm lg:text-base transition-transform hover:scale-110">
            Feedback
          </Link>
          <Link href="/link3" className="text-white text-sm lg:text-base transition-transform hover:scale-110">
            Community
          </Link>
          <Link href="/link4" className="text-white text-sm lg:text-base transition-transform hover:scale-110">
            Waitlist
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-b border-white/10">
          <div className="flex flex-col px-4 py-4 space-y-4">
            <Link 
              href="/link1" 
              className="text-white text-base py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/link2" 
              className="text-white text-base py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Feedback
            </Link>
            <Link 
              href="/link3" 
              className="text-white text-base py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              href="/link4" 
              className="text-white text-base py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
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
