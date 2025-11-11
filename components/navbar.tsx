"use client"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  return (
  // Transparent navbar: no background color so it blends with the page
  // Add text-white so child text inherits white color for transparent backgrounds
  <nav aria-label="Main navigation" className="w-full flex items-center justify-between px-6 py-4 bg-transparent text-white">
      <div className="flex items-center gap-3">
        {/* Simple text logo; swap with an <img> if you have a logo file */}
        <Link href="/" className="flex items-center gap-3">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            {/* use currentColor so svg strokes follow the text color (will be white for transparent navbar) */}
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="transparent" />
            <path d="M7 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {/* use text-current so the text color inherits from the surrounding context */}
          <span className="font-extrabold text-current">Square 1 Ai</span>
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:underline">Link1</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink asChild>
                  <Link href="/link1" className="text-white">Go to Link1</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:underline">Link2</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink asChild>
                  <Link href="/link2" className="text-white">Go to Link2</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:underline">Link3</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink asChild>
                  <Link href="/link3" className="text-white">Go to Link3</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuViewport />
        </NavigationMenu>
      </div>
    </nav>
  )
}
