import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import type { FAQItem } from "@/types/livret";

interface LivretFAQProps {
  faq: FAQItem[];
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

export const LivretFAQ: React.FC<LivretFAQProps> = ({ faq }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <HelpCircle className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">
          ❔ FAQ - Questions Fréquemment Posées
        </h2>
      </div>

      <p className="text-muted-foreground">
        Les 10 questions les plus importantes pour préparer votre entretien de naturalisation.
      </p>

      {/* FAQ Accordion */}
      <Card>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <AccordionItem key={item.id} value={`item-${item.id}`}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-start gap-3 pr-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <div className="flex flex-col items-start gap-2">
                      <Badge className={`${themeColors[item.theme]} text-xs`}>
                        {themeLabels[item.theme]}
                      </Badge>
                      <span className="font-medium text-foreground">
                        {item.question}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-11 pt-2">
                    <Card className="bg-muted/50 border-muted">
                      <CardContent className="py-4">
                        <p className="text-foreground leading-relaxed">
                          {item.reponse}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};
