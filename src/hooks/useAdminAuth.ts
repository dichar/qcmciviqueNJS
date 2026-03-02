import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

export const useAdminAuth = () => {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    isAdmin: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setState({ user: null, isAdmin: false, loading: false, error: null });
          return;
        }

        // Check admin role using the is_admin function
        const { data, error } = await supabase.rpc('is_admin', {
          _user_id: session.user.id
        });

        if (error) {
          console.error('Error checking admin status:', error);
          setState({ 
            user: session.user, 
            isAdmin: false, 
            loading: false, 
            error: 'Erreur lors de la vérification des droits admin' 
          });
          return;
        }

        setState({ 
          user: session.user, 
          isAdmin: data === true, 
          loading: false, 
          error: null 
        });
      } catch (err) {
        console.error('Admin auth error:', err);
        setState({ 
          user: null, 
          isAdmin: false, 
          loading: false, 
          error: 'Erreur d\'authentification' 
        });
      }
    };

    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => subscription.unsubscribe();
  }, []);

  return state;
};
