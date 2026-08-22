import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import seejuPhoto from "../assets/seeju1.jpg";

const crackers = [
  { left: "8%", top: "30%", emoji: "🎉", delay: 0 },
  { left: "18%", top: "55%", emoji: "✨", delay: 0.15 },
  { left: "82%", top: "30%", emoji: "🎊", delay: 0.25 },
  { left: "92%", top: "55%", emoji: "✨", delay: 0.1 },
  { left: "12%", top: "70%", emoji: "💥", delay: 0.3 },
  { left: "88%", top: "70%", emoji: "🎉", delay: 0.2 },
];

export default function CelebrationScreen({ onContinue }) {
  return (
    <motion.section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.18),_transparent_50%)]" />

      {/* Crackers / particles */}
      {crackers.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-3xl sm:text-4xl"
          style={{
            left: item.left,
            top: item.top,
          }}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.3, 1.3, 1, 0.5],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 2.5,
            delay: item.delay,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Floating hearts */}
      {[...Array(12)].map((_, index) => (
        <motion.div
          key={`heart-${index}`}
          className="absolute text-lg text-pink-300"
          style={{
            left: `${5 + Math.random() * 90}%`,
            bottom: "-30px",
          }}
          initial={{
            opacity: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: -window.innerHeight - 100,
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            delay: index * 0.35,
            repeat: Infinity,
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Photo */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.2,
            y: 50,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
            duration: 1.2,
            type: "spring",
            stiffness: 90,
          }}
          className="relative"
        >
          {/* Photo glow */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
            className="absolute -inset-5 rounded-full bg-pink-500/20 blur-2xl"
          />
{/* Photo frame */}
<div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl sm:h-80 sm:w-80">

  <img
    src={seejuPhoto}
    alt="Seeju"
    className="h-full w-full object-cover"
  />

</div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 2,
            duration: 1,
          }}
        >
          <h1 className="mt-10 font-serif text-5xl sm:text-6xl">
            Surprise, Seeju! ❤️
          </h1>

          <p className="mt-4 text-gray-400">
            Today is all about you.
          </p>
        </motion.div>

        {/* Continue */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 3,
            duration: 0.8,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black"
        >
          <Heart size={17} fill="currentColor" />
          Continue
        </motion.button>

      </div>
    </motion.section>
  );
}