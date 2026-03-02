import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const COMPLETED_QUIZZES_KEY = 'qcmcivique_completed_quizzes';
const FREE_QUIZZES_ALLOWED = 2; // First 2 quizzes are free

export type PackType = 'ESSENTIEL' | 'REUSSITE' | 'PREMIUM_PLUS' | null;

interface PurchaseStatus {
  hasFullAccess: boolean;
  packType: PackType;
  expiresAt: Date | null;
  isExpired: boolean;
  completedQuizCount: number;
  canTakeQuiz: boolean; // Can start a new quiz without paying
  loading: boolean;
  userId: string | null;
}

export const usePurchaseStatus = (): PurchaseStatus => {
  const [hasFullAccess, setHasFullAccess] = useState(false);
  const [packType, setPackType] = useState<PackType>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [completedQuizCount, setCompletedQuizCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUserId(session.user.id);
          
          // SECURITY: Only trust database for purchase status - never localStorage
          const { data: purchases } = await supabase
            .from('user_purchases')
            .select('has_full_access, pack_type, expires_at')
            .eq('user_id', session.user.id)
            .eq('has_full_access', true)
            .order('purchased_at', { ascending: false })
            .limit(1);

          if (purchases && purchases.length > 0) {
            const purchase = purchases[0];
            const expDate = purchase.expires_at ? new Date(purchase.expires_at) : null;
            const now = new Date();
            
            // Check if access is still valid (not expired or lifetime)
            const isExpired = expDate ? expDate < now : false;
            const hasValidAccess = !isExpired;
            
            setHasFullAccess(hasValidAccess);
            setPackType(purchase.pack_type as PackType);
            setExpiresAt(expDate);
          } else {
            setHasFullAccess(false);
            setPackType(null);
            setExpiresAt(null);
          }

          // Count completed quizzes from database
          const { count } = await supabase
            .from('quiz_results')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', session.user.id);

          const dbQuizCount = count || 0;
          setCompletedQuizCount(dbQuizCount);
          
          // Sync to localStorage for persistence
          localStorage.setItem(COMPLETED_QUIZZES_KEY, dbQuizCount.toString());
        } else {
          // Not logged in - use localStorage for tracking
          const localCount = parseInt(localStorage.getItem(COMPLETED_QUIZZES_KEY) || '0', 10);
          setCompletedQuizCount(localCount);
          setHasFullAccess(false); // SECURITY: Never grant full access without auth verification
          setPackType(null);
          setExpiresAt(null);
        }
      } catch (error) {
        console.error('Error checking purchase status:', error);
        // SECURITY: On error, use localStorage for count, deny full access
        const localCount = parseInt(localStorage.getItem(COMPLETED_QUIZZES_KEY) || '0', 10);
        setCompletedQuizCount(localCount);
        setHasFullAccess(false);
        setPackType(null);
        setExpiresAt(null);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkStatus();
    });

    return () => subscription.unsubscribe();
  }, []);

  // User can take quiz if: has full access OR hasn't used all free quizzes yet
  const canTakeQuiz = hasFullAccess || completedQuizCount < FREE_QUIZZES_ALLOWED;
  
  // Check if expired
  const isExpired = expiresAt ? expiresAt < new Date() : false;

  return { hasFullAccess, packType, expiresAt, isExpired, completedQuizCount, canTakeQuiz, loading, userId };
};

// Increment completed quiz count (call after quiz completion)
export const incrementCompletedQuizzes = () => {
  const currentCount = parseInt(localStorage.getItem(COMPLETED_QUIZZES_KEY) || '0', 10);
  const newCount = currentCount + 1;
  localStorage.setItem(COMPLETED_QUIZZES_KEY, newCount.toString());
  return newCount;
};

// Check if paywall should show after completing a quiz
export const shouldShowPaywallAfterQuiz = (completedCount: number, hasFullAccess: boolean): boolean => {
  // Show paywall only after completing the 2nd quiz (completedCount will be 2 after incrementing)
  return !hasFullAccess && completedCount >= FREE_QUIZZES_ALLOWED;
};

// Check if user has access to a specific feature based on pack type
export const hasFeatureAccess = (packType: PackType, feature: 'badges' | 'livret' | 'entretien' | 'eligibility_quiz'): boolean => {
  if (!packType) return false;
  
  switch (feature) {
    case 'badges':
    case 'livret':
      // Available in REUSSITE and PREMIUM_PLUS
      return packType === 'REUSSITE' || packType === 'PREMIUM_PLUS';
    case 'entretien':
    case 'eligibility_quiz':
      // Only available in PREMIUM_PLUS
      return packType === 'PREMIUM_PLUS';
    default:
      return false;
  }
};

export const FREE_QUIZZES_LIMIT = FREE_QUIZZES_ALLOWED;
