import { useEffect, useRef, useState } from "react";

import Countdown from "./components/Countdown";
import BirthdayCalendar from "./components/BirthdayCalendar";
import BirthdayOpening from "./components/BirthdayOpening";
import CandleScene from "./components/CandleScene";
import LifeJourney from "./components/LifeJourney";
import HiddenBox from "./components/HiddenBox";
import Elephant from "./components/Elephant";
import FinalSurprise from "./components/FinalSurprise";

function App() {
  /*
  ============================================================
  ❤️ SEEJU BIRTHDAY JOURNEY
  ============================================================

  COUNTDOWN
      ↓
  13 SEPTEMBER 11:59 PM
      ↓
  14 SEPTEMBER 12:00 AM
      ↓
  🎆 FIREWORKS
      ↓
  ❤️ HAPPY BIRTHDAY SEEEJUUUUUU
      ↓
  📅 BIRTHDAY CALENDAR
      ↓
  14 SEPTEMBER ❤️
      ↓
  🎬 BIRTHDAY OPENING
      ↓
  🎂 CANDLE + MICROPHONE
      ↓
  📸 LIFE JOURNEY
      ↓
  🎵 MUSIC STOPS
      ↓
  🎁 HIDDEN BOX
      ↓
  🐘 ELEPHANT
      ↓
  🎬 FINAL SURPRISE
      ↓
  ❤️ HEART-TOUCHING MESSAGE
      ↓
  THE END
      ↓
  DIRECTED BY YUMI

  ============================================================
  */

  // ==========================================================
  // SCREEN CONTROL
  // ==========================================================

  const [screen, setScreen] = useState("countdown");

  // ==========================================================
  // GLOBAL AUDIO
  // ==========================================================

  const audioRef = useRef(null);

  const currentSongRef = useRef(0);

  const fadeIntervalRef = useRef(null);

  // ==========================================================
  // MUSIC PLAYLIST
  //
  // Put these files inside:
  //
  // public/
  //
  // ikkudi.mp3
  // song2.mp3
  // song3.mp3
  // song4.mp3
  // song5.mp3
  // ==========================================================

  const songs = [
    `${import.meta.env.BASE_URL}humdard.mp3`,
    `${import.meta.env.BASE_URL}song2.mp3`,
    `${import.meta.env.BASE_URL}song3.mp3`,
    `${import.meta.env.BASE_URL}song4.mp3`,
    `${import.meta.env.BASE_URL}song5.mp3`,
  ];

  // ==========================================================
  // PLAY SONG
  // ==========================================================

  const playSong = async (index) => {
    const audio = audioRef.current;

    if (!audio) return;

    if (index >= songs.length) {
      return;
    }

    // --------------------------------------------------------
    // Clear previous fade
    // --------------------------------------------------------

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);

      fadeIntervalRef.current = null;
    }

    // --------------------------------------------------------
    // Set current song
    // --------------------------------------------------------

    currentSongRef.current = index;

    audio.src = songs[index];

    audio.currentTime = 0;

    // Start quietly
    audio.volume = 0;

    // --------------------------------------------------------
    // Start playback
    // --------------------------------------------------------

    try {
      await audio.play();

      // ------------------------------------------------------
      // Fade music in
      // ------------------------------------------------------

      let volume = 0;

      fadeIntervalRef.current = setInterval(() => {
        volume += 0.02;

        if (volume >= 0.65) {
          volume = 0.65;

          clearInterval(
            fadeIntervalRef.current
          );

          fadeIntervalRef.current = null;
        }

        audio.volume = volume;
      }, 80);

    } catch (error) {
      console.log(
        "Music could not start:",
        error
      );
    }
  };

  // ==========================================================
  // NEXT SONG
  // ==========================================================

  const handleSongEnded = () => {
    const nextSong =
      currentSongRef.current + 1;

    if (nextSong < songs.length) {
      playSong(nextSong);
    } else {
      console.log(
        "🎵 Playlist finished."
      );
    }
  };

  // ==========================================================
  // START BIRTHDAY MUSIC
  // ==========================================================

  const startBirthdayMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    // Don't restart if music is already playing
    if (!audio.paused) {
      return;
    }

    await playSong(
      currentSongRef.current
    );
  };

  // ==========================================================
  // STOP BIRTHDAY MUSIC
  //
  // Music stops after LifeJourney.
  //
  // NO MUSIC DURING:
  //
  // 🎁 HiddenBox
  // 🐘 Elephant
  // 🎬 FinalSurprise
  // ==========================================================

  const stopBirthdayMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    // --------------------------------------------------------
    // Stop fade
    // --------------------------------------------------------

    if (fadeIntervalRef.current) {
      clearInterval(
        fadeIntervalRef.current
      );

      fadeIntervalRef.current = null;
    }

    // --------------------------------------------------------
    // Stop audio
    // --------------------------------------------------------

    audio.pause();

    audio.currentTime = 0;

    audio.volume = 0.65;
  };

  // ==========================================================
  // CALENDAR → BIRTHDAY OPENING
  // ==========================================================

  const handleBirthdayClick = async () => {
    // Start music when Seeju clicks her birthday
    await startBirthdayMusic();

    // Move to Birthday Opening
    setScreen("opening");
  };

  // ==========================================================
  // COUNTDOWN → CALENDAR
  //
  // Countdown handles:
  //
  // 11:59:01
  // 11:59:02
  // ...
  // 11:59:59
  // 12:00:00
  //
  // Then:
  //
  // 🎆 FIREWORKS
  // ❤️ HAPPY BIRTHDAY SEEEJUUUUUU
  //
  // Countdown calls onComplete()
  //
  // App automatically opens Calendar.
  // ==========================================================

  const handleCountdownComplete = () => {
    console.log(
      "🎆 Midnight reached!"
    );

    console.log(
      "📅 Opening Birthday Calendar..."
    );

    // Automatically open calendar
    setScreen("calendar");
  };

  // ==========================================================
  // CLEANUP
  // ==========================================================

  useEffect(() => {
    return () => {
      // ------------------------------------------------------
      // Clear fade interval
      // ------------------------------------------------------

      if (fadeIntervalRef.current) {
        clearInterval(
          fadeIntervalRef.current
        );
      }

      // ------------------------------------------------------
      // Stop audio
      // ------------------------------------------------------

      if (audioRef.current) {
        audioRef.current.pause();

        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen w-full bg-black">

      {/* ====================================================
          GLOBAL AUDIO
      ==================================================== */}

      <audio
        ref={audioRef}
        preload="auto"
        onEnded={handleSongEnded}
      />

      {/* ====================================================
          PART 0
          
          MIDNIGHT COUNTDOWN
      ==================================================== */}

      {screen === "countdown" && (
        <Countdown
          onComplete={
            handleCountdownComplete
          }
        />
      )}

      {/* ====================================================
          PART 1
          
          BIRTHDAY CALENDAR
      ==================================================== */}

      {screen === "calendar" && (
        <BirthdayCalendar
          onBirthdayClick={
            handleBirthdayClick
          }
        />
      )}

      {/* ====================================================
          PART 2
          
          BIRTHDAY OPENING
      ==================================================== */}

      {screen === "opening" && (
        <BirthdayOpening
          onComplete={() => {
            setScreen("candle");
          }}
        />
      )}

      {/* ====================================================
          PART 3
          
          CANDLE + MICROPHONE
      ==================================================== */}

      {screen === "candle" && (
        <CandleScene
          onComplete={() => {
            setScreen("life");
          }}
        />
      )}

      {/* ====================================================
          PART 4
          
          LIFE JOURNEY
          
          🎵 MUSIC PLAYS
      ==================================================== */}

      {screen === "life" && (
        <LifeJourney
          onComplete={() => {

            // Stop birthday music completely
            stopBirthdayMusic();

            // Continue to Hidden Box
            setScreen("hiddenbox");
          }}
        />
      )}

      {/* ====================================================
          PART 5
          
          HIDDEN BOX
          
          🔇 NO MUSIC
      ==================================================== */}

      {screen === "hiddenbox" && (
        <HiddenBox
          onComplete={() => {
            setScreen("elephant");
          }}
        />
      )}

      {/* ====================================================
          PART 6
          
          ELEPHANT
          
          🔇 NO MUSIC
      ==================================================== */}

      {screen === "elephant" && (
        <Elephant
          onComplete={() => {

            // Elephant finished
            // Go directly to Final Surprise

            setScreen("final");
          }}
        />
      )}

      {/* ====================================================
          PART 7
          
          FINAL SURPRISE
          
          🔇 NO MUSIC
      ==================================================== */}

      {screen === "final" && (
        <FinalSurprise
          onComplete={() => {

            console.log(
              "❤️ Birthday journey completed ❤️"
            );

          }}
        />
      )}

    </div>
  );
}

export default App;