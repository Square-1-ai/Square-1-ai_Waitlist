"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  imageUrl: string;
  type: "teacher" | "child";
}

interface ExamNode {
  name: string;
  label: string;
  color: string;
  x: number;
  y: number;
}

export function NetworkAnimation() {
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Calculate scale factor based on screen size
  const scale = useMemo(() => {
    if (windowWidth < 640) return 0.4; // Mobile: 40% scale
    if (windowWidth < 768) return 0.5; // Small tablet: 50% scale
    if (windowWidth < 1024) return 0.65; // Tablet: 65% scale
    return 0.75; // Desktop: 75% scale (reduced from 100%)
  }, [windowWidth]);

  const baseNodes: Node[] = [
    // Teachers on the left
    {
      id: 1,
      x: -220,
      y: -100,
      size: 70,
      imageUrl: "/teachers/teacher1.png",
      type: "teacher",
    },
    {
      id: 2,
      x: -160,
      y: -20,
      size: 70,
      imageUrl: "/teachers/teacher2.png",
      type: "teacher",
    },
    {
      id: 3,
      x: -220,
      y: 65,
      size: 70,
      imageUrl: "/teachers/teacher3.png",
      type: "teacher",
    },

    // Children on the right
    {
      id: 4,
      x: 220,
      y: -90,
      size: 70,
      imageUrl: "/students/student13.png",
      type: "child",
    },
    {
      id: 5,
      x: 165,
      y: -10,
      size: 70,
      imageUrl: "/students/student14.png",
      type: "child",
    },
    {
      id: 6,
      x: 230,
      y: 70,
      size: 70,
      imageUrl: "/students/student1.png",
      type: "child",
    },
    
  ];

  const baseExamNodes: ExamNode[] = [
    { name: "GRE", label: "GRE", color: "#8B5CF6", x: -120, y: -190 },
    { name: "IELTS", label: "IELTS", color: "#DC2626", x: 0, y: -120 },
    { name: "PTE", label: "PTE", color: "#F59E0B", x: 120, y: -190 },
    { name: "TOEFL", label: "TOEFL", color: "#3B82F6", x: -100, y: 120 },
    { name: "NEET", label: "NEET", color: "#10B981", x: 70, y: 120 },
  ];

  // Scale nodes based on screen size
  const nodes = useMemo(
    () =>
      baseNodes.map((node) => ({
        ...node,
        x: node.x * scale,
        y: node.y * scale,
        size: node.size * scale,
      })),
    [scale]
  );

  const examNodes = useMemo(
    () =>
      baseExamNodes.map((exam) => ({
        ...exam,
        x: exam.x * scale,
        y: exam.y * scale,
      })),
    [scale]
  );


  return (
    <div 
      className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex items-center justify-center overflow-hidden"
      data-network-container
    >
      {/* SVG Lines connecting all circles to center */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
        viewBox="-250 -250 500 500"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Lines from profile nodes to center */}
        {baseNodes.map((node, index) => (
          <motion.path
            key={`node-${node.id}`}
            d={`M 0 0 L ${node.x} ${node.y}`}
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth={2}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{
              pathLength: { duration: 0.8, delay: 0.3 + index * 0.1 },
              opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
            }}
          />
        ))}
        {/* Lines from exam nodes to center */}
        {baseExamNodes.map((exam, index) => (
          <motion.path
            key={`exam-${exam.name}`}
            d={`M 0 0 L ${exam.x} ${exam.y}`}
            stroke={`${exam.color}40`}
            strokeWidth={2}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{
              pathLength: { duration: 0.8, delay: 0.8 + index * 0.1 },
              opacity: { duration: 0.6, delay: 0.8 + index * 0.1 },
            }}
          />
        ))}
      </svg>

      {/* Central Box */}
      <motion.div
        className="relative z-10 bg-white shadow-lg rounded-xl border border-blue-200"
        style={{
          padding: `${8 * scale}px ${12 * scale}px`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="/logo.svg"
          alt="Square1 AI"
          className="w-auto h-auto object-contain"
          style={{
            height: `${70 * scale}px`,
            width: 'auto',
          }}
        />
      </motion.div>

      {/* Floating Profile Nodes */}
      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          className="absolute border-blue-500 rounded-full overflow-hidden shadow-xl"
          style={{
            width: node.size,
            height: node.size,
            left: `calc(50% + ${node.x}px)`,
            top: `calc(50% + ${node.y}px)`,
            marginLeft: -node.size / 2,
            marginTop: -node.size / 2,
            borderWidth: `${Math.max(2, 3 * scale)}px`,
            borderStyle: "solid",
            boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
            zIndex: 5,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            x: [0, (Math.random() * 15 - 7.5) * scale, 0],
            y: [0, (Math.random() * 15 - 7.5) * scale, 0],
          }}
          transition={{
            scale: {
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut",
            },
            opacity: {
              duration: 0.6,
              delay: index * 0.1,
            },
            x: {
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
            y: {
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          <ImageWithFallback
            src={node.imageUrl}
            alt={node.type === "teacher" ? "Teacher" : "Student"}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}

      {/* Floating Exam Nodes */}
      {examNodes.map((exam, index) => {
        const examSize = 60 * scale;
        return (
          <motion.div
            key={exam.name}
            className="absolute rounded-full overflow-hidden shadow-xl flex items-center justify-center"
            style={{
              width: examSize,
              height: examSize,
              left: `calc(50% + ${exam.x}px)`,
              top: `calc(50% + ${exam.y}px)`,
              marginLeft: -examSize / 2,
              marginTop: -examSize / 2,
              backgroundColor: exam.color,
              border: `${Math.max(2, 3 * scale)}px solid ${exam.color}`,
              boxShadow: `0 4px 20px ${exam.color}40`,
              zIndex: 5,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: [0, (Math.random() - 0.5) * 20 * scale, 0],
              y: [0, (Math.random() - 0.5) * 20 * scale, 0],
            }}
            transition={{
              scale: {
                duration: 0.6,
                delay: 0.8 + index * 0.1,
                ease: "easeOut",
              },
              opacity: {
                duration: 0.6,
                delay: 0.8 + index * 0.1,
              },
              x: {
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              y: {
                duration: 3.5 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            <span
              className="text-white text-center font-medium"
              style={{
                fontSize: `${Math.max(10, 12 * scale)}px`,
                padding: `0 ${4 * scale}px`,
              }}
            >
              {exam.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

export default NetworkAnimation;

