import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, BookOpen, Lightbulb, CheckCircle, Target, Mic } from "lucide-react";
import type { Section } from "@/types/livret";
import { TextToSpeech } from "@/components/TextToSpeech";

interface LivretLireProps {
  sections: Section[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const themeColors: Record<string, string> = {
  valeurs: "bg-primary text-primary-foreground",
  institutions: "bg-accent text-accent-foreground",
  histoire: "bg-success text-success-foreground",
  ue: "bg-muted-foreground text-background",
};

const themeLabels: Record<string, string> = {
  valeurs: "Valeurs",
  institutions: "Institutions",
  histoire: "Histoire",
  ue: "Union Européenne",
};

export const LivretLire: React.FC<LivretLireProps> = ({
  sections,
  currentPage,
  setCurrentPage,
}) => {
  const section = sections[currentPage];
  const totalPages = sections.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Badge className={themeColors[section.theme]}>
            {themeLabels[section.theme]}
          </Badge>
          <span className="text-muted-foreground font-medium">
            Page {currentPage + 1} / {totalPages}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          {section.titre}
        </h2>
      </div>

      {/* Carte 1: Contenu Original */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="w-5 h-5 text-primary" />
              📖 Contenu Original du Livret
            </CardTitle>
            <TextToSpeech 
              text={section.contenuOriginal}
              variant="outline"
              size="sm"
              showLabel
            />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed whitespace-pre-line">
            {section.contenuOriginal}
          </p>
        </CardContent>
      </Card>

      {/* Carte 2: Explication Détaillée */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="w-5 h-5 text-primary" />
            💡 Explication Détaillée
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">
            {section.explication}
          </p>
        </CardContent>
      </Card>

      {/* Carte 3: Version Simplifiée */}
      <Card className="bg-success/5 border-success/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle className="w-5 h-5 text-success" />
            ✅ Version Simplifiée
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">
            {section.simplification}
          </p>
        </CardContent>
      </Card>

      {/* Carte 4: Exemple Concret */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-primary" />
            🎯 Exemple Concret
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed whitespace-pre-line">
            {section.exempleConcret}
          </p>
        </CardContent>
      </Card>

      {/* Carte 5: Questions Possibles à l'Entretien */}
      <Card className="bg-accent/5 border-accent/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Mic className="w-5 h-5 text-accent" />
            🎤 Questions Possibles à l'Entretien
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {section.questionsEntretien.map((question, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary font-bold">{index + 1}.</span>
                <span className="text-foreground">{question}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </Button>
        
        <span className="font-medium text-muted-foreground">
          Page {currentPage + 1} / {totalPages}
        </span>
        
        <Button
          variant="outline"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="gap-2"
        >
          Suivant
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
