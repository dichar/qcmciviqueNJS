import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  MessageSquare, 
  Send, 
  Plus,
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell
} from 'lucide-react';
import { useUserTickets, Ticket, TicketMessage, TicketStatus, TicketType } from '@/hooks/useTickets';
import { useUnreadNotifications } from '@/hooks/useUnreadNotifications';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const statusConfig: Record<TicketStatus, { label: string; icon: React.ComponentType<any>; variant: 'default' | 'secondary' | 'outline' }> = {
  open: { label: 'Ouvert', icon: AlertCircle, variant: 'default' },
  in_progress: { label: 'En cours', icon: Clock, variant: 'secondary' },
  resolved: { label: 'Résolu', icon: CheckCircle, variant: 'outline' },
};

const typeLabels: Record<TicketType, string> = {
  support: 'Support technique',
  contact: 'Question générale',
  feedback: 'Suggestion / Feedback',
};

type ViewState = 'list' | 'new' | 'conversation';

export const UserMessaging = () => {
  const { tickets, loading, getMessages, sendMessage, createTicket } = useUserTickets();
  const { markAsRead, unreadCount } = useUnreadNotifications();
  const [view, setView] = useState<ViewState>('list');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  
  // New ticket form
  const [newSubject, setNewSubject] = useState('');
  const [newType, setNewType] = useState<TicketType>('support');
  const [newContent, setNewContent] = useState('');
  const [creating, setCreating] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSelectTicket = async (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setView('conversation');
    setLoadingMessages(true);
    const msgs = await getMessages(ticket.id);
    setMessages(msgs);
    setLoadingMessages(false);
    
    // Mark as read when user opens the conversation
    await markAsRead(ticket.id);
  };

  const handleSendMessage = async () => {
    if (!selectedTicket || !newMessage.trim()) return;
    
    setSending(true);
    const success = await sendMessage(selectedTicket.id, newMessage.trim());
    
    if (success) {
      setNewMessage('');
      const msgs = await getMessages(selectedTicket.id);
      setMessages(msgs);
      toast.success('Message envoyé');
    } else {
      toast.error('Erreur lors de l\'envoi');
    }
    setSending(false);
  };

  const handleCreateTicket = async () => {
    if (!newSubject.trim() || !newContent.trim()) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setCreating(true);
    const ticketId = await createTicket(newSubject.trim(), newContent.trim(), newType);
    
    if (ticketId) {
      toast.success('Ticket créé');
      setNewSubject('');
      setNewContent('');
      setNewType('support');
      setView('list');
    } else {
      toast.error('Erreur lors de la création');
    }
    setCreating(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // List view
  if (view === 'list') {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Mes demandes
          </CardTitle>
          <Button size="sm" onClick={() => setView('new')}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle demande
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse p-4 border rounded-lg">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">Aucune demande</h3>
              <p className="text-muted-foreground mb-4">
                Vous n'avez pas encore créé de demande.
              </p>
              <Button onClick={() => setView('new')}>
                Créer une demande
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => {
                const statusInfo = statusConfig[ticket.status];
                const StatusIcon = statusInfo.icon;
                
                return (
                  <button
                    key={ticket.id}
                    onClick={() => handleSelectTicket(ticket)}
                    className="w-full p-4 border rounded-lg text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{ticket.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {typeLabels[ticket.type]} · {ticket.message_count} message(s)
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Mis à jour le {format(new Date(ticket.updated_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                        </p>
                      </div>
                      <Badge variant={statusInfo.variant} className="flex items-center gap-1 shrink-0">
                        <StatusIcon className="h-3 w-3" />
                        {statusInfo.label}
                      </Badge>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // New ticket form
  if (view === 'new') {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setView('list')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle>Nouvelle demande</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type de demande</Label>
            <Select value={newType} onValueChange={(v) => setNewType(v as TicketType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="support">Support technique</SelectItem>
                <SelectItem value="contact">Question générale</SelectItem>
                <SelectItem value="feedback">Suggestion / Feedback</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Sujet</Label>
            <Input
              id="subject"
              placeholder="Décrivez brièvement votre demande"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Message</Label>
            <Textarea
              id="content"
              placeholder="Détaillez votre demande..."
              rows={6}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setView('list')}>
              Annuler
            </Button>
            <Button onClick={handleCreateTicket} disabled={creating}>
              <Send className="h-4 w-4 mr-2" />
              {creating ? 'Envoi...' : 'Envoyer'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Conversation view
  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader className="flex-shrink-0 pb-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => { setView('list'); setSelectedTicket(null); }}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate">{selectedTicket?.subject}</CardTitle>
            <p className="text-xs text-muted-foreground">
              {selectedTicket && typeLabels[selectedTicket.type]}
            </p>
          </div>
          {selectedTicket && (
            <Badge variant={statusConfig[selectedTicket.status].variant}>
              {statusConfig[selectedTicket.status].label}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <ScrollArea className="flex-1 px-6">
        {loadingMessages ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            Aucun message
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender_type === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.sender_type === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-xs font-medium mb-1">
                    {message.sender_type === 'user' ? 'Vous' : 'Support'}
                  </p>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={cn(
                    "text-[10px] mt-1",
                    message.sender_type === 'user' 
                      ? "text-primary-foreground/70" 
                      : "text-muted-foreground"
                  )}>
                    {format(new Date(message.created_at), 'dd MMM HH:mm', { locale: fr })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      {selectedTicket?.status !== 'resolved' && (
        <div className="p-4 border-t flex-shrink-0">
          <div className="flex gap-2">
            <Textarea
              placeholder="Votre message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-[50px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleSendMessage();
                }
              }}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={sending || !newMessage.trim()}
              className="self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {selectedTicket?.status === 'resolved' && (
        <div className="p-4 border-t bg-muted/50 text-center text-sm text-muted-foreground">
          Cette demande est résolue. Envoyez un message pour la rouvrir.
          <Button 
            variant="link" 
            size="sm" 
            className="ml-2"
            onClick={() => setSelectedTicket({ ...selectedTicket, status: 'open' })}
          >
            Répondre quand même
          </Button>
        </div>
      )}
    </Card>
  );
};
