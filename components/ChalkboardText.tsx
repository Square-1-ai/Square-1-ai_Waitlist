"use client";

import { useState, useEffect, useRef } from "react";

import { motion } from "motion/react";

import { 

  Pencil, Grid3x3, StickyNote, Type, Shapes, ChevronDown, 


  Undo, Redo, Pen, Minus, Plus, HelpCircle, User, Share2 

} from "lucide-react";

const TEXT_LINES = [
  "READ number",
  "IF number > 0 THEN PRINT \"Positive\"",
  "ELSE PRINT \"Not Positive\"",
  "END"
];
const TEXT = TEXT_LINES.join("\n");

export function ChalkboardText() {

  const [displayedText, setDisplayedText] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [penPosition, setPenPosition] = useState({ x: 0, y: 0 });

  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {

    if (currentIndex < TEXT.length) {

      const timeout = setTimeout(() => {

        setDisplayedText(TEXT.slice(0, currentIndex + 1));

        setCurrentIndex(currentIndex + 1);

      }, 30);

      return () => clearTimeout(timeout);

    } else {

      const timeout = setTimeout(() => {

        setDisplayedText("");

        setCurrentIndex(0);

      }, 2000);

      return () => clearTimeout(timeout);

    }

  }, [currentIndex]);

  useEffect(() => {

    if (textRef.current && currentIndex > 0) {

      const spans = textRef.current.querySelectorAll('.char-span');

      const lastSpan = spans[currentIndex - 1] as HTMLElement;

      if (lastSpan) {

        const rect = lastSpan.getBoundingClientRect();

        const containerRect = textRef.current.getBoundingClientRect();

        setPenPosition({

          x: rect.right - containerRect.left,

          y: rect.top - containerRect.top + rect.height / 2

        });

      }

    }

  }, [currentIndex, displayedText]);

  return (

    <div className="relative w-full max-w-4xl mx-auto">

      {/* Smart Whiteboard Background */}

      <div 

        className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-lg shadow-2xl overflow-visible"

        style={{

          background: 'linear-gradient(145deg, #fafafa 0%, #ffffff 50%, #f5f5f5 100%)',

          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06), 0 10px 20px rgba(0,0,0,0.15), 0 25px 50px rgba(0,0,0,0.2)',

          border: '1px solid #e0e0e0',

        }}

      >

        {/* Glossy overlay for smart board effect */}

        <div 

          className="absolute inset-0 rounded-lg pointer-events-none"

          style={{

            background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.03) 100%)',

          }}

        />

        

        {/* Subtle grid pattern */}

        <div 

          className="absolute inset-0 rounded-lg opacity-10"

          style={{

            backgroundImage: `

              repeating-linear-gradient(

                0deg,

                transparent,

                transparent 20px,

                rgba(0,0,0,0.02) 20px,

                rgba(0,0,0,0.02) 21px

              ),

              repeating-linear-gradient(

                90deg,

                transparent,

                transparent 20px,

                rgba(0,0,0,0.02) 20px,

                rgba(0,0,0,0.02) 21px

              )

            `,

          }}

        />

        

        {/* Black aluminum frame effect */}

        <div className="absolute inset-0 rounded-lg" style={{

          boxShadow: 'inset 0 0 0 4px #1a1a1a, inset 0 0 0 5px #2d2d2d, inset 0 0 0 6px #1a1a1a'

        }} />

        {/* Left Toolbar - Inside Board */}

        <div className="absolute left-2 top-2 sm:left-4 sm:top-4 flex flex-col gap-1.5 sm:gap-2 z-10">

          {/* Main tools */}

          <div className="bg-white rounded-md sm:rounded-lg shadow-lg p-1 sm:p-1.5 flex flex-col gap-0.5 sm:gap-1">

            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded transition-colors"><Pencil className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></button>

            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded transition-colors"><Grid3x3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></button>

            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded transition-colors"><StickyNote className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></button>

            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded transition-colors hidden sm:block"><Type className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></button>

            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded transition-colors hidden sm:block"><Shapes className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></button>

            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded transition-colors hidden sm:block"><ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></button>

          </div>



          {/* Undo/Redo tools */}

          <div className="bg-white rounded-md sm:rounded-lg shadow-lg p-1 sm:p-1.5 flex flex-col gap-0.5 sm:gap-1">

            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded transition-colors"><Undo className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></button>

            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded transition-colors"><Redo className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></button>

          </div>

        </div>



        {/* Top Right Toolbar - User and Share */}

        <div className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10">

          <div className="bg-white rounded-full shadow-lg px-1.5 py-1 sm:px-2 sm:py-1.5 flex items-center gap-1 sm:gap-2">

            <div className="flex items-center gap-1 sm:gap-1.5">

              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-500 flex items-center justify-center">

                <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />

              </div>

              <button className="p-0.5 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">

                <ChevronDown className="w-3 h-3" />

              </button>

            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full transition-colors flex items-center gap-1 sm:gap-1.5">

              <Share2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />

              <span className="text-[10px] sm:text-xs hidden sm:inline">Share board</span>

            </button>

          </div>

        </div>



        {/* Right Bottom Toolbar - Zoom and Help Controls */}

        <div className="absolute right-2 bottom-2 sm:right-4 sm:bottom-4 z-10">

          <div className="bg-white rounded-full shadow-lg px-1.5 py-1 sm:px-2.5 sm:py-1.5 flex items-center gap-1 sm:gap-2">

            <button className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-full transition-colors"><Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></button>

            <span className="text-[10px] sm:text-xs font-medium min-w-[2rem] sm:min-w-[2.5rem] text-center">100%</span>

            <button className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-full transition-colors"><Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></button>

            <div className="w-px h-3 sm:h-4 bg-gray-300 mx-0.5" />

            <button className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-full transition-colors hidden sm:block"><HelpCircle className="w-3.5 h-3.5" /></button>

            <button className="p-1 sm:p-1.5 bg-black hover:bg-gray-800 rounded-full transition-colors"><HelpCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white" /></button>

          </div>

        </div>

        

        {/* Text Container */}

        <div className="absolute inset-0 flex items-start justify-start p-4 sm:p-6 md:p-8 lg:p-12 pt-14 sm:pt-20 md:pt-24 lg:pt-28 overflow-visible">

          <div className="w-full pl-8 sm:pl-10 md:pl-12 relative overflow-visible">

            <p ref={textRef} className="text-blue-600 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed tracking-wide italic relative">

              {displayedText.split('').map((char, index) => (

                <motion.span

                  key={index}

                  initial={{ opacity: 0 }}

                  animate={{ opacity: 1 }}

                  transition={{ duration: 0.1 }}

                  className="inline-block char-span"

                  style={{ textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)' }}

                >

                  {char}

                </motion.span>

              ))}

            </p>

            

            {/* Animated Pen */}

            {currentIndex < TEXT.length && currentIndex > 0 && (

              <motion.div

                className="absolute pointer-events-none z-50"

                style={{ 

                  left: 0,

                  top: 0,

                  willChange: 'transform'

                }}

                animate={{ 

                  x: penPosition.x, 

                  y: penPosition.y,

                  rotate: -45

                }}

                transition={{ duration: 0.03, ease: "linear" }}

              >

                <Pen className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 drop-shadow-lg" fill="currentColor" stroke="currentColor" strokeWidth={1.5} />

              </motion.div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}
