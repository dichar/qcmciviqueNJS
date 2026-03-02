import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SEEN_QUESTIONS_KEY = 'qcmcivique_seen_questions';

interface SeenQuestionsData {
  questions: string[];
  lastReset: string;
}

export const useSeenQuestions = () => {
  const [seenQuestions, setSeenQuestions] = useState<Set<string>>(new Set());
  const userIdRef = useRef<string | null>(null);

  // Load seen questions from localStorage or database
  useEffect(() => {
    const loadSeenQuestions = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        userIdRef.current = session.user.id;
        const key = `${SEEN_QUESTIONS_KEY}_${session.user.id}`;
        const stored = localStorage.getItem(key);
        if (stored) {
          try {
            const data: SeenQuestionsData = JSON.parse(stored);
            setSeenQuestions(new Set(data.questions));
          } catch {
            setSeenQuestions(new Set());
          }
        }
      } else {
        const stored = localStorage.getItem(SEEN_QUESTIONS_KEY);
        if (stored) {
          try {
            const data: SeenQuestionsData = JSON.parse(stored);
            setSeenQuestions(new Set(data.questions));
          } catch {
            setSeenQuestions(new Set());
          }
        }
      }
    };

    loadSeenQuestions();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        userIdRef.current = session.user.id;
        const key = `${SEEN_QUESTIONS_KEY}_${session.user.id}`;
        const stored = localStorage.getItem(key);
        if (stored) {
          try {
            const data: SeenQuestionsData = JSON.parse(stored);
            setSeenQuestions(new Set(data.questions));
          } catch {
            setSeenQuestions(new Set());
          }
        } else {
          setSeenQuestions(new Set());
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const markQuestionsAsSeen = useCallback((questionTexts: string[]) => {
    setSeenQuestions(prev => {
      const newSet = new Set(prev);
      let changed = false;
      questionTexts.forEach(q => {
        if (!newSet.has(q)) {
          newSet.add(q);
          changed = true;
        }
      });
      if (!changed) return prev; // Return same reference to avoid unnecessary re-renders
      
      // Save to localStorage
      const key = userIdRef.current ? `${SEEN_QUESTIONS_KEY}_${userIdRef.current}` : SEEN_QUESTIONS_KEY;
      const data: SeenQuestionsData = {
        questions: Array.from(newSet),
        lastReset: new Date().toISOString()
      };
      localStorage.setItem(key, JSON.stringify(data));
      
      return newSet;
    });
  }, []);

  const resetSeenQuestions = useCallback(() => {
    setSeenQuestions(new Set());
    const key = userIdRef.current ? `${SEEN_QUESTIONS_KEY}_${userIdRef.current}` : SEEN_QUESTIONS_KEY;
    localStorage.removeItem(key);
  }, []);

  const getSeenCount = useCallback(() => seenQuestions.size, [seenQuestions]);

  const hasSeenQuestion = useCallback((questionText: string) => seenQuestions.has(questionText), [seenQuestions]);

  return {
    seenQuestions,
    markQuestionsAsSeen,
    resetSeenQuestions,
    getSeenCount,
    hasSeenQuestion
  };
};
