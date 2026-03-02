import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextToSpeechProps {
  text: string;
  className?: string;
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "default" | "outline" | "ghost" | "secondary";
  showLabel?: boolean;
}

// Priority list of high-quality French voices (especially for iOS/mobile)
const PREFERRED_FRENCH_VOICES = [
  // iOS/macOS premium voices
  "Amélie",
  "Audrey", 
  "Aurélie",
  "Thomas",
  // Google/Android voices
  "Google français",
  "French Female",
  "French Male",
  // Windows voices
  "Microsoft Hortense",
  "Microsoft Julie",
  "Microsoft Paul",
  // Generic fallbacks
  "fr-FR",
  "fr_FR",
];

const findBestFrenchVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  // Filter French voices only
  const frenchVoices = voices.filter(
    (voice) => voice.lang.startsWith("fr") || voice.lang.includes("FR")
  );

  if (frenchVoices.length === 0) return null;

  // Try to find a preferred voice by priority
  for (const preferredName of PREFERRED_FRENCH_VOICES) {
    const match = frenchVoices.find(
      (voice) => 
        voice.name.toLowerCase().includes(preferredName.toLowerCase()) ||
        voice.voiceURI.toLowerCase().includes(preferredName.toLowerCase())
    );
    if (match) return match;
  }

  // Prefer non-local voices (often higher quality on mobile)
  const remoteVoice = frenchVoices.find((voice) => !voice.localService);
  if (remoteVoice) return remoteVoice;

  // Last resort: return first French voice
  return frenchVoices[0];
};

export const TextToSpeech: React.FC<TextToSpeechProps> = ({
  text,
  className,
  size = "icon",
  variant = "ghost",
  showLabel = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Preload voices on mount
  useEffect(() => {
    if (!window.speechSynthesis) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
      }
    };

    // Load immediately if available
    loadVoices();

    // Also listen for voiceschanged event (needed for some browsers)
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const speak = useCallback(() => {
    if (!text || !window.speechSynthesis) {
      console.warn("Text-to-speech not supported or no text provided");
      return;
    }

    // Stop any current speech
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Set French language
    utterance.lang = "fr-FR";
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Find the best available French voice
    const bestVoice = findBestFrenchVoice(availableVoices);
    if (bestVoice) {
      utterance.voice = bestVoice;
      console.log("Using voice:", bestVoice.name, bestVoice.lang);
    }

    utterance.onstart = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsPlaying(false);
      setIsLoading(false);
    };

    // iOS Safari workaround: need to call speak quickly after user interaction
    window.speechSynthesis.speak(utterance);
  }, [text, isPlaying, availableVoices]);

  const Icon = isPlaying ? VolumeX : Volume2;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={speak}
      disabled={isLoading || !text}
      className={cn(
        "transition-all duration-200",
        isPlaying && "text-primary bg-primary/10",
        className
      )}
      title={isPlaying ? "Arrêter la lecture" : "Écouter le texte"}
      aria-label={isPlaying ? "Arrêter la lecture audio" : "Écouter le texte"}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
      {showLabel && (
        <span className="ml-2">{isPlaying ? "Arrêter" : "Écouter"}</span>
      )}
    </Button>
  );
};
