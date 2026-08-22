import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LockKeyhole, Delete, Heart } from "lucide-react";

const SECRET_PIN = "0811";

export default function LockScreen({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleNumber = (number) => {
    if (pin.length >= 4 || unlocked) return;

    setError(false);
    setPin((current) => current + number);
  };

  const handleDelete = () => {
    setError(false);
    setPin((current) => current.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin === SECRET_PIN) {
      setUnlocked(true);

      setTimeout(() => {
        onUnlock();
      }, 1500);

      return;
    }

    setError(true);
    setPin("");
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.16),_transparent_55%)]" />

      {/* Decorative stars */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute left-[15%] top-[20%] text-sm text-white/50">
          ✦
        </span>

        <span className="absolute right-[18%] top-[25%] text-xs text-white/40">
          ✧
        </span>

        <span className="absolute bottom-[25%] left-[20%] text-xs text-white/40">
          ✧
        </span>

        <span className="absolute bottom-[20%] right-[15%] text-sm text-white/50">
          ✦
        </span>
      </div>

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="lock"
            className="relative z-10 w-full max-w-sm text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {/* Lock icon */}
            <motion.div
              animate={
                error
                  ? {
                      x: [-8, 8, -8, 8, 0],
                    }
                  : {
                      y: [0, -5, 0],
                    }
              }
              transition={
                error
                  ? { duration: 0.4 }
                  : {
                      duration: 3,
                      repeat: Infinity,
                    }
              }
              className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5"
            >
              <LockKeyhole size={34} strokeWidth={1.5} />
            </motion.div>

            {/* Heading */}
            <h2 className="font-serif text-4xl sm:text-5xl">
              A little secret...
            </h2>

            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Some surprises are meant to be unlocked.
            </p>

            {/* PIN dots */}
            <div className="my-9 flex justify-center gap-4">
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  animate={
                    pin.length > index
                      ? {
                          scale: [0.8, 1.2, 1],
                        }
                      : {}
                  }
                  className={`h-3.5 w-3.5 rounded-full border ${
                    pin.length > index
                      ? "border-white bg-white"
                      : "border-white/30 bg-transparent"
                  }`}
                />
              ))}
            </div>

            {/* Error message */}
            <div className="h-6">
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-red-300"
                  >
                    Not quite... you know this one. ❤️
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Number pad */}
            <div className="mx-auto mt-5 grid max-w-[280px] grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <button
                  key={number}
                  onClick={() => handleNumber(String(number))}
                  className="flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg transition hover:bg-white/10 active:scale-95"
                >
                  {number}
                </button>
              ))}

              <div />

              <button
                onClick={() => handleNumber("0")}
                className="flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg transition hover:bg-white/10 active:scale-95"
              >
                0
              </button>

              <button
                onClick={handleDelete}
                className="flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10 active:scale-95"
              >
                <Delete size={20} />
              </button>
            </div>

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={pin.length !== 4}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Heart size={16} fill="currentColor" />
              Unlock
            </motion.button>

            <p className="mt-6 text-xs text-gray-600">
              Hint: You already know the key...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 text-center"
          >
            <motion.div
              animate={{
                rotate: [0, -8, 8, -5, 5, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 0.8 }}
              className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10"
            >
              <LockKeyhole size={40} />
            </motion.div>

            <h2 className="font-serif text-4xl sm:text-5xl">
              Unlocked ❤️
            </h2>

            <p className="mt-4 text-gray-400">
              Welcome, birthday girl.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}