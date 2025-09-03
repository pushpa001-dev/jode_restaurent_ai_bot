"use client";
import { motion } from "framer-motion";

interface InfiniteScrollTextProps {
  text: string;
  speed?: number; // Lower = faster
}

export default function InfiniteScrollText({
  text,
  speed = 20,
}: InfiniteScrollTextProps) {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap bg-gray-100 py-3">
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[300px] font-anaton text-neutral-800/60 text-center'>{text}</h1>
        <p className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-bold flex items-end text-neutral-800/60 text-center'>For first visit .....</p>
      </motion.div>
    </div>
  );
}
