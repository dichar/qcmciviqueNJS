import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2, XCircle, PartyPopper } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Navigation } from '@/components/Navigation';

type VerificationStatus = 'loading' | 'success' | 'error' | 'no-session';

const QuizUnlocked = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyPayment = async () => {
      const success = searchParams.get('success');
      let sessionId = searchParams.get('session_id');

      if (success !== '1' || !sessionId) {
        setStatus('no-session');
        return;
      }

      // Clean session ID - remove curly braces if present (Stripe template issue)
      sessionId = sessionId.replace(/^\{|\}$/g, '');

      try {
        // Get current user
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          // User not logged in - store session ID and redirect to auth
          localStorage.setItem('pending_stripe_session', sessionId);
          navigate('/auth?redirect=/quiz-complet-debloque&pending_payment=1');
          return;
        }

        // Verify payment with edge function
        const { data, error } = await supabase.functions.invoke('verify-stripe-payment', {
          body: { sessionId, userId: session.user.id }
        });

        if (error) {
          console.error('Verification error:', error);
          setErrorMessage(error.message || 'Erreur lors de la vérification');
          setStatus('error');
          return;
        }

        if (data?.success) {
          // Purchase is already recorded in database by edge function
          setStatus('success');
        } else {
          setErrorMessage(data?.error || 'Paiement non vérifié');
          setStatus('error');
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setErrorMessage('Une erreur est survenue');
        setStatus('error');
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  // Check for pending payment after auth redirect
  useEffect(() => {
    const checkPendingPayment = async () => {
      let pendingSession = localStorage.getItem('pending_stripe_session');
      if (pendingSession && status === 'no-session') {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          localStorage.removeItem('pending_stripe_session');
          // Clean session ID
          pendingSession = pendingSession.replace(/^\{|\}$/g, '');
          // Re-verify with the pending session
          const { data, error } = await supabase.functions.invoke('verify-stripe-payment', {
            body: { sessionId: pendingSession, userId: session.user.id }
          });

          if (data?.success) {
            // Purchase is already recorded in database by edge function
            setStatus('success');
          }
        }
      }
    };

    checkPendingPayment();
  }, [status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {status === 'loading' && (
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <Loader2 className="h-12 w-12 text-primary animate-spin" />
                </div>
                <CardTitle>Vérification du paiement...</CardTitle>
                <CardDescription>
                  Merci de patienter pendant que nous vérifions votre paiement.
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {status === 'success' && (
            <Card className="text-center border-green-500/20">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-green-500/10 rounded-full w-fit">
                  <PartyPopper className="h-12 w-12 text-green-500" />
                </div>
                <CardTitle className="text-green-600">Paiement réussi !</CardTitle>
                <CardDescription className="text-base">
                  Félicitations ! Vous avez maintenant accès à tous les quiz de préparation au QCM civique.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 space-y-2">
                  <p className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Accès illimité aux quiz
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Suivi de progression activé
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Mode révision intelligente
                  </p>
                </div>

                <Button 
                  onClick={() => navigate('/quiz')}
                  size="lg"
                  className="w-full"
                >
                  Commencer le Quiz Complet
                </Button>

                <Button 
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="w-full"
                >
                  Retour à l'accueil
                </Button>
              </CardContent>
            </Card>
          )}

          {status === 'error' && (
            <Card className="text-center border-destructive/20">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full w-fit">
                  <XCircle className="h-12 w-12 text-destructive" />
                </div>
                <CardTitle className="text-destructive">Erreur de vérification</CardTitle>
                <CardDescription className="text-base">
                  {errorMessage || 'Nous n\'avons pas pu vérifier votre paiement.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Si vous avez été débité, veuillez nous contacter avec votre numéro de transaction.
                </p>
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="w-full"
                >
                  Retour à l'accueil
                </Button>
              </CardContent>
            </Card>
          )}

          {status === 'no-session' && (
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Page de confirmation</CardTitle>
                <CardDescription>
                  Cette page est destinée à confirmer votre achat après le paiement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate('/')}
                  className="w-full"
                >
                  Retour à l'accueil
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizUnlocked;
