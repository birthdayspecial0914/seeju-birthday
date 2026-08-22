import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, Heart } from "lucide-react";

export default function CandleScene({ onComplete }) {
  const [phase, setPhase] = useState("intro");
  const [countdown, setCountdown] = useState(5);
  const [micActive, setMicActive] = useState(false);
  const [blownOut, setBlownOut] = useState(false);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const blowStartRef = useRef(null);

  // =========================================================
  // INTRO → CAKE
  // =========================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("cake");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // =========================================================
  // CAKE → COUNTDOWN
  // No button. The movie controls itself.
  // =========================================================

  useEffect(() => {
    if (phase !== "cake") return;

    const timer = setTimeout(() => {
      setPhase("countdown");
    }, 6500);

    return () => clearTimeout(timer);
  }, [phase]);

  // =========================================================
  // COUNTDOWN
  // =========================================================

  useEffect(() => {
    if (phase !== "countdown") return;

    let current = 5;
    setCountdown(5);

    const timer = setInterval(() => {
      current -= 1;

      if (current <= 0) {
        clearInterval(timer);

        setTimeout(() => {
          setPhase("blow");
        }, 1000);

        return;
      }

      setCountdown(current);
    }, 1200);

    return () => clearInterval(timer);
  }, [phase]);

  // =========================================================
  // MICROPHONE
  // =========================================================

  useEffect(() => {
    if (phase !== "blow") return;

    startMicrophone();

    return () => {
      stopMicrophone();
    };
  }, [phase]);

  // =========================================================
  // START MICROPHONE
  // =========================================================

  const startMicrophone = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const AudioContext =
        window.AudioContext || window.webkitAudioContext;

      const audioContext = new AudioContext();

      audioContextRef.current = audioContext;

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.75;

      analyserRef.current = analyser;

      const microphone =
        audioContext.createMediaStreamSource(stream);

      microphone.connect(analyser);

      setMicActive(true);

      detectBlow();
    } catch (error) {
      console.log("Microphone unavailable:", error);
      setMicActive(false);
    }
  };

  // =========================================================
  // BLOW DETECTION
  // =========================================================

  const detectBlow = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;

    const dataArray = new Uint8Array(
      analyser.frequencyBinCount
    );

    const checkVolume = () => {
      analyser.getByteFrequencyData(dataArray);

      let total = 0;

      for (let i = 0; i < dataArray.length; i++) {
        total += dataArray[i];
      }

      const average = total / dataArray.length;

      /*
        Instead of triggering from one loud sound,
        require the sound to remain above the threshold
        for a short period.
      */

      if (average > 42) {
        if (!blowStartRef.current) {
          blowStartRef.current = Date.now();
        }

        const duration =
          Date.now() - blowStartRef.current;

        if (duration > 350) {
          extinguishCandle();
          return;
        }
      } else {
        blowStartRef.current = null;
      }

      animationRef.current =
        requestAnimationFrame(checkVolume);
    };

    checkVolume();
  };

  // =========================================================
  // EXTINGUISH
  // =========================================================

  const extinguishCandle = () => {
    if (blownOut) return;

    setBlownOut(true);

    stopMicrophone();

    /*
      Small pause after the flame disappears.
      Then fireworks.
    */

    setTimeout(() => {
      setPhase("celebration");
    }, 2200);
  };

  // =========================================================
  // MANUAL FALLBACK
  // =========================================================

  const manualBlow = () => {
    extinguishCandle();
  };

  // =========================================================
  // STOP MICROPHONE
  // =========================================================

  const stopMicrophone = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());

      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();

      audioContextRef.current = null;
    }

    analyserRef.current = null;
    blowStartRef.current = null;

    setMicActive(false);
  };

  // =========================================================
  // CLEANUP
  // =========================================================

  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, []);

  // =========================================================
  // FIREWORK PARTICLES
  // =========================================================

  const fireworks = Array.from({ length: 55 });

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030303] text-white">

      {/* =====================================================
          CINEMATIC BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <motion.div
          className="
            absolute
            left-1/2
            top-1/2
            h-[600px]
            w-[600px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-amber-300/[0.035]
            blur-[150px]
          "
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.72)_100%)]" />

      </div>

      {/* =====================================================
          STARS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {[...Array(16)].map((_, index) => (
          <motion.span
            key={index}
            className="absolute text-white/20"
            style={{
              left: `${5 + ((index * 19) % 90)}%`,
              top: `${8 + ((index * 31) % 84)}%`,
            }}
            animate={{
              opacity: [0.05, 0.45, 0.05],
              scale: [0.7, 1.1, 0.7],
            }}
            transition={{
              duration: 3 + (index % 4),
              repeat: Infinity,
              delay: index * 0.35,
            }}
          >
            {index % 2 === 0 ? "✦" : "·"}
          </motion.span>
        ))}

      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">

        <AnimatePresence mode="wait">

          {/* =================================================
              INTRO
          ================================================= */}

          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 1.8,
              }}
              className="text-center"
            >
              <p className="text-[10px] uppercase tracking-[0.6em] text-white/30 sm:text-xs">
                And now...
              </p>

              <h2 className="mt-7 font-serif text-4xl font-light tracking-wide sm:text-6xl">
                Make a wish, Seeju
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 1.4,
                  duration: 1.5,
                }}
                className="mt-6 font-serif text-base italic text-white/30 sm:text-lg"
              >
                Something special is waiting for you...
              </motion.p>
            </motion.div>
          )}

          {/* =================================================
              CAKE
          ================================================= */}

          {phase === "cake" && (
            <motion.div
              key="cake"
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center"
            >

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 1.5,
                }}
                className="mb-14 text-[10px] uppercase tracking-[0.6em] text-white/30 sm:text-xs"
              >
                A little moment for you
              </motion.p>

              {/* CANDLE */}

              <div className="relative z-20">

                {/* Flame glow */}

                <motion.div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    h-20
                    w-20
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-orange-300/10
                    blur-2xl
                  "
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scale: [0.8, 1.15, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Flame */}

                <motion.div
                  className="relative mb-[-5px] flex justify-center"
                  animate={{
                    rotate: [-3, 3, -2, 2, -3],
                    scale: [1, 1.08, 0.96, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-5xl">
                    🕯️
                  </div>
                </motion.div>

                {/* Candle */}

                <div className="mx-auto h-20 w-5 rounded-t-md bg-gradient-to-r from-pink-200 via-white to-pink-200 shadow-lg" />

              </div>

              {/* CAKE */}

              <div className="relative mt-[-2px]">

                <div className="h-24 w-60 rounded-t-[28px] bg-gradient-to-b from-pink-200 via-pink-300 to-pink-400 shadow-2xl sm:h-28 sm:w-72" />

                {/* Frosting */}

                <div className="absolute -top-3 left-0 h-8 w-full rounded-full bg-white/85" />

                {/* Cake details */}

                <div className="absolute left-[15%] top-[45%] h-2 w-2 rounded-full bg-white/50" />
                <div className="absolute left-[35%] top-[65%] h-2 w-2 rounded-full bg-white/40" />
                <div className="absolute right-[30%] top-[50%] h-2 w-2 rounded-full bg-white/50" />
                <div className="absolute right-[15%] top-[68%] h-2 w-2 rounded-full bg-white/40" />

                <div className="h-7 w-60 rounded-b-2xl bg-pink-500/80 sm:w-72" />

              </div>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="mt-12 font-serif text-lg italic text-white/40"
              >
                Close your eyes and think of something beautiful...
              </motion.p>

            </motion.div>
          )}

          {/* =================================================
              COUNTDOWN
          ================================================= */}

          {phase === "countdown" && (
            <motion.div
              key="countdown"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="flex flex-col items-center text-center"
            >

              <p className="text-[10px] uppercase tracking-[0.6em] text-white/30 sm:text-xs">
                Your wish begins now
              </p>

              <AnimatePresence mode="wait">

                <motion.div
                  key={countdown}
                  initial={{
                    opacity: 0,
                    scale: 0.65,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.3,
                    filter: "blur(10px)",
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="mt-12 font-serif text-[150px] font-light leading-none sm:text-[210px]"
                >
                  {countdown}
                </motion.div>

              </AnimatePresence>

              <motion.p
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="mt-10 font-serif text-lg italic text-white/35"
              >
                Hold onto that wish...
              </motion.p>

            </motion.div>
          )}

          {/* =================================================
              BLOW
          ================================================= */}

          {phase === "blow" && (
            <motion.div
              key="blow"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 1.5,
              }}
              className="flex flex-col items-center text-center"
            >

              {/* Candle */}

              <motion.div
                animate={{
                  x: [-2, 2, -2, 2, -2],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >

                <AnimatePresence>

                  {!blownOut && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                      }}
                      animate={{
                        opacity: 1,
                        scale: [1, 1.12, 0.94, 1],
                        rotate: [-3, 3, -2, 2, -3],
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.2,
                        y: -20,
                        filter: "blur(8px)",
                      }}
                      transition={{
                        duration: 0.8,
                      }}
                      className="mb-[-5px] text-5xl"
                    >
                      🔥
                    </motion.div>
                  )}

                </AnimatePresence>

                <div className="mx-auto h-20 w-5 rounded-t-md bg-gradient-to-r from-pink-200 via-white to-pink-200 shadow-lg" />

              </motion.div>

              {/* Cake */}

              <div className="relative mt-[-2px]">

                <div className="h-24 w-60 rounded-t-[28px] bg-gradient-to-b from-pink-200 via-pink-300 to-pink-400 shadow-2xl sm:h-28 sm:w-72" />

                <div className="absolute -top-3 left-0 h-8 w-full rounded-full bg-white/85" />

                <div className="h-7 w-60 rounded-b-2xl bg-pink-500/80 sm:w-72" />

              </div>

              {/* TEXT */}

              <motion.div
                className="mt-14"
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >

                <h2 className="font-serif text-4xl font-light sm:text-6xl">
                  Blow the candle
                </h2>

                <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/35">
                  Take a deep breath...
                  <br />
                  and blow gently toward the screen.
                </p>

              </motion.div>

              {/* MICROPHONE */}

              <motion.div
                animate={{
                  opacity: [0.35, 0.7, 0.35],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="mt-8 flex items-center gap-3 text-xs text-white/35"
              >
                <Mic size={16} />

                <span>
                  {micActive
                    ? "Listening for your wish..."
                    : "Microphone unavailable"}
                </span>
              </motion.div>

              {/* FALLBACK */}

              {!micActive && (
                <motion.button
                  onClick={manualBlow}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 2,
                  }}
                  className="mt-8 rounded-full border border-white/10 px-6 py-2 text-xs text-white/30 transition hover:border-white/25 hover:text-white/60"
                >
                  Tap to blow
                </motion.button>
              )}

            </motion.div>
          )}

          {/* =================================================
              CELEBRATION
          ================================================= */}

          {phase === "celebration" && (
            <motion.div
              key="celebration"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 1.5,
              }}
              className="relative flex min-h-[500px] flex-col items-center justify-center text-center"
            >

              {/* FIREWORKS */}

              <div className="pointer-events-none fixed inset-0 overflow-hidden">

                {fireworks.map((_, index) => {
                  const angle =
                    (index / fireworks.length) * Math.PI * 2;

                  const distance =
                    120 + (index % 5) * 35;

                  const x =
                    Math.cos(angle) * distance;

                  const y =
                    Math.sin(angle) * distance;

                  return (
                    <motion.div
                      key={index}
                      className="absolute left-1/2 top-[35%] h-1.5 w-1.5 rounded-full bg-white"
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        x,
                        y,
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.4, 0.8, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: (index % 8) * 0.12,
                        ease: "easeOut",
                        repeat: 1,
                      }}
                    />
                  );
                })}

                {/* Second firework */}

                {fireworks.slice(0, 35).map((_, index) => {
                  const angle =
                    (index / 35) * Math.PI * 2;

                  const distance =
                    80 + (index % 4) * 25;

                  const x =
                    Math.cos(angle) * distance;

                  const y =
                    Math.sin(angle) * distance;

                  return (
                    <motion.div
                      key={`second-${index}`}
                      className="absolute left-[72%] top-[55%] h-1 w-1 rounded-full bg-pink-200"
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                      }}
                      animate={{
                        x,
                        y,
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.8,
                        delay: 1 + (index % 7) * 0.1,
                        ease: "easeOut",
                      }}
                    />
                  );
                })}

              </div>

              <motion.div
                initial={{
                  scale: 0.5,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.5,
                  duration: 1.2,
                }}
                className="text-6xl"
              >
                ✨
              </motion.div>

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
                  delay: 1.3,
                  duration: 1,
                }}
                className="mt-8 text-[10px] uppercase tracking-[0.6em] text-white/35"
              >
                And just like that...
              </motion.p>

              <motion.h2
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
                  duration: 1.2,
                }}
                className="mt-5 font-serif text-4xl font-light sm:text-6xl"
              >
                Your wish is in the stars.
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
                  delay: 3,
                  duration: 1.2,
                }}
                className="mt-6 max-w-md font-serif text-base italic leading-relaxed text-white/35 sm:text-lg"
              >
                May this new chapter of your life
                be filled with the kind of happiness
                you deserve.
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
                  delay: 4.2,
                  duration: 0.8,
                }}
                className="mt-8"
              >
                <Heart
                  size={22}
                  fill="currentColor"
                  className="text-pink-200"
                />
              </motion.div>

              <motion.button
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 5.5,
                  duration: 1,
                }}
                onClick={onComplete}
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  mt-10
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.05]
                  px-8
                  py-3
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-white/60
                  backdrop-blur-md
                  transition
                  duration-500
                  hover:bg-white/[0.1]
                  hover:text-white
                "
              >
                Continue the journey
              </motion.button>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}