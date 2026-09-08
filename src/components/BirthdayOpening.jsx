import { motion } from "framer-motion";
import seeju from "../assets/seeju1.jpg"
import seeju1 from "../assets/seeju028.png"
export default function BirthdayOpening({ onComplete }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

{/* ============================================
    CINEMATIC BACKGROUND
============================================ */}

<div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#050505]">

  {/* ==================================================
      MAIN IMAGE — FULLY VISIBLE
      ================================================== */}

  <img
    src={seeju}
    alt=""
    className="
      absolute
      inset-0
      h-full
      w-full
      object-contain
      object-center
      opacity-60
      blur-[3px]
      scale-105
      sm:opacity-65
      md:opacity-70
    "
  />

  {/* ==================================================
      BLURRED FILL FOR DESKTOP SIDES
      ================================================== */}

  <div
    className="
      absolute
      inset-0
      bg-cover
      bg-center
      bg-no-repeat
      scale-110
      blur-[30px]
      opacity-25
    "
    style={{
      backgroundImage: `url(${seeju})`,
    }}
  />

  {/* ==================================================
      LIGHT DARK OVERLAY
      ================================================== */}

  <div className="absolute inset-0 bg-black/20" />

  {/* ==================================================
      SOFT CENTER GRADIENT
      ================================================== */}

  <div
    className="
      absolute
      inset-0
      bg-[radial-gradient(
        circle_at_center,
        rgba(0,0,0,0),
        rgba(0,0,0,0.28)
      )]
    "
  />

  {/* ==================================================
      VERY SOFT TOP/BOTTOM SHADOW
      ================================================== */}

  <div
    className="
      absolute
      inset-0
      bg-[linear-gradient(
        to_bottom,
        rgba(0,0,0,0.18),
        transparent_22%,
        transparent_78%,
        rgba(0,0,0,0.30)
      )]
    "
  />

  {/* ==================================================
      SOFT PINK ATMOSPHERE
      ================================================== */}

  <div
    className="
      absolute
      left-[5%]
      top-[20%]
      h-[250px]
      w-[250px]
      rounded-full
      bg-pink-500/[0.05]
      blur-[120px]
    "
  />

  {/* ==================================================
      SOFT AMBER ATMOSPHERE
      ================================================== */}

  <div
    className="
      absolute
      left-1/2
      top-1/2
      h-[600px]
      w-[600px]
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-amber-200/[0.03]
      blur-[150px]
    "
  />

  {/* ==================================================
      PURPLE ATMOSPHERE
      ================================================== */}

  <div
    className="
      absolute
      bottom-[5%]
      right-[5%]
      h-[300px]
      w-[300px]
      rounded-full
      bg-purple-500/[0.04]
      blur-[130px]
    "
  />

</div>
      {/* ============================================
          STARS
      ============================================ */}

      <div className="pointer-events-none absolute inset-0">

        <motion.span
          className="absolute left-[8%] top-[18%] text-xs text-white/30"
          animate={{
            opacity: [0.15, 0.7, 0.15],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.span>


        <motion.span
          className="absolute right-[12%] top-[20%] text-sm text-white/25"
          animate={{
            opacity: [0.1, 0.7, 0.1],
            scale: [0.8, 1.15, 0.8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
        >
          ✧
        </motion.span>


        <motion.span
          className="absolute bottom-[20%] left-[15%] text-xs text-white/25"
          animate={{
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1,
          }}
        >
          ✦
        </motion.span>


        <motion.span
          className="absolute bottom-[15%] right-[18%] text-sm text-white/30"
          animate={{
            opacity: [0.1, 0.7, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 2,
          }}
        >
          ✧
        </motion.span>

      </div>


      {/* ============================================
          MAIN
      ============================================ */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-7xl
          flex-col
          items-center
          justify-center
          px-6
          py-6
        "
      >


        {/* ============================================
            INTRO
        ============================================ */}

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
            delay: 1,
            duration: 1.5,
          }}
          className="
            mb-4
            text-center
            text-[10px]
            uppercase
            tracking-[0.6em]
            text-white/35
            sm:text-xs
          "
        >
          Somewhere in time...
        </motion.p>


        {/* ============================================
            TWO COLUMN HERO
        ============================================ */}

        <div
          className="
            grid
            w-full
            max-w-6xl
            grid-cols-1
            items-center
            gap-14
            md:grid-cols-2
            md:gap-20
            lg:gap-28
          "
        >


          {/* ==========================================
              LEFT — BIRTH DATE
          =========================================== */}

          <div className="flex flex-col items-center text-center md:items-start md:text-left">

            <motion.div
              initial={{
                opacity: 0,
                x: 500,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 2,
                duration: 2.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >

              <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-white/25 sm:text-xs">
                Born on
              </p>


              {/* DAY */}

              <div
                className="
                  font-serif
                  text-[100px]
                  font-light
                  leading-[0.8]
                  tracking-[-0.05em]
                  sm:text-[130px]
                  lg:text-[160px]
                "
              >
                14
              </div>


              {/* MONTH */}

              <div
                className="
                  mt-6
                  text-sm
                  uppercase
                  tracking-[0.8em]
                  text-white/55
                  sm:text-base
                "
              >
                September
              </div>


              {/* YEAR */}

              <div
                className="
                  mt-4
                  font-serif
                  text-4xl
                  font-light
                  tracking-[0.3em]
                  text-white/60
                  sm:text-5xl
                "
              >
                2004
              </div>

            </motion.div>


            {/* ========================================
                DESCRIPTION
            ========================================= */}

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
                delay: 4.8,
                duration: 1.5,
              }}
              className="
                mt-6
                max-w-md
                font-serif
                text-base
                italic
                leading-relaxed
                text-white/35
                sm:text-lg
              "
            >
              The day a beautiful soul
              <br />
              came into this world...
            </motion.p>

          </div>


          {/* ==========================================
              RIGHT — PHOTO
          =========================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              delay: 5.8,
              duration: 2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex justify-center md:justify-end"
          >

            <div className="relative">

              {/* PHOTO GLOW */}

              <motion.div
                className="
                  absolute
                  -inset-10
                  rounded-full
                  bg-pink-300/[0.08]
                  blur-3xl
                "
                animate={{
                  opacity: [0.4, 0.75, 0.4],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />


              {/* PHOTO */}

              <div
                className="
                  relative
                  h-60
                  w-60
                  overflow-hidden
                  rounded-full
                  border
                  border-white/20
                  shadow-2xl
                  sm:h-72
                  sm:w-72
                  lg:h-80
                  lg:w-80
                "
              >

                <img
                  src={seeju1}
                  alt="Seeju"
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

              </div>

            </div>

          </motion.div>

        </div>


        {/* ============================================
            HAPPY BIRTHDAY
        ============================================ */}

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
            delay: 8.5,
            duration: 1.8,
          }}
          className="mt-8 text-center"
        >

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.5em]
              text-white/30
              sm:text-xs
            "
          >
            Today is your day
          </p>


          <h1
            className="
              mt-4
              font-serif
              text-4xl
              font-light
              sm:text-5xl
              md:text-6xl
            "
          >
            Happy Birthday,
            <br />

            <span className="text-pink-200">
              Seeju ❤️
            </span>

          </h1>

        </motion.div>


        {/* ============================================
            CONTINUE
        ============================================ */}

        <motion.button
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 10,
            duration: 1.5,
          }}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={onComplete}
          className="
            mt-10
            mb:40
            rounded-full
            border
            border-white/15
            bg-white/[0.04]
            px-8
            py-3
            text-xs
            uppercase
            tracking-[0.25em]
            text-white/50
            backdrop-blur-md
            transition
            duration-500
            hover:bg-white/[0.08]
            hover:text-white
          "
        >
          Continue
        </motion.button>

      </div>

    </section>
  );
}