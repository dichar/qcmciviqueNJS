"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Facebook, Share2 } from "lucide-react";

interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  compact?: boolean;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title = "QCM Civique - Préparation à l'examen civique",
  description = "Préparez-vous à l'examen civique français avec QCM Civique !",
  compact = false
}) => {
  const resolvedUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(resolvedUrl);
  const encodedText = encodeURIComponent(`${title}\n${description}\n${resolvedUrl}`);

  const whatsappUrl = `https://wa.me/?text=${encodedText}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  const handleShare = (shareUrl: string) => {
    if (typeof window === "undefined") return;
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  if (compact) {
    return (
      <div className="flex gap-2">
        <Button 
          size="sm"
          variant="outline"
          className="text-[#25D366] border-[#25D366]/30 hover:bg-[#25D366]/10"
          onClick={() => handleShare(whatsappUrl)}
          title="Partager sur WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </Button>
        <Button 
          size="sm"
          variant="outline"
          className="text-[#1877F2] border-[#1877F2]/30 hover:bg-[#1877F2]/10"
          onClick={() => handleShare(facebookUrl)}
          title="Partager sur Facebook"
        >
          <Facebook className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
        <Share2 className="w-4 h-4" />
        Partager cette page
      </p>
      <div className="flex flex-wrap gap-2">
        <Button 
          size="sm"
          className="bg-[#25D366] hover:bg-[#20BD5A] text-white"
          onClick={() => handleShare(whatsappUrl)}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </Button>
        <Button 
          size="sm"
          className="bg-[#1877F2] hover:bg-[#166FE5] text-white"
          onClick={() => handleShare(facebookUrl)}
        >
          <Facebook className="w-4 h-4 mr-2" />
          Facebook
        </Button>
      </div>
    </div>
  );
};
