"use client"

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & About */}
          <div>
            <svg className="h-8 w-8 mb-4" viewBox="0 0 1080 461.8" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <style>{`.st0 { fill: white; }`}</style>
              </defs>
              <path
                className="st0"
                d="M150,132.8v168.6h101.4v-17.6h-83.8v-133.4h133.3v36.8h17.6v-54.5h-168.6ZM306.7,303.3c-9.6,0-17.7-2.1-24.2-6.4-6.5-4.3-11.2-10.1-13.8-17.5l16.3-9.5c3.8,9.9,11.2,14.8,22.3,14.8s9.3-1,11.8-2.9c2.5-1.9,3.7-4.4,3.7-7.3s-1.5-6.1-4.6-8c-3-1.9-8.5-3.9-16.3-6.2-4.3-1.3-8-2.6-11-3.9-3-1.3-6-3-9-5.2-3-2.2-5.3-4.9-6.8-8.2-1.6-3.3-2.4-7.2-2.4-11.6,0-8.8,3.1-15.7,9.3-21,6.2-5.2,13.7-7.8,22.5-7.8s14.7,1.9,20.7,5.7c5.9,3.8,10.6,9.2,13.9,16l-16,9.3c-3.9-8.3-10-12.4-18.5-12.4s-7.1.9-9.3,2.7c-2.3,1.8-3.4,4.1-3.4,7s1.3,5.5,3.8,7.4c2.5,1.9,7.4,3.9,14.6,6.2,2.9.9,5.2,1.6,6.7,2.1,1.5.5,3.6,1.3,6.2,2.4,2.6,1.1,4.7,2.1,6.1,3,1.4.9,3.1,2.2,4.9,3.7,1.8,1.6,3.2,3.2,4.2,4.8,1,1.7,1.8,3.7,2.5,6s1,4.9,1,7.7c0,8.9-3.2,16-9.7,21.3-6.5,5.3-15,7.9-25.4,7.9Z"
              />
            </svg>
            <h3 className="font-bold text-lg mb-2">Square 1 Ai</h3>
            <p className="text-blue-200 text-sm">Building the future of AI-powered learning and teaching.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Product</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Updates
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="font-bold text-lg mb-4">Connect</h4>
            <ul className="space-y-3 text-blue-200 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.89 2.89 0 0 1-5.08 1.61 2.89 2.89 0 0 1 5.079-2.65.51.51 0 0 0 .575-.49V9.4a.52.52 0 0 0-.575-.525h-.005a6.15 6.15 0 0 0-5.117 10.12 6.582 6.582 0 0 0 5.514 2.653 6.36 6.36 0 0 0 5.755-3.829.5.5 0 0 0 .03-.531 3.99 3.99 0 0 1-.815-2.03.5.5 0 0 0-.5-.465z" />
                  </svg>
                  TikTok
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.035-8.922 0-9.869h3.554v1.394c.435-.671 1.213-1.627 2.948-1.627 2.154 0 3.767 1.41 3.767 4.44v5.662zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.955.771-1.71 1.958-1.71 1.187 0 1.914.755 1.938 1.71 0 .951-.751 1.71-1.981 1.71zm1.581 11.597H3.715V9.583h3.203v10.869zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-blue-200 text-sm">
            <p>&copy; 2025 Square 1 Ai. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Use
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
