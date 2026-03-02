import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Mail, Send, MessageSquare, HelpCircle, Clock, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { UserMessaging } from "@/components/messaging/UserMessaging";
import { Link } from "react-router-dom";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "Le nom est trop long"),
  email: z.string().trim().email("Adresse e-mail invalide").max(255, "L'adresse e-mail est trop longue"),
  subject: z.string().trim().min(1, "Le sujet est requis").max(200, "Le sujet est trop long"),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(2000, "Le message est trop long (2000 caractères max)")
});

const Support = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const mailtoSubject = encodeURIComponent(`[QCM Civique] ${formData.subject}`);
      const mailtoBody = encodeURIComponent(
        `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      window.location.href = `mailto:qcmcivique@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      toast({
        title: "Redirection vers votre messagerie",
        description: "Votre client e-mail va s'ouvrir pour envoyer le message."
      });

      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 1000);

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <SEO 
        title="Support et Contact – QCM Civique"
        description="Contactez l'équipe QCM Civique pour toute question sur la préparation à l'examen civique. Nous répondons sous 48h."
        canonical="/support"
      />
      <Navigation />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Support & Contact
        </h1>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Une question sur l'examen civique ou sur l'utilisation du site ? Nous sommes là pour vous aider.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <MessageSquare className="h-10 w-10 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Questions fréquentes</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Consultez notre FAQ pour des réponses rapides.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/#faq">Voir la FAQ</Link>
            </Button>
          </Card>
          
          <Card className="p-6 text-center">
            <Mail className="h-10 w-10 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Contact général</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Partenariats, presse, questions générales.
            </p>
            <a 
              href="mailto:qcmcivique@gmail.com"
              className="text-primary hover:underline text-sm font-medium"
            >
              qcmcivique@gmail.com
            </a>
          </Card>
          
          <Card className="p-6 text-center">
            <Clock className="h-10 w-10 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Délai de réponse</h3>
            <p className="text-sm text-muted-foreground">
              Nous nous efforçons de répondre sous 48 heures ouvrées.
            </p>
          </Card>
        </div>

        {/* Unified Messaging System */}
        <div className="mb-8">
          <UserMessaging />
        </div>

        {/* Public Contact Form */}
        <Card className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Contact général</h2>
              <p className="text-sm text-muted-foreground">
                Pour les demandes de partenariat, presse ou questions générales
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom / Prénom *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Adresse e-mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Sujet *</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="En quoi pouvons-nous vous aider ?"
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? "border-destructive" : ""}
              />
              {errors.subject && (
                <p className="text-sm text-destructive">{errors.subject}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Décrivez votre question ou votre demande en détail..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "border-destructive" : ""}
              />
              {errors.message && (
                <p className="text-sm text-destructive">{errors.message}</p>
              )}
              <p className="text-xs text-muted-foreground text-right">
                {formData.message.length}/2000 caractères
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <p className="text-sm text-muted-foreground">
                * Champs obligatoires
              </p>
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Vous pouvez également nous écrire directement à{" "}
              <a 
                href="mailto:qcmcivique@gmail.com" 
                className="text-primary hover:underline font-medium"
              >
                qcmcivique@gmail.com
              </a>
            </p>
          </div>
        </Card>

        <Card className="p-6 mt-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Informations importantes</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Ce site n'est pas un service officiel de l'État français.</li>
            <li>• Pour des questions administratives sur votre dossier de naturalisation, contactez votre préfecture.</li>
            <li>• Pour des informations sur les centres d'examen, consultez le site officiel du Français des Affaires (CCI).</li>
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default Support;
