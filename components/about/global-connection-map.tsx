"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface Country {
  name: string;
  x: number;
  y: number;
  avatar: string;
  connections: number[];
}

const countries: Country[] = [
  { name: 'USA', x: 20, y: 22, avatar: 'https://images.unsplash.com/photo-1662838496660-61af6ffa3788?w=200', connections: [1, 5, 8] },
  { name: 'Brazil', x: 35, y: 58, avatar: 'https://images.unsplash.com/photo-1609043238951-9bb29775f27c?w=200', connections: [0, 3] },
  { name: 'UK', x: 48.5, y: 14, avatar: 'https://images.unsplash.com/photo-1610103278906-6c96a3b2c1f0?w=200', connections: [6, 9] },
  { name: 'Russia', x: 66, y: 18, avatar: 'https://images.unsplash.com/photo-1596602549485-90a066ad2f2d?w=200', connections: [10, 6] },
  { name: 'Egypt', x: 56, y: 36, avatar: 'https://images.unsplash.com/photo-1754639488181-7eae9f6c06e0?w=200', connections: [3, 4] },
  { name: 'France', x: 43, y: 29, avatar: 'https://images.unsplash.com/photo-1597117753473-9a20330f5fb7?w=200', connections: [2, 6] },
  { name: 'India', x: 66, y: 42, avatar: 'https://images.unsplash.com/photo-1669787210388-1847b47bdc2e?w=200', connections: [10, 12] },
  { name: 'South Africa', x: 53, y: 60, avatar: 'https://images.unsplash.com/photo-1761052710052-b545a62720a9?w=200', connections: [4, 3] },
  { name: 'Peru', x: 27, y: 50, avatar: 'https://images.unsplash.com/photo-1752652012551-d7685a746058?w=200', connections: [8, 1] },
  { name: 'Australia', x: 79, y: 57, avatar: 'https://images.unsplash.com/photo-1597117753473-9a20330f5fb7?w=200', connections: [10, 11, 18] },
  { name: 'Japan', x: 81, y: 35, avatar: 'https://images.unsplash.com/photo-1571270237703-6ac8a769ad7a?w=200', connections: [10, 16, 18] },
  { name: 'New Zealand', x: 86, y: 70, avatar: 'https://images.unsplash.com/photo-1584162607168-7cf2a46a57bf?w=200', connections: [16, 17] },
];

export function GlobalConnectionMap() {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 1000);
    const timer2 = setTimeout(() => setAnimationStage(2), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
      {/* World Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <Image
          src="/world-map.png"
          alt="World Map"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Country markers with avatars */}
      {animationStage >= 1 &&
        countries.map((country, index) => (
          <motion.div
            key={country.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: 'spring',
              stiffness: 200,
            }}
            className="absolute"
            style={{
              left: `${country.x}%`,
              top: `${country.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative">
              {/* Pulsing ring */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
                className="absolute inset-0 rounded-full"
                style={{ width: '50px', height: '50px', margin: '-5px', background: 'rgba(96, 165, 250, 0.6)' }}
              />

              {/* Avatar circle */}
              <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                <Image
                  src={country.avatar}
                  alt={country.name}
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        ))}
    </div>
  );
}
