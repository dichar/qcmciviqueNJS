import { useState, useEffect, useRef } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminCard } from '@/components/admin/AdminCard';
import { StatCard } from '@/components/admin/StatCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Send, 
  MessageSquare, 
  Mail, 
  Lightbulb,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  Inbox
} from 'lucide-react';
import { useTickets, Ticket, TicketMessage, TicketStatus, TicketType } from '@/hooks/useTickets';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const typeConfig: Record<TicketType, { label: string; icon: React.ComponentType<any>; color: string; gradient: string }> = {
  support: { label: 'Support', icon: MessageSquare, color: 'bg-blue-500', gradient: 'from-blue-500 to-blue-600' },
  contact: { label: 'Contact', icon: Mail, color: 'bg-green-500', gradient: 'from-green-500 to-green-600' },
  feedback: { label: 'Feedback', icon: Lightbulb, color: 'bg-amber-500', gradient: 'from-amber-500 to-amber-600' },
};

const statusConfig: Record<TicketStatus, { label: string; icon: React.ComponentType<any>; className: string }> = {
  open: { label: 'Ouvert', icon: AlertCircle, className: 'bg-red-500/10 text-red-400 border-red-500/20' },
  in_progress: { label: 'En cours', icon: Clock, className: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  resolved: { label: 'Résolu', icon: CheckCircle, className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
};

export default function AdminMessaging() {
  const { tickets, loading, fetchTickets, getMessages, sendMessage, updateTicketStatus } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('open');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ticket.user_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ticket.email?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || ticket.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    support: tickets.filter(t => t.type === 'support').length,
  };

  const handleSelectTicket = async (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setLoadingMessages(true);
    const msgs = await getMessages(ticket.id);
    setMessages(msgs);
    setLoadingMessages(false);
  };

  const handleSendMessage = async () => {
    if (!selectedTicket || !newMessage.trim()) return;
    
    setSending(true);
    const success = await sendMessage(selectedTicket.id, newMessage.trim(), true);
    
    if (success) {
      setNewMessage('');
      const msgs = await getMessages(selectedTicket.id);
      setMessages(msgs);
      
      if (selectedTicket.status === 'open') {
        await updateTicketStatus(selectedTicket.id, 'in_progress');
        setSelectedTicket({ ...selectedTicket, status: 'in_progress' });
      }
      
      toast.success('Message envoyé');
    } else {
      toast.error('Erreur lors de l\'envoi');
    }
    setSending(false);
  };

  const handleStatusChange = async (status: TicketStatus) => {
    if (!selectedTicket) return;
    const success = await updateTicketStatus(selectedTicket.id, status);
    if (success) {
      setSelectedTicket({ ...selectedTicket, status });
      toast.success('Statut mis à jour');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Messagerie</h1>
            <p className="text-slate-400 text-sm">Gestion des tickets et conversations</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchTickets}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
            Actualiser
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total"
            value={stats.total}
            icon={Inbox}
            gradient="blue"
          />
          <StatCard
            title="Ouverts"
            value={stats.open}
            icon={AlertCircle}
            gradient="pink"
          />
          <StatCard
            title="En cours"
            value={stats.inProgress}
            icon={Clock}
            gradient="amber"
          />
          <StatCard
            title="Support"
            value={stats.support}
            icon={MessageSquare}
            gradient="cyan"
          />
        </div>

        {/* Main content */}
        <div className="flex-1 flex gap-4 min-h-0">
          {/* Ticket list */}
          <AdminCard 
            className={cn(
              "flex-shrink-0 flex flex-col",
              selectedTicket ? "hidden lg:flex lg:w-80" : "w-full lg:w-80"
            )}
            noPadding
          >
            {/* Filters */}
            <div className="p-4 border-b border-slate-700/50 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-9 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-8 text-xs bg-slate-900/50 border-slate-600 text-white">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">Tous types</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-8 text-xs bg-slate-900/50 border-slate-600 text-white">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">Tous statuts</SelectItem>
                    <SelectItem value="open">Ouverts</SelectItem>
                    <SelectItem value="in_progress">En cours</SelectItem>
                    <SelectItem value="resolved">Résolus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Ticket list */}
            <ScrollArea className="flex-1">
              {loading ? (
                <div className="p-4 space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-slate-700 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-slate-700 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 text-slate-600" />
                  <p className="text-slate-400">Aucun ticket</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-700/50">
                  {filteredTickets.map((ticket) => {
                    const typeInfo = typeConfig[ticket.type];
                    const statusInfo = statusConfig[ticket.status];
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <button
                        key={ticket.id}
                        onClick={() => handleSelectTicket(ticket)}
                        className={cn(
                          "w-full p-4 text-left hover:bg-slate-800/50 transition-colors",
                          selectedTicket?.id === ticket.id && "bg-slate-800/50 border-l-2 border-primary"
                        )}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", typeInfo.color)} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white text-sm truncate">{ticket.subject}</p>
                            <p className="text-xs text-slate-400 truncate">
                              {ticket.user_name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs pl-5">
                          <Badge variant="outline" className={cn("text-[10px] h-5", statusInfo.className)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                          <span className="text-slate-500">
                            {format(new Date(ticket.updated_at), 'dd MMM', { locale: fr })}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </AdminCard>

          {/* Conversation */}
          {selectedTicket ? (
            <AdminCard className="flex-1 flex flex-col min-w-0" noPadding>
              {/* Ticket header */}
              <div className="p-4 border-b border-slate-700/50 flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-700"
                  onClick={() => setSelectedTicket(null)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-white truncate">{selectedTicket.subject}</h2>
                  <p className="text-xs text-slate-400">
                    {selectedTicket.user_name} · {selectedTicket.email || 'Pas d\'email'}
                  </p>
                </div>
                <Select 
                  value={selectedTicket.status} 
                  onValueChange={(v) => handleStatusChange(v as TicketStatus)}
                >
                  <SelectTrigger className="w-32 h-8 bg-slate-900/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="open">Ouvert</SelectItem>
                    <SelectItem value="in_progress">En cours</SelectItem>
                    <SelectItem value="resolved">Résolu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                {loadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/20 border-t-primary" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 text-slate-600" />
                    <p className="text-slate-400">Aucun message</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.sender_type === 'admin' ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-2xl px-4 py-3",
                            message.sender_type === 'admin'
                              ? "bg-primary text-primary-foreground"
                              : "bg-slate-700 text-white"
                          )}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className={cn(
                            "text-[10px] mt-1",
                            message.sender_type === 'admin' 
                              ? "text-primary-foreground/70" 
                              : "text-slate-400"
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

              {/* Reply input */}
              <div className="p-4 border-t border-slate-700/50">
                <div className="flex gap-3">
                  <Textarea
                    placeholder="Votre réponse..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[140px] resize-y bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
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
                <p className="text-xs text-slate-500 mt-2">
                  Ctrl+Enter pour envoyer
                </p>
              </div>
            </AdminCard>
          ) : (
            <AdminCard className="hidden lg:flex flex-1 items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-700/50 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-slate-500" />
                </div>
                <p className="text-slate-400">Sélectionnez un ticket pour voir la conversation</p>
              </div>
            </AdminCard>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
