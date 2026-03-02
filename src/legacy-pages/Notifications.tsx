import React from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { UserMessaging } from "@/components/messaging/UserMessaging";

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <SEO 
        title="Mes demandes – QCM Civique"
        description="Consultez vos demandes et contactez le support QCM Civique."
        canonical="/notifications"
        noIndex={true}
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <UserMessaging />
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/account')}
              className="w-full mt-4"
            >
              Retour à mon compte
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Notifications;
