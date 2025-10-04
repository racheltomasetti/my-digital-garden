"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const text = "Building... stay tuned...";

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

      <motion.h1
        className="text-6xl md:text-8xl font-medium opacity-80 relative z-10"
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
    </div>
  );
}
