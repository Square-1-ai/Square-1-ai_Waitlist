"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Hide navbar on student and teacher waitlist pages
  const hideNavbar = pathname === "/student-waitlist" || pathname === "/teacher-waitlist"
  
  if (hideNavbar) {
    return null
  }
  
  return (
    <header className="relative z-20">
      <Navbar />
    </header>
  )
}

