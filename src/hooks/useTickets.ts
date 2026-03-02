import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type TicketType = 'support' | 'contact' | 'feedback';
export type TicketStatus = 'open' | 'in_progress' | 'resolved';
export type SenderType = 'user' | 'admin';

export interface Ticket {
  id: string;
  user_id: string | null;
  email: string | null;
  subject: string;
  type: TicketType;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
  // Enriched fields
  user_name?: string;
  message_count?: number;
  last_message?: string;
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  content: string;
  sender_type: SenderType;
  sender_id: string | null;
  created_at: string;
}

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch tickets
      const { data: ticketsData, error: ticketsError } = await supabase
        .from('tickets')
        .select('*')
        .order('updated_at', { ascending: false });

      if (ticketsError) throw ticketsError;

      // Enrich with message counts and user names
      const enrichedTickets = await Promise.all(
        (ticketsData || []).map(async (ticket) => {
          // Get message count
          const { count } = await supabase
            .from('ticket_messages')
            .select('*', { count: 'exact', head: true })
            .eq('ticket_id', ticket.id);

          // Get last message
          const { data: lastMessage } = await supabase
            .from('ticket_messages')
            .select('content')
            .eq('ticket_id', ticket.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          // Get user name if user_id exists
          let userName = ticket.email || 'Visiteur';
          if (ticket.user_id) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('full_name, nickname')
              .eq('id', ticket.user_id)
              .maybeSingle();
            
            if (profile) {
              userName = profile.nickname || profile.full_name || ticket.email || 'Utilisateur';
            }
          }

          return {
            ...ticket,
            type: ticket.type as TicketType,
            status: ticket.status as TicketStatus,
            message_count: count || 0,
            last_message: lastMessage?.content,
            user_name: userName,
          };
        })
      );

      setTickets(enrichedTickets);
      setError(null);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Erreur lors du chargement des tickets');
    } finally {
      setLoading(false);
    }
  }, []);

  const getMessages = async (ticketId: string): Promise<TicketMessage[]> => {
    const { data, error } = await supabase
      .from('ticket_messages')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }

    return (data || []).map(msg => ({
      ...msg,
      sender_type: msg.sender_type as SenderType,
    }));
  };

  const sendMessage = async (ticketId: string, content: string, isAdmin: boolean): Promise<boolean> => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('ticket_messages')
        .insert({
          ticket_id: ticketId,
          content,
          sender_type: isAdmin ? 'admin' : 'user',
          sender_id: userData.user?.id || null,
        });

      if (error) throw error;

      // Update ticket updated_at and mark as unread for user if admin is sending
      const updateData: { updated_at: string; has_unread_admin_reply?: boolean } = { 
        updated_at: new Date().toISOString() 
      };
      
      if (isAdmin) {
        updateData.has_unread_admin_reply = true;
      }

      await supabase
        .from('tickets')
        .update(updateData)
        .eq('id', ticketId);

      return true;
    } catch (err) {
      console.error('Error sending message:', err);
      return false;
    }
  };

  const updateTicketStatus = async (ticketId: string, status: TicketStatus): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', ticketId);

      if (error) throw error;
      
      // Refresh tickets
      await fetchTickets();
      return true;
    } catch (err) {
      console.error('Error updating ticket status:', err);
      return false;
    }
  };

  const createTicket = async (
    subject: string,
    message: string,
    type: TicketType = 'support'
  ): Promise<string | null> => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        throw new Error('User not authenticated');
      }

      // Create ticket
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .insert({
          user_id: userData.user.id,
          subject,
          type,
          status: 'open',
        })
        .select()
        .single();

      if (ticketError) throw ticketError;

      // Create first message
      const { error: messageError } = await supabase
        .from('ticket_messages')
        .insert({
          ticket_id: ticket.id,
          content: message,
          sender_type: 'user',
          sender_id: userData.user.id,
        });

      if (messageError) throw messageError;

      await fetchTickets();
      return ticket.id;
    } catch (err) {
      console.error('Error creating ticket:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('tickets-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tickets' },
        () => fetchTickets()
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'ticket_messages' },
        () => fetchTickets()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchTickets]);

  return {
    tickets,
    loading,
    error,
    fetchTickets,
    getMessages,
    sendMessage,
    updateTicketStatus,
    createTicket,
  };
};

export const useUserTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserTickets = useCallback(async () => {
    try {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        setTickets([]);
        return;
      }

      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const enrichedTickets = await Promise.all(
        (data || []).map(async (ticket) => {
          const { count } = await supabase
            .from('ticket_messages')
            .select('*', { count: 'exact', head: true })
            .eq('ticket_id', ticket.id);

          return {
            ...ticket,
            type: ticket.type as TicketType,
            status: ticket.status as TicketStatus,
            message_count: count || 0,
          };
        })
      );

      setTickets(enrichedTickets);
    } catch (err) {
      console.error('Error fetching user tickets:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getMessages = async (ticketId: string): Promise<TicketMessage[]> => {
    const { data, error } = await supabase
      .from('ticket_messages')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }

    return (data || []).map(msg => ({
      ...msg,
      sender_type: msg.sender_type as SenderType,
    }));
  };

  const sendMessage = async (ticketId: string, content: string): Promise<boolean> => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('ticket_messages')
        .insert({
          ticket_id: ticketId,
          content,
          sender_type: 'user',
          sender_id: userData.user?.id || null,
        });

      if (error) throw error;

      // Update ticket updated_at and reopen if resolved
      await supabase
        .from('tickets')
        .update({ 
          updated_at: new Date().toISOString(),
          status: 'open'
        })
        .eq('id', ticketId);

      return true;
    } catch (err) {
      console.error('Error sending message:', err);
      return false;
    }
  };

  const createTicket = async (
    subject: string,
    message: string,
    type: TicketType = 'support'
  ): Promise<string | null> => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        throw new Error('User not authenticated');
      }

      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .insert({
          user_id: userData.user.id,
          subject,
          type,
          status: 'open',
        })
        .select()
        .single();

      if (ticketError) throw ticketError;

      const { error: messageError } = await supabase
        .from('ticket_messages')
        .insert({
          ticket_id: ticket.id,
          content: message,
          sender_type: 'user',
          sender_id: userData.user.id,
        });

      if (messageError) throw messageError;

      await fetchUserTickets();
      return ticket.id;
    } catch (err) {
      console.error('Error creating ticket:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchUserTickets();
  }, [fetchUserTickets]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('user-tickets-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tickets' },
        () => fetchUserTickets()
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'ticket_messages' },
        () => fetchUserTickets()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchUserTickets]);

  return {
    tickets,
    loading,
    fetchUserTickets,
    getMessages,
    sendMessage,
    createTicket,
  };
};
