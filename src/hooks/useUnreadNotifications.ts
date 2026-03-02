import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useUnreadNotifications = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        setUnreadCount(0);
        return;
      }

      const { count, error } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userData.user.id)
        .eq('has_unread_admin_reply', true);

      if (error) throw error;
      
      setUnreadCount(count || 0);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (ticketId: string) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ has_unread_admin_reply: false })
        .eq('id', ticketId);

      if (error) throw error;
      
      // Refresh count
      await fetchUnreadCount();
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  }, [fetchUnreadCount]);

  const markAllAsRead = useCallback(async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) return;

      const { error } = await supabase
        .from('tickets')
        .update({ has_unread_admin_reply: false })
        .eq('user_id', userData.user.id)
        .eq('has_unread_admin_reply', true);

      if (error) throw error;
      
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  }, []);

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  // Real-time subscription for ticket updates
  useEffect(() => {
    const channel = supabase
      .channel('unread-notifications')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'tickets' },
        () => fetchUnreadCount()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchUnreadCount]);

  return {
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    refetch: fetchUnreadCount,
  };
};
