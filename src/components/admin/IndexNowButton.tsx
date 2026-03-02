import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Globe, CheckCircle2 } from "lucide-react";

export const IndexNowButton = () => {
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState<{
    success: boolean;
    totalUrls?: number;
  } | null>(null);

  const handleIndexNow = async () => {
    setLoading(true);
    setLastResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("notify-indexnow", {
        body: { fetchFromSitemap: true },
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        setLastResult({ success: true, totalUrls: data.totalUrls });
        toast.success(`IndexNow: ${data.totalUrls} URLs soumises à Bing et Yandex`);
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
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={handleIndexNow}
        disabled={loading}
        className="gap-2"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Globe className="h-4 w-4" />
        )}
        Forcer l'indexation
      </Button>
      {lastResult?.success && (
        <span className="flex items-center gap-1 text-xs text-green-500 dark:text-green-400">
          <CheckCircle2 className="h-3 w-3" />
          {lastResult.totalUrls} URLs
        </span>
      )}
    </div>
  );
};
