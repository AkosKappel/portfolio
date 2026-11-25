"use client";

import { useEffect, useRef, useState } from "react";

// The Web Speech API is not in TypeScript's DOM types yet; this is the part the chat uses.
type SpeechRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
type RecognitionConstructor = new () => SpeechRecognition;

const SPEECH_LANGUAGES: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  sk: "sk-SK",
  cs: "cs-CZ",
  hu: "hu-HU",
};

function recognitionClass(): RecognitionConstructor | undefined {
  const scope = window as unknown as Record<string, RecognitionConstructor | undefined>;
  return scope.SpeechRecognition ?? scope.webkitSpeechRecognition;
}

/**
 * Voice input through the browser's own speech recognition (Chrome, Edge and Safari; not
 * Firefox). What is said is appended to the text already typed, so it can be edited before
 * sending. Chrome sends the audio to Google for recognition, which /colophon mentions.
 */
export function useSpeech(locale: string, text: string, setText: (text: string) => void) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    setSupported(Boolean(recognitionClass()));
    return () => recognition.current?.abort();
  }, []);

  function start() {
    const Recognition = recognitionClass();
    if (!Recognition) return;
    const typed = text.trimEnd();
    const session = new Recognition();
    session.lang = SPEECH_LANGUAGES[locale] ?? locale;
    session.interimResults = true;
    session.continuous = false;
    session.onresult = (event) => {
      const spoken = Array.from(event.results, (result) => result[0].transcript).join("");
      setText(typed ? `${typed} ${spoken}` : spoken);
    };
    session.onend = () => setListening(false);
    session.onerror = () => setListening(false);
    recognition.current = session;
    session.start();
    setListening(true);
  }

  function stop() {
    recognition.current?.stop();
  }

  return { supported, listening, toggle: listening ? stop : start, stop };
}
