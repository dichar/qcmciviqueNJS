import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const MAX_FREE_NICKNAME_EDITS = 5;

export const useNickname = () => {
  const { toast } = useToast();
  const [nickname, setNickname] = useState<string | null>(null);
  const [nicknameEditCount, setNicknameEditCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkNickname = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        setLoading(false);
        return;
      }

      setUserId(session.session.user.id);

      const { data: profile } = await supabase
        .from('profiles')
        .select('nickname, nickname_edit_count')
        .eq('id', session.session.user.id)
        .maybeSingle();

      setNickname(profile?.nickname || null);
      setNicknameEditCount(profile?.nickname_edit_count || 0);
      setLoading(false);
    };

    checkNickname();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkNickname();
    });

    return () => subscription.unsubscribe();
  }, []);

  const saveNickname = async (newNickname: string, hasPackReussiteOrHigher: boolean = false): Promise<boolean> => {
    if (!userId) return false;

    // Validate nickname
    const trimmed = newNickname.trim();
    if (trimmed.length < 3 || trimmed.length > 20) {
      toast({ 
        title: 'Erreur', 
        description: 'Le surnom doit contenir entre 3 et 20 caractères', 
        variant: 'destructive' 
      });
      return false;
    }

    // Check for inappropriate content (basic filter)
    const forbiddenPatterns = /[<>{}]/;
    if (forbiddenPatterns.test(trimmed)) {
      toast({ 
        title: 'Erreur', 
        description: 'Le surnom contient des caractères non autorisés', 
        variant: 'destructive' 
      });
      return false;
    }

    // Check edit limit for non-premium users
    if (!hasPackReussiteOrHigher && nicknameEditCount >= MAX_FREE_NICKNAME_EDITS) {
      return false; // Let the caller handle this case
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          nickname: trimmed,
          nickname_edit_count: nicknameEditCount + 1
        })
        .eq('id', userId);

      if (error) throw error;

      setNickname(trimmed);
      setNicknameEditCount(prev => prev + 1);
      toast({ title: 'Succès', description: 'Surnom enregistré' });
      return true;
    } catch (error: any) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      return false;
    }
  };

  const canEditNickname = (hasPackReussiteOrHigher: boolean): boolean => {
    return hasPackReussiteOrHigher || nicknameEditCount < MAX_FREE_NICKNAME_EDITS;
  };

  const remainingEdits = Math.max(0, MAX_FREE_NICKNAME_EDITS - nicknameEditCount);

  return {
    nickname,
    nicknameEditCount,
    remainingEdits,
    maxFreeEdits: MAX_FREE_NICKNAME_EDITS,
    loading,
    hasNickname: !!nickname,
    saveNickname,
    canEditNickname,
    userId,
  };
};
