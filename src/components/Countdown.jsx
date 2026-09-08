import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// TEST MODE
//
// true  = countdown starts from 11:59:01 immediately
// false = waits for the real September 14 midnight
//
// Keep TRUE while testing.
// Change to FALSE when the website is ready.
// ============================================================

const TEST_MODE = true;

// ============================================================
// GET REAL BIRTHDAY MIDNIGHT
// September 14, 12:00:00 AM
// ============================================================

function getBirthdayTime() {
  const now = new Date();

  return new Date(
    now.getFullYear(),
    8,
    14,
    0,
    0,
    0,
    0
  ).getTime();
}

// ============================================================
// FORMAT NUMBER
// ============================================================

function pad(number) {
  return String(number).padStart(2, "0");
}

// ============================================================
// COUNTDOWN
// ============================================================

function Countdown({ onComplete }) {
  // ----------------------------------------------------------
  // Countdown starts at 59 seconds in test mode.
  //
  // Display:
  //
  // 11:59:01
  // 11:59:02
  // ...
  // 11:59:59
  // 12:00:00
  // ----------------------------------------------------------

  const [remaining, setRemaining] = useState(() => {
    if (TEST_MODE) {
      return 59;
    }

    const difference =
      getBirthdayTime() - Date.now();

    return Math.max(
      0,
      Math.ceil(difference / 1000)
    );
  });

  // ----------------------------------------------------------
  // Fireworks screen
  // ----------------------------------------------------------

  const [showCelebration, setShowCelebration] =
    useState(false);

  // ==========================================================
  // FIREWORK POSITIONS
  // ==========================================================

  const fireworks = useMemo(() => {
    return Array.from(
      { length: 18 },
      (_, index) => ({
        id: index,
        left: 8 + Math.random() * 84,
        top: 10 + Math.random() * 60,
        delay: Math.random() * 2.5,
        size: 70 + Math.random() * 80,
      })
    );
  }, []);

  // ==========================================================
  // COUNTDOWN TIMER
  // ==========================================================

  useEffect(() => {
    if (showCelebration) {
      return;
    }

    // ========================================================
    // TEST MODE
    // ========================================================

    if (TEST_MODE) {
      const timer = setInterval(() => {
        setRemaining((previous) => {
          if (previous <= 1) {
            clearInterval(timer);
            return 0;
          }

          return previous - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }

    // ========================================================
    // REAL MIDNIGHT MODE
    // ========================================================

    const updateTime = () => {
      const difference =
        getBirthdayTime() - Date.now();

      if (difference <= 0) {
        setRemaining(0);
        return;
      }

      setRemaining(
        Math.ceil(difference / 1000)
      );
    };

    updateTime();

    const timer = setInterval(
      updateTime,
      250
    );

    return () => {
      clearInterval(timer);
    };
  }, [showCelebration]);

  // ==========================================================
  // COUNTDOWN REACHED ZERO
  // ==========================================================

  useEffect(() => {
    if (remaining !== 0) {
      return;
    }

    // Start fireworks
    setShowCelebration(true);

    // --------------------------------------------------------
    // Keep fireworks on screen for 6 seconds
    // Then automatically open BirthdayCalendar.
    // --------------------------------------------------------

    const redirectTimer = setTimeout(() => {
      if (typeof onComplete === "function") {
        onComplete();
      }
    }, 6000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [remaining, onComplete]);

  // ==========================================================
  // CLOCK DISPLAY
  // ==========================================================

  let hours = 11;
  let minutes = 59;
  let seconds = 1;

  if (remaining > 0) {
    if (TEST_MODE) {
      seconds = 60 - remaining;
    } else {
      const now = new Date();

      hours = 11;
      minutes = 59;
      seconds = now.getSeconds();
    }
  } else {
    hours = 12;
    minutes = 0;
    seconds = 0;
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <AnimatePresence mode="wait">

      {/* =====================================================
          COUNTDOWN SCREEN
      ===================================================== */}

      {!showCelebration && (
        <motion.div
          key="countdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
          }}
          transition={{
            duration: 1,
          }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#05020a] text-white"
        >

          {/* =================================================
              BACKGROUND GLOW
          ================================================= */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,105,180,0.12),transparent_55%)]" />

          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-[150px]" />

          <div className="absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-purple-500/10 blur-[130px]" />

          <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-pink-500/10 blur-[130px]" />

          {/* =================================================
              STARS
          ================================================= */}

          <div className="absolute inset-0">

            {Array.from({
              length: 70,
            }).map((_, index) => (
              <motion.span
                key={index}
                className="absolute h-[2px] w-[2px] rounded-full bg-white"
                style={{
                  left: `${(index * 37) % 100}%`,
                  top: `${(index * 61) % 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.7, 1.5, 0.7],
                }}
                transition={{
                  duration: 2 + (index % 4),
                  repeat: Infinity,
                  delay: (index % 6) * 0.4,
                }}
              />
            ))}

          </div>

          {/* =================================================
              FLOWERS
          ================================================= */}

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute left-5 top-16 text-5xl md:left-10 md:top-20 md:text-6xl"
          >
            🌸
          </motion.div>

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [5, -5, 5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute right-5 top-16 text-5xl md:right-10 md:top-20 md:text-6xl"
          >
            🌸
          </motion.div>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="relative z-10 flex h-full w-full items-center justify-center px-5">

            <div className="w-full max-w-[1500px] text-center">

              {/* =============================================
                  TITLE
              ============================================= */}

              <motion.h1
                initial={{
                  opacity: 0,
                  y: -30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1,
                }}
                className="font-serif text-4xl italic text-amber-200 drop-shadow-[0_0_25px_rgba(251,191,36,0.8)] sm:text-5xl md:text-7xl"
              >
                Get Ready...
              </motion.h1>

              {/* =============================================
                  HEART LINE
              ============================================= */}

              <div className="mt-5 flex items-center justify-center gap-5">

                <div className="h-px w-16 bg-pink-300 md:w-36" />

                <motion.span
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                  }}
                  className="text-3xl text-pink-300 md:text-4xl"
                >
                  ♥
                </motion.span>

                <div className="h-px w-16 bg-pink-300 md:w-36" />

              </div>

              {/* =============================================
                  SUBTITLE
              ============================================= */}

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.5,
                  duration: 1,
                }}
                className="mt-5 text-[9px] uppercase tracking-[0.3em] text-pink-100 sm:text-xs md:text-sm md:tracking-[0.6em]"
              >
                Something beautiful is about to begin
              </motion.p>

              {/* =============================================
                  BIG CLOCK
              ============================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1,
                }}
                className="mt-10 flex items-center justify-center font-serif font-bold leading-none text-amber-100 drop-shadow-[0_0_40px_rgba(251,191,36,0.85)] sm:mt-14"
              >

                {/* HOURS */}

                <span className="text-[65px] sm:text-[100px] md:text-[150px] lg:text-[190px]">
                  {pad(hours)}
                </span>

                {/* FIRST COLON */}

                <motion.span
                  animate={{
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                  className="mx-1 text-[55px] sm:mx-3 sm:text-[90px] md:text-[130px] lg:text-[165px]"
                >
                  :
                </motion.span>

                {/* MINUTES */}

                <span className="text-[65px] sm:text-[100px] md:text-[150px] lg:text-[190px]">
                  {pad(minutes)}
                </span>

                {/* SECOND COLON */}

                <motion.span
                  animate={{
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                  className="mx-1 text-[55px] sm:mx-3 sm:text-[90px] md:text-[130px] lg:text-[165px]"
                >
                  :
                </motion.span>

                {/* SECONDS */}

                <AnimatePresence mode="popLayout">

                  <motion.span
                    key={seconds}
                    initial={{
                      opacity: 0,
                      y: -20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 20,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="text-[65px] sm:text-[100px] md:text-[150px] lg:text-[190px]"
                  >
                    {pad(seconds)}
                  </motion.span>

                </AnimatePresence>

              </motion.div>

              {/* =============================================
                  DATE
              ============================================= */}

              <div className="mt-5 flex items-center justify-center gap-6 font-serif text-base tracking-[0.25em] text-white sm:gap-10 sm:text-xl md:text-2xl">

                <span>
                  13 SEP
                </span>

                <motion.span
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="text-pink-300"
                >
                  ♥
                </motion.span>

                <span>
                  14 SEP
                </span>

              </div>

              {/* =============================================
                  BOTTOM TEXT
              ============================================= */}

              <motion.p
                animate={{
                  opacity: [0.35, 1, 0.35],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="mt-7 text-[8px] uppercase tracking-[0.3em] text-white/50 sm:text-[10px] md:text-xs md:tracking-[0.5em]"
              >
                Midnight • A New Chapter • A Beautiful Beginning
              </motion.p>

            </div>

          </div>

        </motion.div>
      )}

      {/* =====================================================
          BIRTHDAY FIREWORKS
      ===================================================== */}

      {showCelebration && (
        <motion.div
          key="celebration"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-[99999] overflow-hidden bg-black"
        >

          {/* =================================================
              BACKGROUND
          ================================================= */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,50,150,0.22),transparent_60%)]" />

          {/* =================================================
              FIREWORKS
          ================================================= */}

          {fireworks.map((firework) => (
            <div
              key={firework.id}
              className="absolute"
              style={{
                left: `${firework.left}%`,
                top: `${firework.top}%`,
              }}
            >

              <motion.div
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: [
                    0,
                    0.7,
                    1,
                    0,
                  ],
                  opacity: [
                    0,
                    1,
                    1,
                    0,
                  ],
                }}
                transition={{
                  duration: 2,
                  delay: firework.delay,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeOut",
                }}
                className="relative"
                style={{
                  width: firework.size,
                  height: firework.size,
                }}
              >

                {/* CENTER */}

                <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_25px_10px_rgba(255,255,255,0.9)]" />

                {/* RAYS */}

                {Array.from({
                  length: 12,
                }).map((_, ray) => (
                  <div
                    key={ray}
                    className="absolute left-1/2 top-1/2 h-[3px] w-1/2 origin-left rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.8)]"
                    style={{
                      transform: `rotate(${ray * 30}deg)`,
                    }}
                  />
                ))}

              </motion.div>

            </div>
          ))}

          {/* =================================================
              EXTRA SPARKLES
          ================================================= */}

          {Array.from({
            length: 45,
          }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute h-1 w-1 rounded-full bg-yellow-200"
              style={{
                left: `${(index * 47) % 100}%`,
                top: `${(index * 29) % 100}%`,
              }}
              animate={{
                y: [0, 80, 180],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + (index % 3),
                repeat: Infinity,
                delay: (index % 7) * 0.4,
                ease: "linear",
              }}
            />
          ))}

          {/* =================================================
              BIRTHDAY MESSAGE
          ================================================= */}

          <div className="relative z-50 flex h-full w-full items-center justify-center px-5 text-center">

            <div>

              {/* SMALL MESSAGE */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
                  duration: 1,
                }}
                className="text-xs uppercase tracking-[0.4em] text-pink-200 sm:text-sm md:text-xl"
              >
                The moment has arrived
              </motion.p>

              {/* HAPPY BIRTHDAY */}

              <motion.h1
                initial={{
                  opacity: 0,
                  scale: 0.4,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.8,
                  duration: 1.2,
                  type: "spring",
                  stiffness: 100,
                }}
                className="mt-5 font-serif text-4xl font-bold italic text-amber-100 drop-shadow-[0_0_30px_rgba(251,191,36,0.95)] sm:text-6xl md:text-8xl lg:text-[110px]"
              >
                Happy Birthday
              </motion.h1>

              {/* SEEJU */}

              <motion.h2
                initial={{
                  opacity: 0,
                  scale: 0.3,
                }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  opacity: {
                    delay: 1.4,
                    duration: 1,
                  },
                  scale: {
                    delay: 2,
                    duration: 1.5,
                    repeat: Infinity,
                  },
                }}
                className="mt-2 font-serif text-4xl font-black italic text-pink-300 drop-shadow-[0_0_35px_rgba(244,114,182,1)] sm:text-6xl md:text-8xl lg:text-[125px]"
              >
                SEEEJUUUUUU ❤️
              </motion.h2>

              {/* LINE */}

              <motion.div
                initial={{
                  scaleX: 0,
                  opacity: 0,
                }}
                animate={{
                  scaleX: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: 2,
                  duration: 1,
                }}
                className="mx-auto mt-7 h-px w-48 bg-gradient-to-r from-transparent via-pink-300 to-transparent sm:w-72 md:w-96"
              />

              {/* FINAL TEXT */}

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 2.5,
                  duration: 1,
                }}
                className="mt-5 text-[9px] uppercase tracking-[0.3em] text-white/70 sm:text-xs md:text-sm md:tracking-[0.45em]"
              >
                Your beautiful new chapter begins now
              </motion.p>

            </div>

          </div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}

export default Countdown;