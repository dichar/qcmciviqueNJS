import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AuthUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
}

export function useAdminUserEmails() {
  const [userEmails, setUserEmails] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase.functions.invoke('admin-export', {
        body: { action: 'export_auth_users' }
      });

      if (error) {
        console.error('Error fetching user emails:', error);
        return;
      }

      if (data?.data) {
        const emailMap: Record<string, string> = {};
        data.data.forEach((user: AuthUser) => {
          if (user.email) {
            emailMap[user.id] = user.email;
          }
        });
        setUserEmails(emailMap);
      }
    } catch (err) {
      console.error('Error in useAdminUserEmails:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return { userEmails, loading, refetch: fetchEmails };
}
