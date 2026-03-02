import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { AppLayout } from "@/components/AppLayout";
import { User } from "@supabase/supabase-js";
import { usePurchaseStatus } from "@/hooks/usePurchaseStatus";
import { useNickname } from "@/hooks/useNickname";
import {
  Crown,
  Clock,
  AlertTriangle,
  CheckCircle,
  Edit3,
  MessageCircle,
  UserX,
  Gift,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Save,
  KeyRound,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { PaymentGate } from "@/components/PaymentGate";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const packLabels: Record<string, string> = {
  ESSENTIEL: "Pack Essentiel",
  REUSSITE: "Pack Réussite",
  PREMIUM_PLUS: "Pack Premium Plus",
};

const packDescriptions: Record<string, string[]> = {
  ESSENTIEL: [
    "QCM de préparation (40 questions)",
    "Historique complet des résultats",
    "Accès aux centres d'examen",
    "Contenu pédagogique + FAQ",
  ],
  REUSSITE: [
    "Tout le Pack Essentiel",
    "Badges de progression & courbe d'évolution",
    "Points à améliorer personnalisés",
    "Livret du Citoyen interactif",
    "Quiz du Livret avec correction",
  ],
  PREMIUM_PLUS: [
    "Tout le Pack Réussite",
    "Questions d'entretien simulées",
    "Quiz d'éligibilité intelligent",
    "Accès à vie à toutes les fonctionnalités",
  ],
};

const Account = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentGate, setShowPaymentGate] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState("");
  const [showUpgradeForNickname, setShowUpgradeForNickname] = useState(false);
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  const [disabling, setDisabling] = useState(false);

  // Password management state
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [fullNameInput, setFullNameInput] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  const { packType, hasFullAccess, expiresAt, isExpired } = usePurchaseStatus();
  const {
    nickname,
    remainingEdits,
    maxFreeEdits,
    saveNickname,
    canEditNickname,
    loading: nicknameLoading,
  } = useNickname();

  const hasPackReussiteOrHigher = packType === "REUSSITE" || packType === "PREMIUM_PLUS";

  // Check if user logged in with Google (no password set)
  const isGoogleUser = user?.app_metadata?.provider === "google";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        setFullNameInput(session.user.user_metadata?.full_name || session.user.user_metadata?.name || "");
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        setFullNameInput(session.user.user_metadata?.full_name || session.user.user_metadata?.name || "");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleDisableAccount = async () => {
    setDisabling(true);
    try {
      localStorage.clear();
      await supabase.auth.signOut();
      toast({
        title: "Compte désactivé",
        description: "Votre compte a été désactivé. Vous pouvez vous reconnecter à tout moment pour le réactiver.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de désactiver le compte",
        variant: "destructive",
      });
    } finally {
      setDisabling(false);
      setShowDisableConfirm(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!fullNameInput.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom ne peut pas être vide",
        variant: "destructive",
      });
      return;
    }

    setProfileLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullNameInput.trim() },
      });

      if (error) throw error;

      toast({
        title: "Profil mis à jour",
        description: "Votre nom a été modifié avec succès.",
      });
      setIsEditingProfile(false);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le profil",
        variant: "destructive",
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    setPasswordLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "Mot de passe mis à jour",
        description: isGoogleUser
          ? "Vous pouvez maintenant vous connecter avec votre email et ce mot de passe."
          : "Votre mot de passe a été modifié avec succès.",
      });
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordSection(false);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le mot de passe",
        variant: "destructive",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center">
        <p>{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <AppLayout>
      <SEO
        title="Mon compte"
        description="Gérez votre compte QCM Civique, consultez votre pack et vos accès aux fonctionnalités de préparation à l'examen civique."
        canonical="/account"
        noIndex={true}
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">{t("account.title")}</CardTitle>
                <CardDescription>
                  {t("account.welcome")}, {user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={user?.user_metadata?.avatar_url || undefined}
                      alt={user?.user_metadata?.full_name || user?.user_metadata?.name || "User"}
                    />
                    <AvatarFallback className="text-2xl">
                      {(user?.user_metadata?.full_name || user?.user_metadata?.name)?.charAt(0)?.toUpperCase() ||
                        user?.email?.charAt(0)?.toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {user?.user_metadata?.full_name || user?.user_metadata?.name || "Utilisateur"}
                    </h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    {isGoogleUser && (
                      <Badge variant="secondary" className="mt-1">
                        Connecté via Google
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  {/* Full Name Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Nom complet</Label>
                      {!isEditingProfile && (
                        <Button size="sm" variant="ghost" onClick={() => setIsEditingProfile(true)}>
                          <Edit3 className="w-4 h-4 mr-1" />
                          Modifier
                        </Button>
                      )}
                    </div>
                    {isEditingProfile ? (
                      <div className="flex gap-2">
                        <Input
                          value={fullNameInput}
                          onChange={(e) => setFullNameInput(e.target.value)}
                          placeholder="Votre nom complet"
                          className="flex-1"
                        />
                        <Button size="sm" onClick={handleUpdateProfile} disabled={profileLoading}>
                          <Save className="w-4 h-4 mr-1" />
                          {profileLoading ? "Sauvegarde..." : "Enregistrer"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setIsEditingProfile(false);
                            setFullNameInput(user?.user_metadata?.full_name || user?.user_metadata?.name || "");
                          }}
                        >
                          Annuler
                        </Button>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        {user?.user_metadata?.full_name || user?.user_metadata?.name || "Non renseigné"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{t("account.email")}</Label>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>

                  {/* Nickname Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Pseudo
                      </Label>
                      {!hasPackReussiteOrHigher && (
                        <span className="text-xs text-muted-foreground">
                          {remainingEdits}/{maxFreeEdits} modifications restantes
                        </span>
                      )}
                    </div>

                    {isEditingNickname ? (
                      <div className="flex gap-2">
                        <Input
                          value={nicknameInput}
                          onChange={(e) => setNicknameInput(e.target.value)}
                          placeholder="Votre pseudo (3-20 caractères)"
                          className="flex-1"
                          maxLength={20}
                        />
                        <Button
                          size="sm"
                          onClick={async () => {
                            if (!canEditNickname(hasPackReussiteOrHigher)) {
                              setShowUpgradeForNickname(true);
                              setIsEditingNickname(false);
                              return;
                            }
                            const success = await saveNickname(nicknameInput, hasPackReussiteOrHigher);
                            if (success) {
                              setIsEditingNickname(false);
                            }
                          }}
                          disabled={nicknameInput.trim().length < 3}
                        >
                          Enregistrer
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setIsEditingNickname(false);
                            setNicknameInput(nickname || "");
                          }}
                        >
                          Annuler
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground">{nickname || "Non défini"}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (!canEditNickname(hasPackReussiteOrHigher)) {
                              setShowUpgradeForNickname(true);
                            } else {
                              setNicknameInput(nickname || "");
                              setIsEditingNickname(true);
                            }
                          }}
                          disabled={nicknameLoading}
                        >
                          <Edit3 className="w-4 h-4 mr-1" />
                          Modifier
                        </Button>
                      </div>
                    )}

                    {!hasPackReussiteOrHigher && remainingEdits === 0 && !showUpgradeForNickname && (
                      <p className="text-xs text-amber-600">
                        Vous avez atteint la limite de modifications. Passez au Pack Réussite pour des modifications
                        illimitées.
                      </p>
                    )}
                  </div>

                  {/* Password Section */}
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <KeyRound className="w-4 h-4" />
                        {isGoogleUser ? "Ajouter un mot de passe" : "Mot de passe"}
                      </Label>
                      {!showPasswordSection && (
                        <Button size="sm" variant="ghost" onClick={() => setShowPasswordSection(true)}>
                          <Lock className="w-4 h-4 mr-1" />
                          {isGoogleUser ? "Ajouter" : "Modifier"}
                        </Button>
                      )}
                    </div>

                    {isGoogleUser && !showPasswordSection && (
                      <p className="text-sm text-muted-foreground">
                        Vous êtes connecté via Google. Ajoutez un mot de passe pour pouvoir vous connecter aussi par
                        email.
                      </p>
                    )}

                    {showPasswordSection && (
                      <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showNewPassword ? "text" : "password"}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Minimum 6 caractères"
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              aria-label={showNewPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                            >
                              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Confirmez votre mot de passe"
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={handleUpdatePassword}
                            disabled={passwordLoading || newPassword.length < 6 || newPassword !== confirmPassword}
                          >
                            {passwordLoading
                              ? "Mise à jour..."
                              : isGoogleUser
                                ? "Ajouter le mot de passe"
                                : "Mettre à jour"}
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setShowPasswordSection(false);
                              setNewPassword("");
                              setConfirmPassword("");
                            }}
                          >
                            Annuler
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pack Details Section */}
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Crown className="w-5 h-5 text-primary" />
                    Mon pack
                  </h3>

                  {hasFullAccess && packType ? (
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="pt-4 space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1">
                            {packLabels[packType] || packType}
                          </Badge>
                          {expiresAt ? (
                            isExpired ? (
                              <Badge variant="destructive" className="flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Expiré
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Expire le {expiresAt.toLocaleDateString("fr-FR")}
                              </Badge>
                            )
                          ) : (
                            <Badge
                              variant="secondary"
                              className="flex items-center gap-1 bg-success/20 text-success border-success/30"
                            >
                              <CheckCircle className="w-3 h-3" />
                              Accès à vie
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-foreground">Fonctionnalités incluses :</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {packDescriptions[packType]?.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {isExpired && (
                          <Button onClick={() => navigate("/")} className="w-full">
                            Prolonger mon accès
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="bg-muted/50 border-muted">
                      <CardContent className="pt-4 space-y-4">
                        <div className="text-center">
                          <p className="text-muted-foreground mb-2">Vous n'avez pas encore de pack actif.</p>
                          <p className="text-sm text-muted-foreground">
                            Profitez de 2 essais gratuits par fonctionnalité, puis débloquez l'accès complet avec un
                            paiement unique.
                          </p>
                        </div>
                        <Button onClick={() => setShowPaymentGate(true)} className="w-full">
                          Découvrir les offres
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="space-y-3 pt-4 border-t">
                  <Button onClick={() => navigate("/results")} variant="default" className="w-full">
                    Consulter mes résultats
                  </Button>

                  <Button onClick={() => navigate("/notifications")} variant="outline" className="w-full">
                    <Bell className="w-4 h-4 mr-2" />
                    Centre de messages
                  </Button>
                </div>

                <Button onClick={handleSignOut} variant="destructive" className="w-full">
                  {t("account.signOut")}
                </Button>

                {/* Disable Account Section */}
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Zone de danger</h3>
                  <Button
                    onClick={() => setShowDisableConfirm(true)}
                    variant="outline"
                    className="w-full text-destructive border-destructive/50 hover:bg-destructive/10"
                  >
                    Désactiver mon compte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Gate Popup */}
      {showPaymentGate && (
        <PaymentGate onClose={() => setShowPaymentGate(false)} isClosable={true} redirectOnClose="/account" />
      )}

      {/* Upgrade for Nickname Popup */}
      {showUpgradeForNickname && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md animate-in fade-in-0 zoom-in-95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                Limite atteinte
              </CardTitle>
              <CardDescription>Vous avez utilisé vos {maxFreeEdits} modifications de pseudo gratuites.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Passez au <strong>Pack Réussite</strong> ou supérieur pour modifier votre pseudo de façon illimitée et
                profiter de nombreuses autres fonctionnalités !
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setShowUpgradeForNickname(false);
                    setShowPaymentGate(true);
                  }}
                  className="flex-1"
                >
                  Voir les offres
                </Button>
                <Button variant="ghost" onClick={() => setShowUpgradeForNickname(false)}>
                  Plus tard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Disable Account Confirmation Dialog */}
      <AlertDialog open={showDisableConfirm} onOpenChange={setShowDisableConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <UserX className="w-5 h-5 text-destructive" />
              Désactiver votre compte ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Cette action va vous déconnecter et effacer vos données locales. Vous pourrez vous reconnecter à tout
              moment pour réactiver votre compte. Vos données (résultats de quiz, achats) resteront sauvegardées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDisableAccount}
              disabled={disabling}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {disabling ? "Désactivation..." : "Oui, désactiver"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
};

export default Account;
