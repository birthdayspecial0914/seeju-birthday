import { useEffect, useRef, useState } from "react";
import hathivideo from "../assets/seejukahathi1.mp4";

export default function Elephant({ onComplete }) {
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);

  const [stage, setStage] = useState("welcome");
  const [listening, setListening] = useState(false);
  const [heardText, setHeardText] = useState("");
  const [error, setError] = useState("");

  // ============================================================
  // CLEAN UP MICROPHONE / SPEECH RECOGNITION
  // ============================================================

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.log("Recognition cleanup:", error);
        }
      }
    };
  }, []);

  // ============================================================
  // START MICROPHONE
  // ============================================================

  const startListening = () => {
    setError("");
    setHeardText("");

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        "Sorry, your browser doesn't support microphone recognition. Please use Google Chrome."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 5;

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setListening(true);
      setStage("listening");
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        transcript += event.results[i][0].transcript;
      }

      transcript = transcript.trim();

      setHeardText(transcript);

      const normalized = transcript
        .toLowerCase()
        .replace(/[.,!?]/g, "")
        .trim();

      // ========================================================
      // ACCEPT DIFFERENT WAYS SHE MIGHT SAY IT
      // ========================================================

      const birthdayPhrases = [
        "happy birthday",
        "happy birthday seeju",
        "happy birthday to me",
        "happy birthday to you",
        "happy birthday baby",
        "happy birthday dear",
      ];

      const saidHappyBirthday =
        birthdayPhrases.some((phrase) =>
          normalized.includes(phrase)
        ) ||
        (normalized.includes("happy") &&
          normalized.includes("birthday"));

      // ========================================================
      // SUCCESS
      // ========================================================

      if (saidHappyBirthday) {
        recognition.stop();

        setListening(false);
        setStage("success");

        // Small emotional pause before elephant video
        setTimeout(() => {
          setStage("video");
        }, 1800);
      }
    };

    recognition.onerror = (event) => {
      console.log(
        "Speech recognition error:",
        event.error
      );

      setListening(false);

      if (event.error === "not-allowed") {
        setError(
          "Microphone permission is required. Please allow microphone access and try again."
        );
      } else if (event.error === "no-speech") {
        setError(
          'I didn\'t hear you. Try saying "Happy Birthday" ❤️'
        );
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    };

    recognition.onend = () => {
      setListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.log("Could not start recognition:", error);
    }
  };

  // ============================================================
  // PLAY ELEPHANT VIDEO
  // ============================================================

  useEffect(() => {
    if (stage !== "video") return;

    const video = videoRef.current;

    if (!video) return;

    video.currentTime = 0;

    video.play().catch(() => {
      setError("Tap the video to start it ❤️");
    });
  }, [stage]);

  // ============================================================
  // ELEPHANT VIDEO FINISHED
  //
  // IMPORTANT:
  // We DON'T show the calendar anymore.
  //
  // App.jsx will receive onComplete()
  // and move to FinalSurprise.
  // ============================================================

  const handleVideoEnd = () => {
    if (onComplete) {
      onComplete();
    }
  };

  // ============================================================
  // WELCOME SCREEN
  // ============================================================

  if (stage === "welcome") {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-6 text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)]" />

        <div className="relative z-10 w-full max-w-2xl text-center">

          <div className="mb-8 text-5xl">
            🐘
          </div>

          <p className="mb-5 text-xs uppercase tracking-[0.5em] text-white/35 sm:text-sm">
            A little surprise for you
          </p>

          <h1 className="font-serif text-3xl font-light leading-relaxed sm:text-5xl">
            Your little friend is waiting
            <br />
            to wish you, Seeju...
          </h1>

          <p className="mt-6 font-serif text-base italic text-white/45 sm:text-lg">
            Wanna see it? ❤️
          </p>

          <button
            onClick={startListening}
            className="mt-10 rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-sm tracking-wide text-white transition-all duration-500 hover:border-white/40 hover:bg-white/[0.12]"
          >
            Yes, I wanna see it ✨
          </button>

          <p className="mt-5 text-xs text-white/25">
            You'll need to use your microphone
          </p>

        </div>
      </section>
    );
  }

  // ============================================================
  // LISTENING SCREEN
  // ============================================================

  if (stage === "listening") {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-6 text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_60%)]" />

        <div className="relative z-10 w-full max-w-2xl text-center">

          <div className="relative mx-auto mb-10 flex h-28 w-28 items-center justify-center">

            <div className="absolute inset-0 animate-ping rounded-full border border-white/10" />

            <div className="absolute inset-3 rounded-full border border-white/15" />

            <div className="text-4xl">
              🎙️
            </div>

          </div>

          <p className="text-xs uppercase tracking-[0.5em] text-white/35">
            I'm listening...
          </p>

          <h1 className="mt-6 font-serif text-3xl font-light sm:text-5xl">
            Say...
          </h1>

          <p className="mt-5 font-serif text-xl italic text-white/70 sm:text-2xl">
            "Happy Birthday"
          </p>

          {heardText && (
            <p className="mt-8 text-sm text-white/40">
              I heard: "{heardText}"
            </p>
          )}

          <button
            onClick={startListening}
            className="mt-10 rounded-full border border-white/10 px-6 py-3 text-xs text-white/40 transition hover:border-white/30 hover:text-white/70"
          >
            Try again
          </button>

          {error && (
            <p className="mx-auto mt-6 max-w-md text-sm text-white/50">
              {error}
            </p>
          )}

        </div>
      </section>
    );
  }

  // ============================================================
  // SUCCESS SCREEN
  // ============================================================

  if (stage === "success") {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-6 text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

        <div className="relative z-10 text-center">

          <div className="mb-8 text-5xl">
            ❤️
          </div>

          <h1 className="font-serif text-3xl font-light sm:text-5xl">
            That's it...
          </h1>

          <p className="mt-5 font-serif text-lg italic text-white/50 sm:text-xl">
            Your little friend is coming. 🐘
          </p>

        </div>
      </section>
    );
  }

  // ============================================================
  // ELEPHANT VIDEO
  // ============================================================

  if (stage === "video") {
    return (
      <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">

        <div className="absolute inset-0 flex items-center justify-center bg-black">

          <video
            ref={videoRef}
            src={hathivideo}
            className="h-screen w-full object-contain"
            playsInline
            controls={false}
            onEnded={handleVideoEnd}
            onClick={() => {
              videoRef.current?.play();
            }}
          />

        </div>

        {error && (
          <div className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 text-center">

            <p className="rounded-full bg-black/70 px-5 py-3 text-sm text-white/70 backdrop-blur">
              {error}
            </p>

          </div>
        )}

      </section>
    );
  }

  return null;
}