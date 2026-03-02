import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  read_time: string;
  category: string;
}

interface RecentArticlesProps {
  currentSlug?: string; // Exclude current article from list
  limit?: number;
  title?: string;
  showCategory?: boolean;
}

/**
 * RecentArticles component for SEO internal linking
 * Displays latest blog articles at the bottom of blog/silo pages
 * Helps Google discover and crawl all pages
 */
export function RecentArticles({ 
  currentSlug, 
  limit = 5, 
  title = "Articles récents",
  showCategory = true
}: RecentArticlesProps) {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let query = supabase
          .from("blog_posts")
          .select("id, slug, title, excerpt, read_time, category")
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(limit + 1); // Fetch one extra in case we need to exclude current

        const { data, error } = await query;

        if (error) throw error;

        // Filter out current article if provided
        let filtered = data || [];
        if (currentSlug) {
          filtered = filtered.filter(a => a.slug !== currentSlug);
        }

        // Ensure we only show the requested limit
        setArticles(filtered.slice(0, limit));
      } catch (error) {
        console.error("Error fetching recent articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentSlug, limit]);

  if (loading) {
    return (
      <section className="mt-12 pt-8 border-t">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          {title}
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  if (articles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        {title}
      </h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link 
            key={article.id} 
            to={`/blog/${article.slug}`}
            className="block group"
          >
            <Card className="p-4 hover:shadow-medium transition-all duration-200 hover:border-primary/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {showCategory && (
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.read_time}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
      
      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 mt-4 text-primary hover:underline text-sm font-medium"
      >
        Voir tous les articles
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}

export default RecentArticles;
