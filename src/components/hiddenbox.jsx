import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function HiddenBox({ onComplete }) {
  const [phase, setPhase] = useState("intro");
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [birthdayBubbles, setBirthdayBubbles] = useState([]);

  // ============================================================
  // PIN
  // ============================================================

  const CORRECT_PIN = "091404";

  // ============================================================
  // BIRTHDAY BUBBLES
  // ============================================================

  const createBirthdayBubble = () => {
    const id = `${Date.now()}-${Math.random()}`;

    const bubble = {
      id,
      x: 8 + Math.random() * 84,
      y: 55 + Math.random() * 24,
      drift: -55 + Math.random() * 110,
      rotate: -14 + Math.random() * 28,
      scale: 0.75 + Math.random() * 0.35,
      emoji: ["🎂", "🎈", "✨", "💖", "🎉", "🌸"][
        Math.floor(Math.random() * 6)
      ],
    };

    setBirthdayBubbles((prev) => [...prev.slice(-9), bubble]);

    setTimeout(() => {
      setBirthdayBubbles((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }, 1900);
  };

  // ============================================================
  // INTRO → HIDDEN BOX
  // ============================================================

  useEffect(() => {
    if (phase !== "intro") return;

    const timer = setTimeout(() => {
      setPhase("box");
    }, 5000);

    return () => clearTimeout(timer);
  }, [phase]);

  // ============================================================
  // PIN INPUT
  // ============================================================

  const addNumber = (number) => {
    if (unlocked) return;

    if (pin.length >= CORRECT_PIN.length) return;

    setPin((prev) => prev + number);

    // Birthday bubble appears whenever a number is typed
    createBirthdayBubble();
  };

  // ============================================================
  // DELETE
  // ============================================================

  const deleteNumber = () => {
    if (unlocked) return;

    setPin((prev) => prev.slice(0, -1));
  };

  // ============================================================
  // CHECK PIN
  // ============================================================

  const checkPin = () => {
    if (pin === CORRECT_PIN) {
      setUnlocked(true);

      // Final birthday bubble burst
      Array.from({ length: 8 }).forEach((_, index) => {
        setTimeout(createBirthdayBubble, index * 90);
      });

      setTimeout(() => {
        setPhase("opened");
      }, 1800);

      return;
    }

    // Wrong PIN
    setShake(true);

    setTimeout(() => {
      setShake(false);
      setPin("");
    }, 600);
  };

  // ============================================================
  // GO TO NEXT PART
  // ============================================================

  useEffect(() => {
    if (phase !== "opened") return;

    const timer = setTimeout(() => {
      onComplete?.();
    }, 4500);

    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  // ============================================================
  // NUMBER KEYPAD
  // ============================================================

  const keypad = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "delete",
    "0",
    "enter",
  ];

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#05030a] text-white">

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-[#05030a]" />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_35%,rgba(255,105,180,0.13),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.10),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.10),transparent_28%)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035),transparent_68%)]
        "
      />

      {/* ======================================================
          STARS
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-0">

        {Array.from({ length: 35 }).map((_, index) => (
          <motion.span
            key={index}
            className="absolute text-white/20"
            style={{
              left: `${(index * 31) % 100}%`,
              top: `${(index * 53) % 100}%`,
              fontSize: `${4 + (index % 3) * 3}px`,
            }}
            animate={{
              opacity: [0.03, 0.25, 0.03],
              scale: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3 + (index % 4),
              repeat: Infinity,
              delay: index * 0.12,
            }}
          >
            {index % 4 === 0 ? "✦" : "·"}
          </motion.span>
        ))}

      </div>

      {/* ======================================================
          BIRTHDAY BUBBLES
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">

        <AnimatePresence>

          {birthdayBubbles.map((bubble) => (

            <motion.div
              key={bubble.id}
              initial={{
                opacity: 0,
                x: `${bubble.x}vw`,
                y: `${bubble.y}vh`,
                scale: 0.35,
                rotate: bubble.rotate,
              }}
              animate={{
                opacity: [0, 1, 1, 0],

                x: `calc(${bubble.x}vw + ${bubble.drift}px)`,

                y: [
                  `${bubble.y}vh`,
                  `calc(${bubble.y}vh - 90px)`,
                  `calc(${bubble.y}vh - 190px)`,
                ],

                scale: [0.35, bubble.scale, 1.02],

                rotate: [
                  bubble.rotate,
                  bubble.rotate + 8,
                  bubble.rotate - 5,
                ],
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
              transition={{
                duration: 1.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                absolute
                -translate-x-1/2
                -translate-y-1/2
              "
            >

              <div
                className="
                  relative
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/25
                  bg-white/[0.09]
                  px-4
                  py-2
                  shadow-[0_12px_45px_rgba(255,105,180,0.18)]
                  backdrop-blur-xl
                "
              >

                <span className="text-sm">
                  {bubble.emoji}
                </span>

                <span
                  className="
                    whitespace-nowrap
                    font-serif
                    text-sm
                    font-medium
                    tracking-wide
                    text-white
                    drop-shadow-[0_0_10px_rgba(255,182,193,0.55)]
                  "
                >
                  Happy Birthday
                </span>

                <span
                  className="
                    absolute
                    -bottom-1
                    left-5
                    h-2
                    w-2
                    rotate-45
                    border-b
                    border-r
                    border-white/20
                    bg-white/[0.08]
                  "
                />

              </div>

            </motion.div>

          ))}

        </AnimatePresence>

      </div>

      {/* ======================================================
          MAIN PHASES
      ====================================================== */}

      <AnimatePresence mode="wait">

        {/* ====================================================
            INTRO
        ==================================================== */}

        {phase === "intro" && (

          <motion.div
            key="intro"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.03,
            }}
            transition={{
              duration: 2,
            }}
            className="
              absolute
              inset-0
              z-20
              flex
              items-center
              justify-center
              bg-black
              px-6
              text-center
            "
          >

            <div>

              {/* Small text */}

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
                  duration: 1.3,
                }}
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.65em]
                  text-white/30
                  sm:text-xs
                "
              >
                One more thing...
              </motion.p>

              {/* Main message */}

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
                I made something
                <br />
                just for you.
              </motion.h1>

              {/* Small line */}

              <motion.div
                initial={{
                  width: 0,
                  opacity: 0,
                }}
                animate={{
                  width: 60,
                  opacity: 1,
                }}
                transition={{
                  delay: 3.5,
                  duration: 1,
                }}
                className="mx-auto mt-10 h-px bg-white/30"
              />

              {/* Bottom text */}

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 4,
                  duration: 1.2,
                }}
                className="
                  mt-7
                  font-serif
                  text-sm
                  italic
                  text-white/25
                  sm:text-base
                "
              >
                A little secret is waiting...
              </motion.p>

            </div>

          </motion.div>

        )}

        {/* ====================================================
            LOCKED BOX
        ==================================================== */}

        {phase === "box" && (

          <motion.div
            key="box"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.03,
            }}
            transition={{
              duration: 1.8,
            }}
            className="
              absolute
              inset-0
              z-20
              flex
              items-center
              justify-center
              overflow-y-auto
              px-5
              py-10
            "
          >

            <div className="w-full max-w-md text-center">

              {/* ==================================================
                  TITLE
              ================================================== */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: -15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
                  duration: 1,
                }}
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.6em]
                  text-white/30
                "
              >
                Something special
              </motion.p>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.8,
                  duration: 1.2,
                }}
                className="
                  mt-5
                  font-serif
                  text-3xl
                  font-light
                  sm:text-5xl
                "
              >
                Your HiddenBox
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 1.2,
                  duration: 1,
                }}
                className="
                  mt-3
                  font-serif
                  text-sm
                  italic
                  text-white/35
                "
              >
                Some things are worth unlocking.
              </motion.p>

              {/* ==================================================
                  BOX
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  delay: 1.4,
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative mx-auto mt-10 h-44 w-56 sm:h-52 sm:w-64"
              >

                {/* Glow */}

                <div
                  className="
                    absolute
                    inset-[-40px]
                    rounded-full
                    bg-pink-400/[0.06]
                    blur-3xl
                  "
                />

                {/* Box body */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-28
                    w-52
                    -translate-x-1/2
                    rounded-b-2xl
                    border
                    border-white/10
                    bg-gradient-to-b
                    from-white/[0.08]
                    to-white/[0.02]
                    shadow-[0_25px_80px_rgba(0,0,0,0.8)]
                    sm:h-32
                    sm:w-60
                  "
                >

                  {/* Vertical ribbon */}

                  <div
                    className="
                      absolute
                      left-1/2
                      top-0
                      h-full
                      w-5
                      -translate-x-1/2
                      bg-pink-300/[0.07]
                    "
                  />

                  {/* Horizontal ribbon */}

                  <div
                    className="
                      absolute
                      left-0
                      top-1/2
                      h-5
                      w-full
                      -translate-y-1/2
                      bg-pink-300/[0.07]
                    "
                  />

                </div>

                {/* Box lid */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-10
                    h-14
                    w-56
                    -translate-x-1/2
                    rounded-xl
                    border
                    border-white/[0.12]
                    bg-gradient-to-b
                    from-white/[0.11]
                    to-white/[0.04]
                    shadow-[0_15px_40px_rgba(0,0,0,0.7)]
                    sm:w-64
                  "
                >

                  <div
                    className="
                      absolute
                      left-1/2
                      top-0
                      h-full
                      w-5
                      -translate-x-1/2
                      bg-pink-300/[0.07]
                    "
                  />

                </div>

                {/* Lock */}

                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    left-1/2
                    top-20
                    z-10
                    -translate-x-1/2
                  "
                >

                  <div
                    className="
                      relative
                      flex
                      h-14
                      w-11
                      items-end
                      justify-center
                      rounded-lg
                      border
                      border-pink-200/20
                      bg-[#080808]
                      pb-2
                      shadow-[0_8px_25px_rgba(0,0,0,0.8)]
                    "
                  >

                    {/* Lock shackle */}

                    <div
                      className="
                        absolute
                        -top-7
                        h-8
                        w-7
                        rounded-t-full
                        border-2
                        border-b-0
                        border-pink-200/25
                      "
                    />

                    <div className="h-2 w-2 rounded-full bg-pink-200/50" />

                  </div>

                </motion.div>

              </motion.div>

              {/* ==================================================
                  PIN LABEL
              ================================================== */}

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 2,
                  duration: 1,
                }}
                className="
                  mt-7
                  text-[9px]
                  uppercase
                  tracking-[0.5em]
                  text-white/30
                "
              >
                Enter the secret code
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 2.15,
                  duration: 0.8,
                }}
                className="
                  mt-2
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-[10px]
                  tracking-[0.22em]
                  text-pink-200/45
                "
              >
                <span>✦</span>
                <span>A birthday secret is hiding here</span>
                <span>✦</span>
              </motion.div>

              {/* ==================================================
                  PIN DOTS
              ================================================== */}

              <motion.div
                animate={
                  shake
                    ? {
                        x: [-8, 8, -6, 6, -3, 3, 0],
                      }
                    : {
                        x: 0,
                      }
                }
                transition={{
                  duration: 0.45,
                }}
                className="mt-5 flex justify-center gap-3"
              >

                {Array.from({
                  length: CORRECT_PIN.length,
                }).map((_, index) => (

                  <motion.div
                    key={index}
                    animate={{
                      scale: index < pin.length ? 1 : 0.8,
                      opacity: index < pin.length ? 1 : 0.25,
                      boxShadow:
                        index < pin.length
                          ? "0 0 12px rgba(244,114,182,0.55)"
                          : "0 0 0 rgba(0,0,0,0)",
                    }}
                    className="
                      h-2.5
                      w-2.5
                      rounded-full
                      border
                      border-white/30
                      bg-pink-200/60
                    "
                  />

                ))}

              </motion.div>

              {/* ==================================================
                  KEYPAD
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 2.2,
                  duration: 1,
                }}
                className="
                  mx-auto
                  mt-7
                  grid
                  max-w-[260px]
                  grid-cols-3
                  gap-2.5
                "
              >

                {keypad.map((key) => {

                  {/* DELETE */}

                  if (key === "delete") {

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={deleteNumber}
                        className="
                          flex
                          h-12
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-white/[0.08]
                          bg-white/[0.025]
                          text-[10px]
                          uppercase
                          tracking-widest
                          text-white/40
                          transition
                          hover:bg-white/[0.07]
                          active:scale-95
                        "
                      >
                        ←
                      </button>
                    );
                  }

                  {/* ENTER */}

                  if (key === "enter") {

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={checkPin}
                        className="
                          flex
                          h-12
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-pink-300/20
                          bg-pink-400/[0.08]
                          text-[9px]
                          uppercase
                          tracking-[0.3em]
                          text-pink-100/70
                          shadow-[0_0_25px_rgba(236,72,153,0.08)]
                          transition
                          hover:bg-pink-400/[0.14]
                          hover:shadow-[0_0_30px_rgba(236,72,153,0.16)]
                          active:scale-95
                        "
                      >
                        Open
                      </button>
                    );
                  }

                  {/* NUMBER */}

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => addNumber(key)}
                      className="
                        flex
                        h-12
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/[0.10]
                        bg-gradient-to-br
                        from-white/[0.08]
                        to-white/[0.025]
                        font-serif
                        text-lg
                        text-white/75
                        shadow-[0_8px_25px_rgba(0,0,0,0.28)]
                        backdrop-blur-md
                        transition
                        hover:border-pink-300/30
                        hover:bg-pink-400/[0.10]
                        hover:text-white
                        hover:shadow-[0_0_24px_rgba(236,72,153,0.14)]
                        active:scale-90
                      "
                    >
                      {key}
                    </button>
                  );

                })}

              </motion.div>

              {/* ==================================================
                  WRONG PIN
              ================================================== */}

              <AnimatePresence>

                {shake && (

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="
                      mt-4
                      font-serif
                      text-xs
                      italic
                      text-pink-200/50
                    "
                  >
                    Almost... the birthday magic is still locked. 💖
                  </motion.p>

                )}

              </AnimatePresence>

            </div>

          </motion.div>

        )}

        {/* ====================================================
            UNLOCKED
        ==================================================== */}

        {phase === "opened" && (

          <motion.div
            key="opened"
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
              duration: 1.5,
            }}
            className="
              absolute
              inset-0
              z-30
              flex
              items-center
              justify-center
              bg-black
            "
          >

            <div className="relative flex flex-col items-center">

              {/* Glow */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.5, 2],
                }}
                transition={{
                  duration: 2.5,
                }}
                className="
                  pointer-events-none
                  absolute
                  h-64
                  w-64
                  rounded-full
                  bg-pink-400/[0.10]
                  blur-3xl
                "
              />

              {/* Opened box */}

              <motion.div
                initial={{
                  scale: 0.7,
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative h-40 w-52"
              >

                {/* Light coming out */}

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.3,
                  }}
                  animate={{
                    opacity: [0, 1, 0.7],
                    scale: [0.3, 1.2, 1],
                  }}
                  transition={{
                    delay: 0.6,
                    duration: 1.5,
                  }}
                  className="
                    absolute
                    left-1/2
                    top-[-50px]
                    h-40
                    w-40
                    -translate-x-1/2
                    rounded-full
                    bg-pink-300/[0.10]
                    blur-3xl
                  "
                />

                {/* Box bottom */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-24
                    w-48
                    -translate-x-1/2
                    rounded-b-2xl
                    border
                    border-pink-200/15
                    bg-white/[0.06]
                  "
                />

                {/* Open lid */}

                <motion.div
                  initial={{
                    rotateX: 0,
                    y: 0,
                  }}
                  animate={{
                    rotateX: -55,
                    y: -28,
                  }}
                  transition={{
                    delay: 0.4,
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    transformOrigin: "bottom center",
                  }}
                  className="
                    absolute
                    left-1/2
                    top-8
                    z-20
                    h-12
                    w-52
                    -translate-x-1/2
                    rounded-xl
                    border
                    border-pink-200/15
                    bg-white/[0.08]
                  "
                />

                {/* Sparkles */}

                {[
                  { x: -80, y: -55 },
                  { x: 75, y: -35 },
                  { x: -55, y: 5 },
                  { x: 65, y: 10 },
                ].map((star, index) => (

                  <motion.span
                    key={index}
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: star.x,
                      y: star.y,
                    }}
                    transition={{
                      delay: 0.8 + index * 0.15,
                      duration: 1.8,
                    }}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      text-sm
                      text-pink-200/80
                    "
                  >
                    ✦
                  </motion.span>

                ))}

              </motion.div>

              {/* Message */}

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
                  delay: 1.8,
                  duration: 1.3,
                }}
                className="
                  mt-10
                  font-serif
                  text-3xl
                  font-light
                  sm:text-5xl
                "
              >
                You found it.
              </motion.p>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 2.5,
                  duration: 1.2,
                }}
                className="
                  mt-4
                  font-serif
                  text-sm
                  italic
                  text-white/35
                  sm:text-base
                "
              >
                But there's something waiting inside...
              </motion.p>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
}
