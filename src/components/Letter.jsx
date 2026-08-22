
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function Letter({ onContinue }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080808] px-5 py-16 text-gray-900 sm:px-8">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-pink-500/10 blur-[120px]" />

        <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      {/* Floating hearts */}
      {[...Array(10)].map((_, index) => (
        <motion.div
          key={index}
          className="pointer-events-none absolute text-pink-300/40"
          style={{
            left: `${5 + index * 9}%`,
            bottom: "-30px",
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: -window.innerHeight - 100,
            x: [0, index % 2 === 0 ? 30 : -30, 0],
          }}
          transition={{
            duration: 6 + (index % 3),
            delay: index * 0.6,
            repeat: Infinity,
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Main wrapper */}
      <div className="relative z-10 mx-auto max-w-3xl">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-pink-300/20 bg-pink-300/10">
              <Heart
                size={24}
                className="text-pink-300"
                fill="currentColor"
              />
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.45em] text-gray-500">
            Something I wanted to tell you
          </p>
        </motion.div>

        {/* Letter */}
        <motion.article
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="relative overflow-hidden rounded-[2rem] bg-[#fffaf2] px-6 py-10 shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:px-12 sm:py-14 md:px-16"
        >

          {/* Paper glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,207,232,0.35),_transparent_35%)]" />

          {/* Decorative corner */}
          <Sparkles
            className="absolute right-6 top-6 text-pink-300/60"
            size={20}
          />

          {/* Letter content */}
          <div className="relative">

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="font-serif text-2xl text-gray-800"
            >
              Dear Seeju, ❤️
            </motion.p>

            <div className="mt-8 space-y-6 font-serif text-[17px] leading-[1.9] text-gray-700 sm:text-lg">

              <p>
                Today is your day.
              </p>

              <p>
                And honestly, I don't think a simple
                <span className="italic"> "Happy Birthday" </span>
                is enough to say everything I want to say to you.
              </p>

              <p>
                I hope when you read this, you smile. Not because I made
                a website for you, not because it's your birthday, but
                because you remember just how special you are.
              </p>

              <p>
                You've grown, changed, learned, laughed, cried, struggled,
                and become a stronger version of yourself through everything
                life has brought your way.
              </p>

              <p>
                And I hope you always remember that you deserve to be proud
                of the person you've become.
              </p>

              <p>
                I hope this new year of your life brings you the kind of
                happiness that stays.
              </p>

              <p>
                I hope you get closer to every dream you've ever whispered
                to yourself.
              </p>

              <p>
                I hope you have more reasons to laugh until your stomach hurts,
                more moments that make your heart feel full, more places you've
                always wanted to visit, and more memories that you'll look back
                on someday with the biggest smile.
              </p>

              {/* Highlight */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="my-10 rounded-2xl border border-pink-200 bg-pink-50 px-6 py-6 text-center"
              >
                <p className="font-serif text-xl italic text-gray-700 sm:text-2xl">
                  "You are so much more than your bad days,
                  your mistakes, your worries, or the things
                  you sometimes overthink."
                </p>
              </motion.div>

              <p>
                You are <strong>you.</strong>
              </p>

              <p>
                And that alone is something worth celebrating.
              </p>

              <p>
                Over the time I've known you, I've seen different sides of
                you—the happy you, the crazy you, the quiet you, the stubborn
                you, the caring you, and all those little versions of you
                that make you who you are.
              </p>

              <p>
                And honestly...
              </p>

              <p className="text-center text-xl italic text-gray-800 sm:text-2xl">
                I wouldn't trade those memories for anything. ❤️
              </p>

              <p>
                There are some people who enter our lives and quietly become
                a part of our favorite memories.
              </p>

              <p>
                You're one of those people for me.
              </p>

              <p>
                So today, I don't want to wish you just one happy day.
              </p>

              <p>
                I want to wish you an entire year filled with beautiful days.
              </p>

              <div className="my-8 grid grid-cols-2 gap-3 text-center text-sm text-gray-600 sm:grid-cols-4">
                <div className="rounded-xl bg-gray-100 px-3 py-4">
                  More confidence.
                </div>

                <div className="rounded-xl bg-gray-100 px-3 py-4">
                  More peace.
                </div>

                <div className="rounded-xl bg-gray-100 px-3 py-4">
                  More adventures.
                </div>

                <div className="rounded-xl bg-gray-100 px-3 py-4">
                  More dreams.
                </div>
              </div>

              <p>
                And most importantly, I hope you never forget how loved,
                appreciated, and important you are.
              </p>

              <p>
                You deserve flowers when you're happy.
                You deserve comfort when you're sad.
                You deserve someone cheering for you when you achieve
                something.
              </p>

              <p>
                And you deserve to be reminded, again and again, that your
                existence makes this world a little more beautiful.
              </p>

              <p>
                Thank you for being a part of my life.
              </p>

              <p>
                Thank you for the memories.
              </p>

              <p>
                Thank you for all the little moments that probably seemed
                ordinary at the time but became special to me later.
              </p>

              <p>
                And thank you for simply being <strong>Seeju</strong>.
              </p>

              <div className="my-10 h-px bg-gray-200" />

              <p>
                I don't know what every tomorrow will look like.
              </p>

              <p>
                None of us do.
              </p>

              <p>
                But I know that today, on your birthday, I genuinely wish
                the very best for you.
              </p>

              <p>
                So chase what makes you happy.
              </p>

              <p>
                Protect your peace.
              </p>

              <p>
                Believe in yourself.
              </p>

              <p>
                Keep that beautiful smile.
              </p>

              <p>
                And never stop becoming the person you've always wanted
                to be.
              </p>

            </div>

            {/* Birthday ending */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-14 text-center"
            >
              <div className="mb-5 text-4xl">
                🎂
              </div>

              <h2 className="font-serif text-4xl text-gray-800 sm:text-5xl">
                Happy Birthday, Seeju.
              </h2>

              <p className="mt-5 font-serif text-lg italic leading-relaxed text-gray-600">
                May this year be kinder to you.
                <br />
                May it surprise you in the most beautiful ways.
                <br />
                May your dreams find their way to you.
              </p>

              <p className="mt-7 font-serif text-xl text-gray-800">
                You deserve a beautiful life. ❤️
              </p>

              <p className="mt-8 font-serif text-lg italic text-gray-600">
                With all my heart,
              </p>

              <p className="mt-2 font-serif text-xl font-semibold text-gray-800">
                Happy Birthday, birthday girl. ❤️
              </p>
            </motion.div>

          </div>
        </motion.article>

        {/* Continue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col items-center text-center"
        >
          <p className="mb-5 text-sm text-gray-500">
            Now close your eyes for a second...
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black shadow-lg"
          >
            One More Thing
            <Heart size={17} fill="currentColor" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}

