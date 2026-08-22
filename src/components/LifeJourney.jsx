import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ============================================================
// IMAGES
// ============================================================
// Currently using seeju1 as placeholder.
// Later simply change these imports to:
// ../assets/seeju2.jpg
// ../assets/seeju3.jpg
// etc.
// ============================================================

import seeju1 from "../assets/seeju1.jpg";
import seeju2 from "../assets/seeju1.jpg";
import seeju3 from "../assets/seeju1.jpg";
import seeju4 from "../assets/seeju1.jpg";
import seeju5 from "../assets/seeju1.jpg";
import seeju6 from "../assets/seeju1.jpg";
import seeju7 from "../assets/seeju1.jpg";
import seeju8 from "../assets/seeju1.jpg";
import seeju9 from "../assets/seeju1.jpg";
import seeju10 from "../assets/seeju1.jpg";
import seeju11 from "../assets/seeju1.jpg";
import seeju12 from "../assets/seeju1.jpg";
import seeju13 from "../assets/seeju1.jpg";
import seeju14 from "../assets/seeju1.jpg";
import seeju15 from "../assets/seeju1.jpg";

export default function LifeJourney({ onComplete }) {
  const [phase, setPhase] = useState("opening");
  const [currentImage, setCurrentImage] = useState(0);

  // ============================================================
  // PHOTOS
  // ============================================================

  const photos = [
    seeju1,
    seeju2,
    seeju3,
    seeju4,
    seeju5,
    seeju6,
    seeju7,
    seeju8,
    seeju9,
    seeju10,
    seeju11,
    seeju12,
    seeju13,
    seeju14,
    seeju15,
  ];

  // ============================================================
  // CINEMATIC QUOTES
  // ============================================================

  const quotes = [
    {
      text: "Every beautiful story has a beginning...",
      position: "center",
    },

    {
      text: "Once upon a time, there was a little girl with a beautiful smile.",
      position: "bottom-left",
    },

    {
      text: "Little moments slowly became beautiful memories.",
      position: "bottom-right",
    },

    {
      text: "She laughed. She learned. She grew.",
      position: "center",
    },

    {
      text: "And somewhere along the way, she became someone truly special.",
      position: "top-left",
    },

    {
      text: "Some memories become a part of us forever.",
      position: "bottom-left",
    },

    {
      text: "There were smiles that made ordinary days unforgettable.",
      position: "bottom-right",
    },

    {
      text: "She kept growing, dreaming, and becoming herself.",
      position: "center",
    },

    {
      text: "Every year added another little piece to her story.",
      position: "top-right",
    },

    {
      text: "New places. New people. New memories.",
      position: "bottom-left",
    },

    {
      text: "And every version of her was beautiful in its own way.",
      position: "center",
    },

    {
      text: "The little girl from yesterday became the woman of today.",
      position: "bottom-right",
    },

    {
      text: "A thousand memories live behind that smile.",
      position: "top-left",
    },

    {
      text: "And somehow, the best chapters are still unwritten.",
      position: "center",
    },

    {
      text: "Look how far you've come.",
      position: "center",
    },
  ];

  // ============================================================
  // DIFFERENT CINEMATIC ENTRANCES
  // ============================================================

  const animations = [
    // 1 — Right
    {
      initial: {
        opacity: 0,
        x: "100%",
        scale: 1.08,
      },
      animate: {
        opacity: 1,
        x: "0%",
        scale: 1,
      },
      exit: {
        opacity: 0,
        x: "-18%",
        scale: 1.04,
      },
    },

    // 2 — Left
    {
      initial: {
        opacity: 0,
        x: "-100%",
        scale: 1.08,
      },
      animate: {
        opacity: 1,
        x: "0%",
        scale: 1,
      },
      exit: {
        opacity: 0,
        x: "18%",
        scale: 1.04,
      },
    },

    // 3 — Zoom
    {
      initial: {
        opacity: 0,
        scale: 1.35,
      },
      animate: {
        opacity: 1,
        scale: 1,
      },
      exit: {
        opacity: 0,
        scale: 1.15,
      },
    },

    // 4 — Bottom
    {
      initial: {
        opacity: 0,
        y: "100%",
        scale: 1.08,
      },
      animate: {
        opacity: 1,
        y: "0%",
        scale: 1,
      },
      exit: {
        opacity: 0,
        y: "-15%",
        scale: 1.04,
      },
    },

    // 5 — Blur
    {
      initial: {
        opacity: 0,
        scale: 1.15,
        filter: "blur(18px)",
      },
      animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      },
      exit: {
        opacity: 0,
        scale: 1.08,
        filter: "blur(12px)",
      },
    },

    // 6 — Rotate
    {
      initial: {
        opacity: 0,
        scale: 1.18,
        rotate: 4,
      },
      animate: {
        opacity: 1,
        scale: 1,
        rotate: 0,
      },
      exit: {
        opacity: 0,
        scale: 1.08,
        rotate: -3,
      },
    },

    // 7 — Diagonal
    {
      initial: {
        opacity: 0,
        x: "70%",
        y: "30%",
        scale: 1.12,
      },
      animate: {
        opacity: 1,
        x: "0%",
        y: "0%",
        scale: 1,
      },
      exit: {
        opacity: 0,
        x: "-15%",
        y: "-10%",
        scale: 1.08,
      },
    },

    // 8 — Top
    {
      initial: {
        opacity: 0,
        y: "-100%",
        scale: 1.08,
      },
      animate: {
        opacity: 1,
        y: "0%",
        scale: 1,
      },
      exit: {
        opacity: 0,
        y: "20%",
        scale: 1.05,
      },
    },

    // 9 — Soft reveal
    {
      initial: {
        opacity: 0,
        scale: 0.88,
        filter: "blur(10px)",
      },
      animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      },
      exit: {
        opacity: 0,
        scale: 1.08,
      },
    },

    // 10 — Horizontal cinematic
    {
      initial: {
        opacity: 0,
        x: "80%",
        scale: 1.12,
      },
      animate: {
        opacity: 1,
        x: "0%",
        scale: 1,
      },
      exit: {
        opacity: 0,
        x: "-20%",
      },
    },

    // 11 — Slow zoom
    {
      initial: {
        opacity: 0,
        scale: 1.25,
      },
      animate: {
        opacity: 1,
        scale: 1,
      },
      exit: {
        opacity: 0,
        scale: 1.12,
      },
    },

    // 12 — Left diagonal
    {
      initial: {
        opacity: 0,
        x: "-70%",
        y: "25%",
        scale: 1.1,
      },
      animate: {
        opacity: 1,
        x: "0%",
        y: "0%",
        scale: 1,
      },
      exit: {
        opacity: 0,
        x: "15%",
        y: "-10%",
      },
    },

    // 13 — Bottom zoom
    {
      initial: {
        opacity: 0,
        y: "70%",
        scale: 1.2,
      },
      animate: {
        opacity: 1,
        y: "0%",
        scale: 1,
      },
      exit: {
        opacity: 0,
        y: "-15%",
      },
    },

    // 14 — Dreamy blur
    {
      initial: {
        opacity: 0,
        scale: 1.22,
        filter: "blur(20px)",
      },
      animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      },
      exit: {
        opacity: 0,
        scale: 1.06,
        filter: "blur(8px)",
      },
    },

    // 15 — FINAL
    {
      initial: {
        opacity: 0,
        scale: 1.15,
        filter: "blur(12px)",
      },
      animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      },
      exit: {
        opacity: 0,
        scale: 1.05,
      },
    },
  ];

  // ============================================================
  // LIFE JOURNEY STARTS
  // ============================================================

  useEffect(() => {
    if (phase !== "opening") return;

    const timer = setTimeout(() => {
      setPhase("photos");
    }, 5000);

    return () => clearTimeout(timer);
  }, [phase]);

  // ============================================================
  // PHOTO SEQUENCE
  // ============================================================

  useEffect(() => {
    if (phase !== "photos") return;

    const timer = setTimeout(() => {
      if (currentImage < photos.length - 1) {
        setCurrentImage((prev) => prev + 1);
      } else {
        setPhase("final");
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [phase, currentImage, photos.length]);

  // ============================================================
  // FINAL SCREEN
  // ============================================================

  useEffect(() => {
    if (phase !== "final") return;

    const timer = setTimeout(() => {
      setPhase("fade");
    }, 8500);

    return () => clearTimeout(timer);
  }, [phase]);

  // ============================================================
  // FADE → NEXT CHAPTER
  // ============================================================

  useEffect(() => {
    if (phase !== "fade") return;

    const timer = setTimeout(() => {
      onComplete?.();
    }, 3500);

    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  // ============================================================
  // STARS
  // ============================================================

  const stars = Array.from({ length: 40 });

  // ============================================================
  // CURRENT ANIMATION
  // ============================================================

  const currentAnimation = animations[currentImage];

  // ============================================================
  // QUOTE POSITION
  // ============================================================

  const quotePosition = {
    center:
      "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",

    "bottom-left":
      "bottom-20 left-7 sm:bottom-24 sm:left-12",

    "bottom-right":
      "bottom-20 right-7 text-right sm:bottom-24 sm:right-12",

    "top-left":
      "left-7 top-20 sm:left-12 sm:top-28",

    "top-right":
      "right-7 top-20 text-right sm:right-12 sm:top-28",
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-0 bg-black" />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.045),transparent_65%)]
        "
      />

      {/* ======================================================
          STARS
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-10">

        {stars.map((_, index) => (
          <motion.span
            key={index}
            className="absolute text-white/20"
            style={{
              left: `${(index * 29) % 100}%`,
              top: `${(index * 47) % 100}%`,
              fontSize: `${4 + (index % 3) * 3}px`,
            }}
            animate={{
              opacity: [0.05, 0.4, 0.05],
              scale: [0.7, 1.15, 0.7],
            }}
            transition={{
              duration: 3 + (index % 4),
              repeat: Infinity,
              delay: index * 0.15,
            }}
          >
            {index % 3 === 0 ? "✦" : "·"}
          </motion.span>
        ))}

      </div>

      <AnimatePresence mode="wait">

        {/* ====================================================
            OPENING
        ==================================================== */}

        {phase === "opening" && (
          <motion.div
            key="opening"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.04,
            }}
            transition={{
              duration: 2,
            }}
            className="
              absolute
              inset-0
              z-30
              flex
              items-center
              justify-center
              bg-black
              px-6
              text-center
            "
          >

            <div>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.8,
                  duration: 1.5,
                }}
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.65em]
                  text-white/30
                  sm:text-xs
                "
              >
                A little story
              </motion.p>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 30,
                  filter: "blur(12px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  delay: 1.5,
                  duration: 2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  mt-8
                  font-serif
                  text-4xl
                  font-light
                  leading-tight
                  sm:text-6xl
                  md:text-7xl
                "
              >
                Every beautiful story
                <br />
                has a beginning...
              </motion.h1>

              <motion.div
                initial={{
                  width: 0,
                  opacity: 0,
                }}
                animate={{
                  width: 80,
                  opacity: 1,
                }}
                transition={{
                  delay: 3.5,
                  duration: 1.2,
                }}
                className="mx-auto mt-10 h-px bg-white/30"
              />

            </div>

          </motion.div>
        )}

        {/* ====================================================
            PHOTO MOVIE
        ==================================================== */}

        {phase === "photos" && (
          <motion.div
            key={`photo-${currentImage}`}
            className="absolute inset-0 z-20 overflow-hidden"
            initial={currentAnimation.initial}
            animate={currentAnimation.animate}
            exit={currentAnimation.exit}
            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >

            {/* ==================================================
                PHOTO
            ================================================== */}

            <motion.img
              src={photos[currentImage]}
              alt={`Seeju memory ${currentImage + 1}`}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
              initial={{
                scale: 1,
              }}
              animate={{
                scale: 1.09,
              }}
              transition={{
                duration: 6,
                ease: "linear",
              }}
            />

            {/* ==================================================
                CINEMATIC DARK OVERLAY
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-black/15
              "
            />

            {/* ==================================================
                TOP + BOTTOM VIGNETTE
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),transparent_28%,transparent_62%,rgba(0,0,0,0.72))]
              "
            />

            {/* ==================================================
                CENTER VIGNETTE
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.5)_100%)]
              "
            />

            {/* ==================================================
                PHOTO NUMBER
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.2,
                duration: 1,
              }}
              className="
                absolute
                left-6
                top-7
                z-30
                text-[9px]
                uppercase
                tracking-[0.45em]
                text-white/55
                sm:left-10
                sm:top-10
              "
            >
              {String(currentImage + 1).padStart(2, "0")}

              <span className="mx-2 text-white/20">
                /
              </span>

              15
            </motion.div>

            {/* ==================================================
                CINEMATIC QUOTE
            ================================================== */}

            <motion.div
              key={`quote-${currentImage}`}
              initial={{
                opacity: 0,
                y: 25,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                delay: 1.6,
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`
                absolute
                z-30
                w-[85%]
                max-w-2xl
                ${quotePosition[quotes[currentImage].position]}
              `}
            >

              <div
                className="
                  relative
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-black/[0.18]
                  px-6
                  py-5
                  backdrop-blur-[3px]
                  sm:px-9
                  sm:py-6
                "
              >

                {/* TINY LINE */}

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: 35,
                  }}
                  transition={{
                    delay: 2,
                    duration: 0.8,
                  }}
                  className="mb-4 h-px bg-white/35"
                />

                <p
                  className="
                    font-serif
                    text-lg
                    font-light
                    leading-relaxed
                    tracking-wide
                    text-white/85
                    sm:text-2xl
                    md:text-3xl
                  "
                >
                  {quotes[currentImage].text}
                </p>

              </div>

            </motion.div>

            {/* ==================================================
                SMALL HEART
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 2.5,
                duration: 0.8,
              }}
              className="
                absolute
                bottom-8
                left-1/2
                z-30
                -translate-x-1/2
                text-xl
                text-white/45
              "
            >
              ♥
            </motion.div>

            {/* ==================================================
                PROGRESS BAR
            ================================================== */}

            <div
              className="
                absolute
                bottom-0
                left-0
                z-40
                h-[2px]
                w-full
                bg-white/10
              "
            >

              <motion.div
                key={`progress-${currentImage}`}
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 6,
                  ease: "linear",
                }}
                className="h-full bg-white/70"
              />

            </div>

          </motion.div>
        )}

        {/* ====================================================
            FINAL IMAGE
        ==================================================== */}

        {phase === "final" && (
          <motion.div
            key="final"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 2,
            }}
            className="
              absolute
              inset-0
              z-30
              overflow-hidden
              bg-black
            "
          >

            {/* FINAL IMAGE */}

            <motion.img
              src={seeju15}
              alt="Seeju"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
              initial={{
                scale: 1.08,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                duration: 8,
                ease: "easeOut",
              }}
            />

            {/* DARK OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-black/35
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.78)_100%)]
              "
            />

            {/* FINAL MESSAGE */}

            <div
              className="
                absolute
                inset-0
                z-40
                flex
                items-center
                justify-center
                px-6
                text-center
              "
            >

              <div>

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
                    delay: 1.2,
                    duration: 1.5,
                  }}
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.6em]
                    text-white/60
                    sm:text-xs
                  "
                >
                  And here she is...
                </motion.p>

                <motion.h2
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    delay: 2,
                    duration: 2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="
                    mt-7
                    font-serif
                    text-4xl
                    font-light
                    leading-tight
                    sm:text-6xl
                    md:text-7xl
                  "
                >
                  Look how far
                  <br />
                  you've come.
                </motion.h2>

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 4,
                    duration: 1.5,
                  }}
                  className="
                    mt-8
                    font-serif
                    text-base
                    italic
                    text-white/55
                    sm:text-lg
                  "
                >
                  And the most beautiful chapters
                  <br />
                  are still waiting for you.
                </motion.p>

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 5.5,
                    duration: 1,
                  }}
                  className="mt-8 text-xl text-white/60"
                >
                  ♥
                </motion.div>

              </div>

            </div>

          </motion.div>
        )}

        {/* ====================================================
            FADE
        ==================================================== */}

        {phase === "fade" && (
          <motion.div
            key="fade"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
              absolute
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black
            "
          >

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1,
                duration: 1.5,
              }}
              className="
                font-serif
                text-sm
                italic
                tracking-wide
                text-white/30
              "
            >
              And there is still so much more to come...
            </motion.p>

          </motion.div>
        )}

      </AnimatePresence>

    </section>
  );
}