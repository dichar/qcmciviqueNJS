import { useCallback } from 'react';
import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const fireConfetti = useCallback(() => {
    // French tricolor confetti (blue, white, red)
    const colors = ['#0055A4', '#FFFFFF', '#EF4135'];
    
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        ...opts,
        origin: { y: 0.7 },
        colors,
        particleCount: Math.floor(200 * particleRatio),
        disableForReducedMotion: true,
      });
    };

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  const fireSmallConfetti = useCallback(() => {
    // Smaller confetti for streak celebrations
    const colors = ['#0055A4', '#FFFFFF', '#EF4135'];
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6, x: 0.5 },
      colors,
      scalar: 0.8,
      disableForReducedMotion: true,
    });
  }, []);

  return { fireConfetti, fireSmallConfetti };
};
