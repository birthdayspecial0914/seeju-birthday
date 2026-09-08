import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import seejukisvari from "../assets/seejukisavari2.mp4";
import yumiPhoto from "../assets/yumi.jpeg";

function FinalSurprise({ onComplete }) {
  const [stage, setStage] = useState("question");
  const [showMessage, setShowMessage] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  const videoRef = useRef(null);

  // ============================================================
  // QUESTION → DATE
  // ============================================================

  const handleYes = () => {
    setStage("date");
  };

  // ============================================================
  // DATE → VIDEO
  // ============================================================

  const startVideo = () => {
    setShowMessage(false);
    setStage("video");
  };

  // ============================================================
  // VIDEO PLAYBACK
  // ============================================================

  useEffect(() => {
    if (stage !== "video") return;

    const video = videoRef.current;

    if (!video) return;

    const playVideo = async () => {
      try {
        video.pause();
        video.currentTime = 0;

        // Make sure the browser has loaded the video.
        video.load();

        await video.play();

        console.log("✅ Final video is playing");
      } catch (error) {
        console.error("❌ Video playback failed:", error);
      }
    };

    const timer = setTimeout(() => {
      playVideo();
    }, 500);

    return () => {
      clearTimeout(timer);

      if (video) {
        video.pause();
      }
    };
  }, [stage]);

  // ============================================================
  // VIDEO EVENTS
  // ============================================================

  const handleVideoLoaded = () => {
    console.log("✅ Video loaded");
  };

  const handleVideoCanPlay = () => {
    console.log("✅ Video can play");
  };

  const handleVideoPlay = () => {
    console.log("▶️ Video playing");
  };

  const handleVideoPause = () => {
    console.log("⏸️ Video paused");
  };

  const handleVideoError = (event) => {
    console.error("❌ VIDEO ERROR:", event.currentTarget.error);
  };

  // ============================================================
  // VIDEO FINISHED
  // ============================================================

  const handleVideoEnd = () => {
    console.log("🎬 Video finished");

    setStage("message");

    setTimeout(() => {
      setShowMessage(true);
    }, 500);
  };

  // ============================================================
  // MESSAGE → CREDITS
  // ============================================================

  useEffect(() => {
    if (stage !== "message") return;

    const timer = setTimeout(() => {
      setShowMessage(false);

      setTimeout(() => {
        setStage("credits");
        setShowCredits(true);
      }, 1200);
    }, 10500);

    return () => clearTimeout(timer);
  }, [stage]);

  // ============================================================
  // CREDITS → COMPLETE
  // ============================================================

  useEffect(() => {
    if (stage !== "credits") return;

    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 12000);

    return () => clearTimeout(timer);
  }, [stage, onComplete]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">

      <AnimatePresence mode="wait">

        {/* ======================================================
            STAGE 1 — QUESTION
        ====================================================== */}

        {stage === "question" && (
          <motion.div
            key="question"
            className="relative flex min-h-screen items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >

            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,170,0.12),transparent_60%)]" />

            {/* Stars */}
            <div className="absolute inset-0 opacity-60">
              {Array.from({ length: 70 }).map((_, index) => (
                <motion.span
                  key={index}
                  className="absolute h-[2px] w-[2px] rounded-full bg-white"
                  style={{
                    left: `${(index * 37) % 100}%`,
                    top: `${(index * 61) % 100}%`,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.7, 1.4, 0.7],
                  }}
                  transition={{
                    duration: 2 + (index % 4),
                    repeat: Infinity,
                    delay: (index % 5) * 0.4,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center px-6 text-center">

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
                  duration: 1.2,
                }}
                className="mb-6 text-sm uppercase tracking-[0.5em] text-white/50"
              >
                One last little surprise...
              </motion.p>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 30,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5,
                }}
                className="text-4xl font-light tracking-wide sm:text-6xl"
              >
                Seeju...
              </motion.h1>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.2,
                  delay: 1.3,
                }}
                className="mt-6 text-2xl font-light sm:text-4xl"
              >
                Wanna ride with me?
                <span className="ml-2">❤️</span>
              </motion.h2>

              <motion.button
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
                  delay: 2.4,
                }}
                whileHover={{
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={handleYes}
                className="mt-12 rounded-full border border-white/30 bg-white/10 px-10 py-4 text-lg backdrop-blur-md transition hover:bg-white/20"
              >
                Yes ❤️
              </motion.button>

            </div>
          </motion.div>
        )}

        {/* ======================================================
            STAGE 2 — 14 SEPTEMBER
        ====================================================== */}

        {stage === "date" && (
          <motion.div
            key="date"
            className="relative flex min-h-screen items-center justify-center overflow-hidden"
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
          >

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,100,150,0.15),transparent_65%)]" />

            <div className="relative z-10 px-6 text-center">

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
                  duration: 1,
                }}
                className="text-sm uppercase tracking-[0.6em] text-white/40"
              >
                Then remember...
              </motion.p>

              <motion.h1
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.5,
                }}
                className="mt-8 text-6xl font-light tracking-widest sm:text-8xl"
              >
                14
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 1.2,
                  delay: 1.5,
                }}
                className="mt-2 text-3xl font-light tracking-[0.3em] sm:text-5xl"
              >
                SEPTEMBER
              </motion.p>

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
                  duration: 1,
                  delay: 2.5,
                }}
                whileHover={{
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={startVideo}
                className="mt-12 rounded-full border border-white/30 bg-white/10 px-10 py-4 text-lg backdrop-blur-md transition hover:bg-white/20"
              >
                Let's go ❤️
              </motion.button>

            </div>
          </motion.div>
        )}

        {/* ======================================================
            STAGE 3 — FINAL VIDEO
        ====================================================== */}

        {stage === "video" && (
          <motion.div
            key="video"
            className="relative flex min-h-screen w-full items-center justify-center bg-black"
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
              duration: 1.2,
            }}
          >

        <video
  ref={videoRef}
  src={seejukisvari}
  className="h-screen w-full object-contain"
  playsInline
  preload="auto"
  autoPlay
  onLoadedData={handleVideoLoaded}
  onCanPlay={handleVideoCanPlay}
  onPlay={handleVideoPlay}
  onPause={handleVideoPause}
  onError={handleVideoError}
  onEnded={handleVideoEnd}
/>

          </motion.div>
        )}

        {/* ======================================================
            STAGE 4 — HEART TOUCHING MESSAGE
        ====================================================== */}

        {stage === "message" && (
          <motion.div
            key="message"
            className="relative flex min-h-screen items-center justify-center overflow-hidden"
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
          >

            {/* Soft background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,110,160,0.13),transparent_65%)]" />

            {/* Floating hearts */}
            <div className="absolute inset-0">

              {["❤️", "♡", "♥", "❤️", "♡", "♥"].map(
                (heart, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-xl opacity-20 sm:text-3xl"
                    style={{
                      left: `${10 + index * 15}%`,
                      bottom: "-10%",
                    }}
                    animate={{
                      y: "-120vh",
                      opacity: [0, 0.3, 0],
                      rotate: [0, 20, -20, 0],
                    }}
                    transition={{
                      duration: 8 + index,
                      repeat: Infinity,
                      delay: index * 1.2,
                    }}
                  >
                    {heart}
                  </motion.div>
                )
              )}

            </div>

            {showMessage && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 2,
                }}
                className="relative z-10 mx-auto max-w-3xl px-7 text-center"
              >

                <motion.div
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    duration: 1,
                    type: "spring",
                  }}
                  className="mb-8 text-4xl"
                >
                  ❤️
                </motion.div>

                <p className="text-lg font-light leading-8 text-white/80 sm:text-xl sm:leading-9">
                  And just like that, another beautiful chapter of
                  your life begins...
                </p>

                <p className="mt-7 text-lg font-light leading-8 text-white/80 sm:text-xl sm:leading-9">
                  If I could give you one thing today, it would be
                  the ability to see yourself through my eyes —
                  so you could understand just how incredibly
                  special you are to me.
                </p>

                <p className="mt-7 text-lg font-light leading-8 text-white/80 sm:text-xl sm:leading-9">
                  Thank you for being a part of my life, for
                  becoming a memory in every beautiful moment,
                  and for being someone I could never replace.
                </p>

                <p className="mt-7 text-lg font-light leading-8 text-white/80 sm:text-xl sm:leading-9">
                  No matter how many birthdays come and go,
                  I hope this little journey always reminds you
                  of one thing...
                </p>

                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 2,
                  }}
                  className="mt-8 text-xl font-medium leading-9 sm:text-2xl"
                >
                  You are loved.
                  <br />
                  You are precious.
                  <br />
                  And you will always have a special place
                  in my heart. ❤️
                </motion.p>

                <motion.h1
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 3.5,
                  }}
                  className="mt-10 text-3xl font-light tracking-wide sm:text-5xl"
                >
                  Happy Birthday, Seeju.
                  <span className="ml-2">🎂❤️</span>
                </motion.h1>

              </motion.div>
            )}

          </motion.div>
        )}

        {/* ======================================================
            STAGE 5 — THE END / YUMI
        ====================================================== */}

        {stage === "credits" && (
          <motion.div
            key="credits"
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 2,
            }}
          >

            {/* YUMI PHOTO */}

            <motion.img
              src={yumiPhoto}
              alt="Yumi"
              className="absolute inset-0 h-full w-full object-contain"
              initial={{
                opacity: 0,
                scale: 1.08,
              }}
              animate={{
                opacity: 0.65,
                scale: 1,
              }}
              transition={{
                duration: 5,
                ease: "easeOut",
              }}
            />

            {/* Dark cinematic overlay */}

            <motion.div
              className="absolute inset-0 bg-black"
              initial={{
                opacity: 1,
              }}
              animate={{
                opacity: 0.42,
              }}
              transition={{
                duration: 4,
              }}
            />

            {/* Soft vignette */}

            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.75) 100%)",
              }}
            />

            {/* Credits */}

            <div className="relative z-10 flex flex-col items-center px-6 text-center">

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
                  duration: 2,
                  delay: 1,
                }}
                className="text-sm uppercase tracking-[0.7em] text-white/60"
              >
                The End
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1.5,
                  delay: 2.2,
                }}
                className="my-8 text-3xl"
              >
                ❤️
              </motion.div>

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
                  duration: 1.5,
                  delay: 3,
                }}
                className="text-sm uppercase tracking-[0.5em] text-white/50"
              >
                Directed by
              </motion.p>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: 3.7,
                }}
                className="mt-4 text-4xl font-light tracking-[0.3em] sm:text-6xl"
              >
                YUMI
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 1.5,
                  delay: 5,
                }}
                className="mt-8 max-w-md text-sm leading-7 text-white/50"
              >
                A little journey made with love,
                <br />
                for someone irreplaceable. ❤️
              </motion.p>

            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

export default FinalSurprise;