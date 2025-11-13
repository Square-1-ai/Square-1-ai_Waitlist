"use client"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import TextType from "@/components/ui/text-type"
import { cn } from "@/lib/utils"


export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        {/* Grid Background Effect */}
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
            "[background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]"
          )}
        />
        
        {/* Blurred mesh gradients in 4 corners */}
        <div className="absolute top-10 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-10 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Radial gradient overlay for faded look */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative z-10 px-4 sm:px-6 md:px-8 text-center">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 text-balance leading-tight px-2"
            style={{ fontFamily: "'Inter Tight', 'Inter', 'Noto Sans JP', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
          >
            Learn. Teach. Build the Future with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Square 1 Ai
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-lg lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto text-balance leading-relaxed text-slate-200 px-2">
            Join The Next Generation Of AI-Powered Learning Whether You're A Student Eager To Grow Or A Teacher Ready
            To Inspire.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 px-2">
            <a
              href="/student-waitlist"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full font-bold text-base sm:text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Join as Student
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/teacher-waitlist"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold text-base sm:text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Join as Teacher
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* <p className="text-sm text-blue-300 font-medium">
            <TextType
              text={["✨ Early access opens soon — be one of the first to join."]}
              typingSpeed={50}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
            />
          </p> */}
        </div>

          {/* Hero Image */}
          <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 px-2">
            <div className="relative rounded-xl sm:rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl">
              <Image 
                src="/Hero.png" 
                alt="Square 1 Ai Platform Preview" 
                width={1200} 
                height={675}
                className="w-full h-auto object-contain rounded-xl sm:rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Early Section - Separate Section */}
      <section id="why-join" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
        <div className="mt-0">
          <div className="text-center mb-12 sm:mb-16 px-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Why Join Square 1 Ai Early?</h2>
            <p className="text-base sm:text-lg text-blue-100 px-4">Get Exclusive Benefits And Shape The Future Of AI Learning</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 px-2">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M4.99958 12.9999C4.99958 7.91198 7.90222 3.5636 11.9996 1.81799C16.0969 3.5636 18.9996 7.91198 18.9996 12.9999C18.9996 13.8229 18.9236 14.6264 18.779 15.4027L20.7194 17.2353C20.8845 17.3913 20.9238 17.6389 20.815 17.8383L18.3196 22.4133C18.1873 22.6557 17.8836 22.7451 17.6412 22.6128C17.5993 22.59 17.5608 22.5612 17.5271 22.5274L15.2925 20.2928C15.1049 20.1053 14.8506 19.9999 14.5854 19.9999H9.41379C9.14857 19.9999 8.89422 20.1053 8.70668 20.2928L6.47209 22.5274C6.27683 22.7227 5.96025 22.7227 5.76498 22.5274C5.73122 22.4937 5.70246 22.4552 5.67959 22.4133L3.18412 17.8383C3.07537 17.6389 3.11464 17.3913 3.27975 17.2353L5.22014 15.4027C5.07551 14.6264 4.99958 13.8229 4.99958 12.9999ZM6.47542 19.6957L7.29247 18.8786C7.85508 18.316 8.61814 17.9999 9.41379 17.9999H14.5854C15.381 17.9999 16.1441 18.316 16.7067 18.8786L17.5237 19.6957L18.5056 17.8955L17.4058 16.8568C16.9117 16.3901 16.6884 15.7045 16.8128 15.0364C16.9366 14.3722 16.9996 13.6911 16.9996 12.9999C16.9996 9.13037 15.0045 5.69965 11.9996 4.04033C8.99462 5.69965 6.99958 9.13037 6.99958 12.9999C6.99958 13.6911 7.06255 14.3722 7.18631 15.0364C7.31078 15.7045 7.08746 16.3901 6.59338 16.8568L5.49353 17.8955L6.47542 19.6957ZM11.9996 12.9999C10.895 12.9999 9.99958 12.1045 9.99958 10.9999C9.99958 9.89537 10.895 8.99994 11.9996 8.99994C13.1041 8.99994 13.9996 9.89537 13.9996 10.9999C13.9996 12.1045 13.1041 12.9999 11.9996 12.9999Z" />
                  </svg>
                ),
                title: "Early Access to AI Study Packs",
                description: "Get first access to our cutting-edge AI-powered study materials",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z" />
                  </svg>
                ),
                title: "AI Powered Learning",
                description: "Experience intelligent, adaptive learning that evolves with you",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z" />
                  </svg>
                ),
                title: "Join a Global Learning Community",
                description: "Connect with students and teachers from around the world",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M8 4C8 5.10457 7.10457 6 6 6 4.89543 6 4 5.10457 4 4 4 2.89543 4.89543 2 6 2 7.10457 2 8 2.89543 8 4ZM5 16V22H3V10C3 8.34315 4.34315 7 6 7 6.82059 7 7.56423 7.32946 8.10585 7.86333L10.4803 10.1057 12.7931 7.79289 14.2073 9.20711 10.5201 12.8943 9 11.4587V22H7V16H5ZM6 9C5.44772 9 5 9.44772 5 10V14H7V10C7 9.44772 6.55228 9 6 9ZM19 5H10V3H20C20.5523 3 21 3.44772 21 4V15C21 15.5523 20.5523 16 20 16H16.5758L19.3993 22H17.1889L14.3654 16H10V14H19V5Z" />
                  </svg>
                ),
                title: "Exclusive Tools for Teachers",
                description: "Unlock premium features designed to enhance your teaching",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z" />
                  </svg>
                ),
                title: "Personalized Learning Paths",
                description: "AI tailors your learning journey to your goals and pace",
              },
            ].map((feature, index) => {
              const colors = [
                "bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-400/40 hover:from-blue-600/30 hover:to-cyan-600/30 hover:border-blue-400/60",
                "bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-400/40 hover:from-purple-600/30 hover:to-pink-600/30 hover:border-purple-400/60",
                "bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-400/40 hover:from-green-600/30 hover:to-emerald-600/30 hover:border-green-400/60",
                "bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-400/40 hover:from-orange-600/30 hover:to-red-600/30 hover:border-orange-400/60",
                "bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border-indigo-400/40 hover:from-indigo-600/30 hover:to-violet-600/30 hover:border-indigo-400/60",
              ];
              return (
                <div
                  key={index}
                  className={`p-5 sm:p-6 rounded-xl sm:rounded-2xl border hover:shadow-xl transition-all duration-300 hover:scale-105 ${colors[index]}`}
                >
                  <div className="mb-3 sm:mb-4">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-blue-100">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </section>
    </>
  )
}
