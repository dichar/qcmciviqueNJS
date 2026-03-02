import { useState } from "react";
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard, AdminCardHeader } from '@/components/admin/AdminCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Globe, CheckCircle2, Send, FileText, ExternalLink } from "lucide-react";

interface IndexResult {
  success: boolean;
  totalUrls?: number;
  timestamp: Date;
}

export default function AdminIndexNow() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<IndexResult[]>([]);
  const [customUrls, setCustomUrls] = useState('');

  const handleIndexNow = async (useCustomUrls: boolean = false) => {
    setLoading(true);

    try {
      const body: { fetchFromSitemap?: boolean; urls?: string[] } = {};
      
      if (useCustomUrls && customUrls.trim()) {
        body.urls = customUrls
          .split('\n')
          .map(url => url.trim())
          .filter(url => url.length > 0);
      } else {
        body.fetchFromSitemap = true;
      }

      const { data, error } = await supabase.functions.invoke("notify-indexnow", {
        body,
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        const result: IndexResult = {
          success: true,
          totalUrls: data.totalUrls,
          timestamp: new Date(),
        };
        setResults(prev => [result, ...prev.slice(0, 9)]);
        toast.success(`IndexNow: ${data.totalUrls} URLs soumises à Bing et Yandex`);
        setCustomUrls('');
      } else {
        toast.error(data?.message || "Erreur lors de l'indexation");
      }
    } catch (error) {
      console.error("IndexNow error:", error);
      toast.error("Erreur lors de la notification IndexNow");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminPageHeader
          title="Forcer l'indexation"
          description="Notification IndexNow pour Bing, Yandex et les moteurs IA"
        />

        {/* Quick Index from Sitemap */}
        <AdminCard>
          <AdminCardHeader
            title="Indexation depuis le Sitemap"
            description="Soumet automatiquement toutes les URLs du sitemap.xml aux moteurs de recherche"
            icon={
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
            }
          />
          <div className="mt-6">
            <Button
              onClick={() => handleIndexNow(false)}
              disabled={loading}
              className="gap-2"
              size="lg"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Indexer toutes les pages
            </Button>
          </div>
        </AdminCard>

        {/* Custom URLs */}
        <AdminCard>
          <AdminCardHeader
            title="Indexation URLs personnalisées"
            description="Soumettez des URLs spécifiques (une par ligne)"
            icon={
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
            }
          />
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">URLs à indexer</Label>
              <Textarea
                placeholder="https://qcmcivique.fr/blog/mon-nouvel-article
https://qcmcivique.fr/autre-page"
                value={customUrls}
                onChange={(e) => setCustomUrls(e.target.value)}
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 min-h-[120px]"
              />
              <p className="text-xs text-slate-500">Entrez une URL par ligne</p>
            </div>
            <Button
              onClick={() => handleIndexNow(true)}
              disabled={loading || !customUrls.trim()}
              variant="outline"
              className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Indexer ces URLs
            </Button>
          </div>
        </AdminCard>

        {/* Recent Results */}
        {results.length > 0 && (
          <AdminCard>
            <AdminCardHeader
              title="Historique des indexations"
              description="Résultats des dernières soumissions"
              icon={
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
              }
            />
            <div className="mt-6 space-y-3">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span className="text-slate-300">
                      {result.totalUrls} URLs soumises
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {result.timestamp.toLocaleString('fr-FR')}
                  </span>
                </div>
              ))}
            </div>
          </AdminCard>
        )}

        {/* Info */}
        <AdminCard>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0">
              <ExternalLink className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">À propos d'IndexNow</h3>
              <p className="text-sm text-slate-400 mb-3">
                IndexNow est un protocole qui permet de notifier instantanément les moteurs de recherche 
                (Bing, Yandex) et les moteurs d'IA (Copilot, ChatGPT) des nouvelles pages ou mises à jour.
              </p>
              <a 
                href="https://www.indexnow.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                En savoir plus sur IndexNow
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </AdminCard>
      </div>
    </AdminLayout>
  );
}
