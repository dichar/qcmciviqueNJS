import { useState, useEffect, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShareButtons } from "@/components/ShareButtons";
import { TextToSpeech } from "@/components/TextToSpeech";
import { RecentArticles } from "@/components/blog/RecentArticles";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { LastUpdatedBadge } from "@/components/seo/LastUpdatedBadge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Clock, User } from "lucide-react";
import DOMPurify from "dompurify";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  category: string;
  read_time: string;
  author: string;
  featured_image: string | null;
  featured_image_alt: string | null;
  published_at: string | null;
  updated_at: string;
  status: string;
}

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug)
          .eq("status", "published")
          .single();

        if (error || !data) {
          setNotFound(true);
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const sanitizedContent = useMemo(
    () => post ? DOMPurify.sanitize(post.content, { USE_PROFILES: { html: true } }) : "",
    [post?.content],
  );

  const plainTextContent = sanitizedContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  // Redirect to blog if post not found
  if (notFound) {
    return <Navigate to="/blog" replace />;
  }

  // Loading state
  if (loading) {
    return (
      <UnifiedLayout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </UnifiedLayout>
    );
  }

  if (!post) return null;

  return (
    <UnifiedLayout>
      <SEO
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        canonical={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.published_at || undefined}
        modifiedTime={post.updated_at}
      />
      
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        datePublished={post.published_at || post.updated_at}
        dateModified={post.updated_at}
        author={post.author}
        image={post.featured_image || undefined}
        url={`https://qcmcivique.fr/blog/${post.slug}`}
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                {post.category}
              </span>
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" /> {post.read_time}
              </span>
              {post.published_at && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <time
                    dateTime={post.published_at}
                    className="text-muted-foreground text-sm"
                  >
                    {formatDate(post.published_at)}
                  </time>
                </>
              )}
            </div>
            <TextToSpeech
              text={plainTextContent}
              variant="outline"
              size="sm"
              showLabel
            />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{post.excerpt}</p>
          
          <div className="flex items-center justify-between flex-wrap gap-2 text-sm text-muted-foreground pb-4 border-b">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <LastUpdatedBadge date={post.updated_at} />
          </div>
        </header>

        {post.featured_image && (
          <figure className="mb-8">
            <img
              src={post.featured_image}
              alt={post.featured_image_alt || post.title}
              className="w-full rounded-lg shadow-lg"
              loading="lazy"
            />
          </figure>
        )}

        <section
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Préparez l'examen civique</h2>
          <p className="text-muted-foreground mb-6">
            Entraînez-vous avec notre QCM de 40 questions en conditions réelles.
          </p>
          <Button asChild size="lg">
            <Link to="/qcm-citoyennete-francaise">Lancer un essai gratuit</Link>
          </Button>
        </div>

        <div className="flex justify-center mb-8">
          <ShareButtons
            title={post.title}
            description={post.excerpt}
            compact={false}
          />
        </div>

        <RecentArticles 
          currentSlug={post.slug} 
          limit={5} 
          title="À lire aussi"
        />
      </article>
    </UnifiedLayout>
  );
}
