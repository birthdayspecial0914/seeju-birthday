import { useEffect, useRef, useState } from "react";

import BirthdayCalendar from "./components/BirthdayCalendar";
import BirthdayOpening from "./components/BirthdayOpening";
import CandleScene from "./components/CandleScene";
import LifeJourney from "./components/LifeJourney";
import HiddenBox from "./components/HiddenBox";
import Elephant from "./components/Elephant";

function App() {
  /*
  ============================================================
  PROJECT FLOW

  CALENDAR
      ↓
  14 SEPTEMBER ❤️
      ↓
  BIRTHDAY OPENING
      ↓
  CANDLE + MICROPHONE 🎂
      ↓
  LIFE JOURNEY 📸
      ↓
  MUSIC STOPS HERE 🎵
      ↓
  HIDDEN BOX 🎁
      ↓
  ELEPHANT 🐘
  ============================================================
  */

  const [screen, setScreen] = useState("calendar");

  // ============================================================
  // GLOBAL AUDIO
  // ============================================================

  const audioRef = useRef(null);

  const currentSongRef = useRef(0);

  const fadeIntervalRef = useRef(null);

  /*
  ============================================================
  MUSIC PLAYLIST

  Put these files inside /public

  public/
  ├── humdard.mp3
  ├── song2.mp3
  ├── song3.mp3
  ├── song4.mp3
  └── song5.mp3

  Songs play one after another.
  They DO NOT repeat.
  ============================================================
  */

  const songs = [
    "/humdard.mp3",
    "/song2.mp3",
    "/song3.mp3",
    "/song4.mp3",
    "/song5.mp3",
  ];

  /*
  ============================================================
  PLAY SONG
  ============================================================
  */

  const playSong = async (index) => {
    const audio = audioRef.current;

    if (!audio) return;

    if (index >= songs.length) {
      return;
    }

    // Stop previous fade
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    currentSongRef.current = index;

    audio.src = songs[index];

    audio.currentTime = 0;

    // Start quietly
    audio.volume = 0;

    try {
      await audio.play();

      // ========================================================
      // FADE IN
      // ========================================================

      let volume = 0;

      fadeIntervalRef.current = setInterval(() => {
        volume += 0.02;

        if (volume >= 0.65) {
          volume = 0.65;

          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }

        audio.volume = volume;
      }, 80);

    } catch (error) {
      console.log("Music could not start:", error);
    }
  };

  /*
  ============================================================
  NEXT SONG

  Song 1 → Song 2 → Song 3 → etc.

  No song repeats.
  ============================================================
  */

  const handleSongEnded = () => {
    const nextSong = currentSongRef.current + 1;

    if (nextSong < songs.length) {
      playSong(nextSong);
    } else {
      console.log("Playlist finished.");
    }
  };

  /*
  ============================================================
  START BIRTHDAY MUSIC
  ============================================================
  */

  const startBirthdayMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    // Don't restart existing music
    if (!audio.paused) return;

    await playSong(currentSongRef.current);
  };

  /*
  ============================================================
  STOP BIRTHDAY MUSIC
  ============================================================

  THIS IS CALLED WHEN LIFE JOURNEY FINISHES.

  Music stops completely before HiddenBox begins.
  ============================================================
  */

  const stopBirthdayMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    // Stop fade
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    audio.pause();

    audio.currentTime = 0;

    audio.volume = 0.65;
  };

  /*
  ============================================================
  14 SEPTEMBER CLICK
  ============================================================
  */

  const handleBirthdayClick = async () => {
    await startBirthdayMusic();

    setScreen("opening");
  };

  /*
  ============================================================
  CLEANUP
  ============================================================
  */

  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  /*
  ============================================================
  RENDER
  ============================================================
  */

  return (
    <div className="min-h-screen w-full bg-black">

      {/* =====================================================
          GLOBAL MUSIC

          This stays mounted during the whole project.
      ===================================================== */}

      <audio
        ref={audioRef}
        preload="auto"
        onEnded={handleSongEnded}
      />

      {/* =====================================================
          PART 0 — CALENDAR
      ===================================================== */}

      {screen === "calendar" && (
        <BirthdayCalendar
          onBirthdayClick={handleBirthdayClick}
        />
      )}

      {/* =====================================================
          PART 1 — BIRTHDAY OPENING
      ===================================================== */}

      {screen === "opening" && (
        <BirthdayOpening
          onComplete={() => setScreen("candle")}
        />
      )}

      {/* =====================================================
          PART 2 — CANDLE + MICROPHONE
      ===================================================== */}

      {screen === "candle" && (
        <CandleScene
          onComplete={() => setScreen("life")}
        />
      )}

      {/* =====================================================
          PART 3 — LIFE JOURNEY

          IMPORTANT:

          When LifeJourney finishes:

          1. Music stops
          2. HiddenBox starts

          The music does NOT continue into HiddenBox.
      ===================================================== */}

      {screen === "life" && (
        <LifeJourney
          onComplete={() => {
            stopBirthdayMusic();

            setScreen("hiddenbox");
          }}
        />
      )}

      {/* =====================================================
          PART 4 — HIDDEN BOX

          NO MUSIC
      ===================================================== */}

      {screen === "hiddenbox" && (
        <HiddenBox
          onComplete={() => setScreen("elephant")}
        />
      )}

      {/* =====================================================
          PART 5 — ELEPHANT

          NO MUSIC
      ===================================================== */}

      {screen === "elephant" && (
        <Elephant
          onComplete={() => {
            console.log("Birthday journey completed ❤️");
          }}
        />
      )}

    </div>
  );
}

export default App;