"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const text = "building... stay tuned...";
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date(now);

      // Get midnight tonight
      targetDate.setHours(24, 0, 0, 0);

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setIsComplete(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const child = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "rgb(16, 15, 15)" }}
    >
      <motion.div
        className="absolute opacity-35 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        <Image
          src="/assets/glow.png"
          alt=""
          width={600}
          height={600}
          className="w-96 md:w-[600px]"
        />
      </motion.div>

      <div className="flex flex-col items-center gap-8 relative z-10">
        <motion.h1
          className="text-6xl md:text-8xl font-medium opacity-80"
          style={{ color: "rgb(206, 205, 195)" }}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {text.split("").map((char, index) => (
            <motion.span key={index} variants={child}>
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {isComplete ? (
          <motion.div
            className="text-4xl md:text-5xl font-bold opacity-80"
            style={{ color: "rgb(206, 205, 195)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            the time is now.
          </motion.div>
        ) : (
          <motion.div
            className="flex gap-6 md:gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-bold opacity-80" style={{ color: "rgb(206, 205, 195)" }}>
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-sm md:text-base opacity-60" style={{ color: "rgb(206, 205, 195)" }}>
                days
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-bold opacity-80" style={{ color: "rgb(206, 205, 195)" }}>
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-sm md:text-base opacity-60" style={{ color: "rgb(206, 205, 195)" }}>
                hours
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-bold opacity-80" style={{ color: "rgb(206, 205, 195)" }}>
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-sm md:text-base opacity-60" style={{ color: "rgb(206, 205, 195)" }}>
                minutes
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-bold opacity-80" style={{ color: "rgb(206, 205, 195)" }}>
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-sm md:text-base opacity-60" style={{ color: "rgb(206, 205, 195)" }}>
                seconds
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
