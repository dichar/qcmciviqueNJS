"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, HelpCircle, Mic, MessageCircleQuestion, CheckCircle, Lock } from "lucide-react";
import { LivretLire } from "@/components/livret/LivretLire";
import { LivretQuiz } from "@/components/livret/LivretQuiz";
import { LivretEntretien } from "@/components/livret/LivretEntretien";
import { LivretFAQ } from "@/components/livret/LivretFAQ";
import { PaymentGate } from "@/components/PaymentGate";
import { usePurchaseStatus, hasFeatureAccess } from "@/hooks/usePurchaseStatus";
import { SEO } from "@/components/SEO";
import livretDataRaw from "@/data/livret-data.json";
import type { LivretData } from "@/types/livret";

const livretData = livretDataRaw as LivretData;

type TabType = "lire" | "quiz" | "entretien" | "faq";

const FREE_LIVRET_QUIZ_ALLOWED = 2;
const FREE_ENTRETIEN_ALLOWED = 2;
const LIVRET_QUIZ_COUNT_KEY = 'qcmcivique_livret_quiz_count';
const ENTRETIEN_COUNT_KEY = 'qcmcivique_entretien_count';

const LivretCitoyen = () => {
  const { packType, hasFullAccess, loading } = usePurchaseStatus();
  const [activeTab, setActiveTab] = useState<TabType>("lire");
  const [currentPage, setCurrentPage] = useState(0);
  const [quizStats, setQuizStats] = useState({ correct: 0, total: 0 });
  const [interviewCompleted, setInterviewCompleted] = useState(0);
  const [showPaymentGate, setShowPaymentGate] = useState(false);
  const [blockedFeature, setBlockedFeature] = useState<string | null>(null);

  const [livretQuizUsed, setLivretQuizUsed] = useState(0);
  const [entretienUsed, setEntretienUsed] = useState(0);

  // Load usage counts from localStorage on client
  useEffect(() => {
    if (typeof window === "undefined") return;
    const quizCount = parseInt(localStorage.getItem(LIVRET_QUIZ_COUNT_KEY) || "0", 10);
    const entretienCount = parseInt(localStorage.getItem(ENTRETIEN_COUNT_KEY) || "0", 10);
    setLivretQuizUsed(Number.isNaN(quizCount) ? 0 : quizCount);
    setEntretienUsed(Number.isNaN(entretienCount) ? 0 : entretienCount);
  }, []);

  const tabs = [
    { id: "lire" as TabType, label: "📖 Lire", icon: BookOpen },
    { id: "quiz" as TabType, label: "❓ Quiz", icon: HelpCircle },
    { id: "entretien" as TabType, label: "🎤 Entretien", icon: Mic },
    { id: "faq" as TabType, label: "❔ FAQ", icon: MessageCircleQuestion },
  ];

  // Check if user has access to Livret Quiz (REUSSITE or PREMIUM_PLUS)
  const canAccessLivretQuiz = hasFullAccess && hasFeatureAccess(packType, 'livret');
  
  // Check if user has access to Entretien (PREMIUM_PLUS only)
  const canAccessEntretien = hasFullAccess && hasFeatureAccess(packType, 'entretien');

  // Check if should show paywall for livret quiz
  const shouldBlockLivretQuiz = !canAccessLivretQuiz && livretQuizUsed >= FREE_LIVRET_QUIZ_ALLOWED;
  
  // Check if should show paywall for entretien
  const shouldBlockEntretien = !canAccessEntretien && entretienUsed >= FREE_ENTRETIEN_ALLOWED;

  const handleQuizComplete = () => {
    // Increment usage counter for non-paying users after completing a quiz session
    if (!canAccessLivretQuiz) {
      const newCount = livretQuizUsed + 1;
      setLivretQuizUsed(newCount);
      if (typeof window !== "undefined") {
        localStorage.setItem(LIVRET_QUIZ_COUNT_KEY, newCount.toString());
      }
      
      // Show paywall if they've used all free tries
      if (newCount >= FREE_LIVRET_QUIZ_ALLOWED) {
        setBlockedFeature("Livret Quiz");
        setShowPaymentGate(true);
      }
    }
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    setQuizStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const handleInterviewComplete = () => {
    setInterviewCompleted(prev => Math.min(prev + 1, 10));
    
    // Increment usage counter for non-paying users
    if (!canAccessEntretien) {
      const newCount = entretienUsed + 1;
      setEntretienUsed(newCount);
      if (typeof window !== "undefined") {
        localStorage.setItem(ENTRETIEN_COUNT_KEY, newCount.toString());
      }
      
      // Show paywall if they've used all free tries
      if (newCount >= FREE_ENTRETIEN_ALLOWED) {
        setBlockedFeature("Simulation d'entretien");
        setShowPaymentGate(true);
      }
    }
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === "quiz" && shouldBlockLivretQuiz) {
      setBlockedFeature("Livret Quiz");
      setShowPaymentGate(true);
      return;
    }
    if (tab === "entretien" && shouldBlockEntretien) {
      setBlockedFeature("Simulation d'entretien");
      setShowPaymentGate(true);
      return;
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Livret du Citoyen Interactif – Préparation naturalisation"
        description="Révisez le livret officiel du citoyen page par page. Quiz, simulation d'entretien et FAQ pour réussir l'examen civique français."
        canonical="/livret-citoyen"
      />
      <Navigation />
      
      {/* Payment Gate Modal */}
      {showPaymentGate && (
        <PaymentGate 
          onClose={() => setShowPaymentGate(false)}
          isClosable={true}
          redirectOnClose="/"
        />
      )}
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            📚 Livret du Citoyen Interactif
          </h1>
          <p className="text-muted-foreground text-lg">
            Maîtrisez le livret officiel page par page
          </p>
        </div>

        {/* Stats Bar */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium">Quiz :</span>
                <span className="text-primary font-bold">
                  {quizStats.correct}/{quizStats.total} bonnes réponses
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-primary" />
                <span className="font-medium">Entretien simulé :</span>
                <span className="text-primary font-bold">
                  {interviewCompleted}/10 questions complétées
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {tabs.map((tab) => {
            const isQuizBlocked = tab.id === "quiz" && shouldBlockLivretQuiz;
            const isEntretienBlocked = tab.id === "entretien" && shouldBlockEntretien;
            const isBlocked = isQuizBlocked || isEntretienBlocked;
            
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => handleTabChange(tab.id)}
                className="gap-2"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {isBlocked && <Lock className="w-3 h-3 ml-1" />}
              </Button>
            );
          })}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "lire" && (
            <LivretLire
              sections={livretData.sections}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          {activeTab === "quiz" && (
            <LivretQuiz
              sections={livretData.sections}
              currentPage={currentPage}
              onAnswer={handleQuizAnswer}
              onQuizComplete={handleQuizComplete}
            />
          )}
          {activeTab === "entretien" && (
            <LivretEntretien
              questions={livretData.interviewQuestions}
              onComplete={handleInterviewComplete}
            />
          )}
          {activeTab === "faq" && (
            <LivretFAQ faq={livretData.faq} />
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-8">
              <h3 className="text-xl font-bold text-foreground mb-3">
                🎯 Prêt à tester vos connaissances ?
              </h3>
              <p className="text-muted-foreground mb-4">
                Passez le QCM complet pour évaluer votre niveau
              </p>
              <Button asChild size="lg">
                <Link to="/qcm-citoyennete-francaise">
                  Commencer le QCM
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LivretCitoyen;
