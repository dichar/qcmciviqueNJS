import { useState, useEffect } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { User } from "@supabase/supabase-js";

const feedbackSchema = z.object({
  feedbackType: z.string().min(1, "Feedback type is required"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
});

export const FeedbackDialog = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    feedbackType: "",
    message: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour envoyer un feedback",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const validated = feedbackSchema.parse(formData);

      // Create a ticket with type 'feedback'
      const { data: ticket, error: ticketError } = await supabase
        .from("tickets")
        .insert({
          user_id: user.id,
          email: user.email,
          type: 'feedback',
          subject: `[${validated.feedbackType}] Feedback - ${window.location.pathname}`,
          status: 'open'
        })
        .select()
        .single();

      if (ticketError) throw ticketError;

      // Create the initial message
      const { error: messageError } = await supabase
        .from("ticket_messages")
        .insert({
          ticket_id: ticket.id,
          sender_type: 'user',
          sender_id: user.id,
          content: validated.message
        });

      if (messageError) throw messageError;

      toast({
        title: t("feedback.success"),
        description: t("feedback.thankYou"),
      });

      setFormData({ feedbackType: "", message: "" });
      setOpen(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: t("feedback.error"),
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t("feedback.error"),
          description: t("feedback.submitError"),
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Desktop: FAB button, Mobile: Discrete link positioned higher */}
        <Button
          variant="ghost"
          className="fixed bottom-24 left-4 z-50 sm:bottom-6 sm:left-6 
            h-auto w-auto px-2 py-2 text-xs text-muted-foreground hover:text-foreground bg-background/80 backdrop-blur-sm border border-border rounded-md shadow-sm
            sm:rounded-full sm:shadow-lg sm:h-auto sm:px-6 sm:py-3 sm:text-sm sm:text-primary-foreground sm:bg-primary sm:hover:bg-primary/90 sm:border-0"
          size="lg"
        >
          <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 sm:mr-2" />
          <span className="hidden sm:inline">{t("feedback.button")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("feedback.title")}</DialogTitle>
          <DialogDescription>
            {user 
              ? t("feedback.description")
              : "Connectez-vous pour envoyer un feedback et recevoir une réponse."
            }
          </DialogDescription>
        </DialogHeader>
        
        {!user ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground mb-4">
              Vous devez être connecté pour envoyer un feedback.
            </p>
            <Button onClick={() => window.location.href = '/auth'}>
              Se connecter
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedbackType">{t("feedback.type")}</Label>
              <Select
                value={formData.feedbackType}
                onValueChange={(value) =>
                  setFormData({ ...formData, feedbackType: value })
                }
              >
                <SelectTrigger id="feedbackType">
                  <SelectValue placeholder={t("feedback.selectType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">{t("feedback.types.bug")}</SelectItem>
                  <SelectItem value="difficulty">
                    {t("feedback.types.difficulty")}
                  </SelectItem>
                  <SelectItem value="suggestion">
                    {t("feedback.types.suggestion")}
                  </SelectItem>
                  <SelectItem value="confusion">
                    {t("feedback.types.confusion")}
                  </SelectItem>
                  <SelectItem value="other">
                    {t("feedback.types.other")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{t("feedback.message")}</Label>
              <Textarea
                id="message"
                placeholder={t("feedback.messagePlaceholder")}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="min-h-[120px]"
                required
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Connecté en tant que {user.email}
            </p>

            <Button type="submit" className="w-full" disabled={loading}>
              <Send className="mr-2 h-4 w-4" />
              {loading ? t("feedback.sending") : t("feedback.submit")}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
