import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { vocabularyB2, VocabularyWord } from "@/data/vocabulary-b2";
import { BookOpen } from "lucide-react";

interface VocabularyTooltipProps {
  text: string;
  className?: string;
}

// Fonction pour créer une regex sécurisée
const escapeRegex = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const VocabularyTooltip: React.FC<VocabularyTooltipProps> = ({
  text,
  className = "",
}) => {
  // Trouver tous les mots du vocabulaire présents dans le texte
  const wordsToHighlight: { word: string; data: VocabularyWord; startIndex: number }[] = [];
  const lowerText = text.toLowerCase();

  Object.entries(vocabularyB2).forEach(([key, data]) => {
    const regex = new RegExp(`\\b${escapeRegex(key)}\\b`, 'gi');
    let match;
    while ((match = regex.exec(lowerText)) !== null) {
      wordsToHighlight.push({
        word: text.substring(match.index, match.index + key.length),
        data,
        startIndex: match.index,
      });
    }
  });

  // Trier par position pour traiter dans l'ordre
  wordsToHighlight.sort((a, b) => a.startIndex - b.startIndex);

  // Si aucun mot à surligner, retourner le texte simple
  if (wordsToHighlight.length === 0) {
    return <span className={className}>{text}</span>;
  }

  // Construire le texte avec les tooltips
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  wordsToHighlight.forEach((item, idx) => {
    // Ajouter le texte avant le mot
    if (item.startIndex > lastIndex) {
      elements.push(
        <span key={`text-${idx}`}>{text.substring(lastIndex, item.startIndex)}</span>
      );
    }

    // Ajouter le mot avec tooltip
    elements.push(
      <Tooltip key={`tooltip-${idx}`}>
        <TooltipTrigger asChild>
          <span className="underline decoration-dotted decoration-primary/50 underline-offset-2 cursor-help text-primary hover:text-primary-hover transition-colors">
            {item.word}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-xs p-3 bg-popover border border-border shadow-lg z-[100]"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-semibold text-primary">
              <BookOpen className="w-4 h-4" />
              {item.data.word}
            </div>
            <p className="text-sm text-popover-foreground">{item.data.definition}</p>
            {item.data.example && (
              <p className="text-xs text-muted-foreground italic mt-1">
                Ex: {item.data.example}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    );

    lastIndex = item.startIndex + item.word.length;
  });

  // Ajouter le texte restant
  if (lastIndex < text.length) {
    elements.push(
      <span key="text-end">{text.substring(lastIndex)}</span>
    );
  }

  return <span className={className}>{elements}</span>;
};

// Composant simplifié pour afficher un seul mot avec tooltip
interface SingleWordTooltipProps {
  word: string;
  children: React.ReactNode;
}

export const SingleWordTooltip: React.FC<SingleWordTooltipProps> = ({
  word,
  children,
}) => {
  const data = vocabularyB2[word.toLowerCase()];

  if (!data) {
    return <>{children}</>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="underline decoration-dotted decoration-primary/50 underline-offset-2 cursor-help">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent 
        side="top" 
        className="max-w-xs p-3 bg-popover border border-border shadow-lg z-[100]"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <BookOpen className="w-4 h-4" />
            {data.word}
          </div>
          <p className="text-sm text-popover-foreground">{data.definition}</p>
          {data.example && (
            <p className="text-xs text-muted-foreground italic mt-1">
              Ex: {data.example}
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default VocabularyTooltip;
