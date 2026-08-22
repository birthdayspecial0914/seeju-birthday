import { motion } from "framer-motion";

export default function BirthdayCalendar({ onBirthdayClick }) {
  // September 2026 starts on Tuesday.
  const days = [
    null,
    null,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-pink-300 via-purple-300 to-orange-200 text-white">

      {/* =========================================================
          DREAMY BACKGROUND
      ========================================================= */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.55),transparent_35%)]" />

      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 via-transparent to-purple-600/30" />

      {/* =========================================================
          FLOATING HEARTS
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute text-white/60"
            style={{
              left: `${(index * 41) % 100}%`,
              top: `${(index * 67) % 100}%`,
              fontSize: `${12 + (index % 4) * 7}px`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, index % 2 === 0 ? 10 : -10, 0],
              opacity: [0.25, 0.8, 0.25],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 4 + (index % 3),
              repeat: Infinity,
              delay: index * 0.12,
              ease: "easeInOut",
            }}
          >
            {index % 3 === 0 ? "♥" : "✦"}
          </motion.div>
        ))}
      </div>

      {/* =========================================================
          FLOWERS
      ========================================================= */}

      <div className="pointer-events-none absolute left-0 top-0 text-7xl opacity-80 sm:text-9xl">
        🌸
      </div>

      <div className="pointer-events-none absolute right-0 top-0 text-7xl opacity-80 sm:text-9xl">
        🌺
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 text-7xl opacity-80 sm:text-9xl">
        🌷
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 text-7xl opacity-80 sm:text-9xl">
        🌹
      </div>

      {/* =========================================================
          MAIN CALENDAR
      ========================================================= */}

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-3 py-8 sm:px-8 sm:py-10">

        {/* =======================================================
            TITLE
        ======================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="mb-5 text-center sm:mb-8"
        >
          <div className="mb-1 text-4xl sm:text-5xl">
            ♡
          </div>

          <h1 className="font-serif text-5xl font-semibold tracking-wide text-rose-700 drop-shadow-sm sm:text-7xl">
            September
          </h1>

          <div className="mt-1 flex items-center justify-center gap-4">
            <span className="text-rose-500">
              ❧
            </span>

            <span className="font-serif text-2xl font-medium text-purple-800 sm:text-3xl">
              2026
            </span>

            <span className="text-rose-500">
              ❧
            </span>
          </div>
        </motion.div>

        {/* =======================================================
            CALENDAR CARD
        ======================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.3,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full max-w-6xl rounded-[28px] border border-white/70 bg-white/70 p-2 shadow-2xl backdrop-blur-xl sm:rounded-[35px] sm:p-5"
        >

          {/* =====================================================
              WEEKDAYS
          ===================================================== */}

          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {[
              "SUN",
              "MON",
              "TUE",
              "WED",
              "THU",
              "FRI",
              "SAT",
            ].map((day, index) => (
              <div
                key={day}
                className={`rounded-xl py-2 text-center text-[10px] font-bold tracking-wider sm:rounded-2xl sm:py-4 sm:text-sm ${
                  index === 0
                    ? "bg-rose-500 text-white"
                    : index === 6
                    ? "bg-purple-500 text-white"
                    : "bg-white/80 text-slate-700"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* =====================================================
              DATES
          ===================================================== */}

          <div className="mt-1 grid grid-cols-7 gap-1 sm:mt-2 sm:gap-2">

            {days.map((day, index) => {
              const isBirthday = day === 14;

              return (
                <div
                  key={index}
                  className="relative flex aspect-[1.15/1] items-center justify-center"
                >

                  {/* =================================================
                      NORMAL DATES
                  ================================================= */}

                  {day && !isBirthday && (
                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.5 + index * 0.025,
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      className={`flex h-full w-full items-center justify-center rounded-xl border border-white/70 bg-white/65 font-serif text-lg font-semibold shadow-sm sm:rounded-2xl sm:text-2xl ${
                        index % 7 === 0
                          ? "text-rose-600"
                          : index % 7 === 6
                          ? "text-purple-600"
                          : "text-slate-800"
                      }`}
                    >
                      {day}
                    </motion.div>
                  )}

                  {/* =================================================
                      14 SEPTEMBER ❤️

                      Clicking this opens BirthdayOpening
                  ================================================= */}

                  {isBirthday && (
                    <motion.button
                      type="button"

                      onClick={onBirthdayClick}

                      initial={{
                        opacity: 0,
                        scale: 0.2,
                      }}

                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}

                      transition={{
                        delay: 1.1,
                        duration: 1,
                        type: "spring",
                        stiffness: 150,
                        damping: 12,
                      }}

                      whileHover={{
                        scale: 1.08,
                      }}

                      whileTap={{
                        scale: 0.94,
                      }}

                      className="absolute inset-[-8px] z-30 flex cursor-pointer items-center justify-center outline-none sm:inset-[-12px]"

                      aria-label="Open birthday surprise"
                    >

                      {/* =================================================
                          HEART GLOW
                      ================================================= */}

                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.65, 0.3],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute h-[90%] w-[90%] rounded-full bg-pink-500/60 blur-2xl"
                      />

                      {/* =================================================
                          HEART
                      ================================================= */}

                      <motion.div
                        animate={{
                          scale: [1, 1.045, 1],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="relative z-10 h-[96%] w-[96%]"
                      >

                        <svg
                          viewBox="0 0 200 180"
                          className="absolute inset-0 h-full w-full overflow-visible"
                          xmlns="http://www.w3.org/2000/svg"
                        >

                          <defs>

                            <linearGradient
                              id="birthdayHeartGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                stopColor="#fb7185"
                              />

                              <stop
                                offset="45%"
                                stopColor="#ec4899"
                              />

                              <stop
                                offset="100%"
                                stopColor="#c026d3"
                              />
                            </linearGradient>

                            <filter
                              id="heartShadow"
                              x="-50%"
                              y="-50%"
                              width="200%"
                              height="220%"
                            >
                              <feDropShadow
                                dx="0"
                                dy="8"
                                stdDeviation="8"
                                floodColor="#db2777"
                                floodOpacity="0.45"
                              />
                            </filter>

                            <radialGradient
                              id="heartShine"
                              cx="30%"
                              cy="25%"
                              r="35%"
                            >
                              <stop
                                offset="0%"
                                stopColor="white"
                                stopOpacity="0.8"
                              />

                              <stop
                                offset="45%"
                                stopColor="white"
                                stopOpacity="0.2"
                              />

                              <stop
                                offset="100%"
                                stopColor="white"
                                stopOpacity="0"
                              />
                            </radialGradient>

                          </defs>

                          {/* ACTUAL HEART */}

                          <path
                            d="
                              M100 166
                              C94 160 25 112 18 72
                              C12 39 32 17 59 17
                              C78 17 91 27 100 42
                              C109 27 122 17 141 17
                              C168 17 188 39 182 72
                              C175 112 106 160 100 166
                              Z
                            "
                            fill="url(#birthdayHeartGradient)"
                            filter="url(#heartShadow)"
                          />

                          {/* INNER SHINE */}

                          <path
                            d="
                              M100 157
                              C91 150 34 108 28 72
                              C23 46 38 27 59 27
                              C76 27 89 37 100 54
                              C111 37 124 27 141 27
                              C162 27 177 46 172 72
                              C166 108 109 150 100 157
                              Z
                            "
                            fill="url(#heartShine)"
                            opacity="0.55"
                          />

                          {/* OUTLINE */}

                          <path
                            d="
                              M100 166
                              C94 160 25 112 18 72
                              C12 39 32 17 59 17
                              C78 17 91 27 100 42
                              C109 27 122 17 141 17
                              C168 17 188 39 182 72
                              C175 112 106 160 100 166
                              Z
                            "
                            fill="none"
                            stroke="white"
                            strokeOpacity="0.25"
                            strokeWidth="2"
                          />

                        </svg>

                        {/* =================================================
                            SHINE
                        ================================================= */}

                        <motion.div
                          animate={{
                            opacity: [0.35, 0.9, 0.35],
                            scale: [0.9, 1.1, 0.9],
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute left-[25%] top-[18%] z-20 h-3 w-3 rounded-full bg-white/80 blur-[1px] sm:h-5 sm:w-5"
                        />

                        {/* =================================================
                            14
                        ================================================= */}

                        <div className="absolute inset-0 z-30 flex items-center justify-center">
                          <span className="mt-[4%] font-serif text-3xl font-bold text-white drop-shadow-[0_3px_7px_rgba(0,0,0,0.35)] sm:text-4xl md:text-5xl">
                            14
                          </span>
                        </div>

                      </motion.div>

                      {/* =================================================
                          SMALL HEART TOP RIGHT
                      ================================================= */}

                      <motion.span
                        animate={{
                          y: [-4, -15, -4],
                          opacity: [0.4, 1, 0.4],
                          scale: [0.8, 1.15, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute -right-2 -top-3 z-40 text-lg text-rose-500 sm:-right-3 sm:-top-4 sm:text-2xl"
                      >
                        ♥
                      </motion.span>

                      {/* =================================================
                          SMALL HEART BOTTOM LEFT
                      ================================================= */}

                      <motion.span
                        animate={{
                          y: [0, -12, 0],
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1.1, 0.8],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: 0.4,
                          ease: "easeInOut",
                        }}
                        className="absolute -bottom-2 -left-2 z-40 text-lg text-fuchsia-500 sm:-bottom-3 sm:-left-3 sm:text-2xl"
                      >
                        ♥
                      </motion.span>

                    </motion.button>
                  )}

                </div>
              );
            })}

          </div>
        </motion.div>

        {/* =======================================================
            TAP MESSAGE
        ======================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 2.2,
            duration: 1,
            ease: "easeOut",
          }}
          className="mt-7 text-center sm:mt-9"
        >
          <p className="font-serif text-sm italic text-purple-900/70 sm:text-lg">
            ✨ Tap the heart on 14 September... ✨
          </p>
        </motion.div>

        {/* =======================================================
            BIRTHDAY MESSAGE
        ======================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.3,
            delay: 2.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-7 text-center sm:mt-10"
        >

          <div className="flex items-center justify-center gap-3">

            <span className="text-2xl text-rose-500">
              ♥
            </span>

            <h2 className="font-serif text-3xl font-semibold text-rose-700 sm:text-5xl">
              14 September
            </h2>

            <span className="text-2xl text-rose-500">
              ♥
            </span>

          </div>

          <p className="mt-2 font-serif text-sm italic text-purple-900/70 sm:text-lg">
            The day my favorite person was born.
          </p>

          <motion.h3
            initial={{
              opacity: 0,
              scale: 0.85,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.2,
              delay: 3,
              type: "spring",
              stiffness: 100,
            }}
            className="mt-4 font-serif text-4xl font-semibold text-rose-600 drop-shadow-sm sm:text-6xl"
          >
            Happy Birthday, Seeju ❤️
          </motion.h3>

        </motion.div>

      </div>

      {/* =========================================================
          END MESSAGE
      ========================================================= */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 3.5,
          duration: 1.5,
        }}
        className="pointer-events-none fixed bottom-3 left-1/2 z-20 -translate-x-1/2 text-center"
      >
        <p className="font-serif text-xs text-white/50">
          Made with love ❤️
        </p>
      </motion.div>

    </section>
  );
}