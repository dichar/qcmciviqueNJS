import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TiptapEditor, DEFAULT_BLOG_TEMPLATE } from '@/components/admin/TiptapEditor';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Loader2,
  Image as ImageIcon,
  Search,
  Settings,
  FileText,
  ExternalLink,
} from 'lucide-react';

interface BlogPostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_title: string;
  meta_description: string;
  category: string;
  read_time: string;
  author: string;
  featured_image: string;
  featured_image_alt: string;
  status: string;
}

const CATEGORIES = [
  'Guide Complet',
  'Examen Civique',
  'Procédure',
  'Titre de Séjour',
  'Entretien',
  'Langue',
  'Intégration',
  'Conseils',
  'Actualité',
  'Culture',
  'Citoyenneté',
  'Recours',
  'Tutoriel',
  'Révision',
  'Mobilité',
  'Comparatif',
  'Référentiel',
  'Cas Particuliers',
  'Apprentissage',
];

const defaultFormData: BlogPostForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  meta_title: '',
  meta_description: '',
  category: 'Actualité',
  read_time: '5 min',
  author: 'QCM Civique',
  featured_image: '',
  featured_image_alt: '',
  status: 'draft',
};

export default function AdminBlogEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState<BlogPostForm>(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load existing post if editing
  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (postId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) throw error;
      
      if (data) {
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          meta_title: data.meta_title || '',
          meta_description: data.meta_description || '',
          category: data.category || 'Actualité',
          read_time: data.read_time || '5 min',
          author: data.author || 'QCM Civique',
          featured_image: data.featured_image || '',
          featured_image_alt: data.featured_image_alt || '',
          status: data.status || 'draft',
        });
      }
    } catch (error) {
      console.error('Error loading post:', error);
      toast.error('Erreur lors du chargement de l\'article');
      navigate('/gestion-qcmcivique-admin/blog');
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Handle form field changes
  const handleChange = (field: keyof BlogPostForm, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-generate slug if title changes and slug is empty or auto-generated
      if (field === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title))) {
        newData.slug = generateSlug(value);
      }
      
      // Auto-fill meta_title if empty
      if (field === 'title' && !prev.meta_title) {
        newData.meta_title = value.length > 60 ? value.substring(0, 57) + '...' : value;
      }
      
      // Auto-fill meta_description if empty
      if (field === 'excerpt' && !prev.meta_description) {
        newData.meta_description = value.length > 160 ? value.substring(0, 157) + '...' : value;
      }
      
      return newData;
    });
  };

  // Calculate read time from content
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${Math.max(1, minutes)} min`;
  };

  // Insert default template
  const handleInsertTemplate = () => {
    handleChange('content', DEFAULT_BLOG_TEMPLATE);
  };

  // Save post
  const handleSave = async (publishNow = false) => {
    if (!formData.title.trim()) {
      toast.error('Le titre est obligatoire');
      return;
    }
    if (!formData.slug.trim()) {
      toast.error('Le slug est obligatoire');
      return;
    }
    if (!formData.excerpt.trim()) {
      toast.error('L\'extrait est obligatoire');
      return;
    }
    if (!formData.content.trim()) {
      toast.error('Le contenu est obligatoire');
      return;
    }

    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      const postData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        meta_title: formData.meta_title.trim() || formData.title.trim(),
        meta_description: formData.meta_description.trim() || formData.excerpt.trim(),
        category: formData.category,
        read_time: calculateReadTime(formData.content),
        author: formData.author.trim(),
        featured_image: formData.featured_image.trim() || null,
        featured_image_alt: formData.featured_image_alt.trim() || null,
        status: publishNow ? 'published' : formData.status,
        published_at: publishNow ? new Date().toISOString() : null,
        updated_by: userId,
      };

      let error;

      if (isEditing && id) {
        const result = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);
        error = result.error;
      } else {
        const result = await supabase
          .from('blog_posts')
          .insert({ ...postData, created_by: userId });
        error = result.error;
      }

      if (error) throw error;

      toast.success(isEditing ? 'Article mis à jour !' : 'Article créé !');
      navigate('/gestion-qcmcivique-admin/blog');
    } catch (error: any) {
      console.error('Error saving post:', error);
      if (error.code === '23505') {
        toast.error('Ce slug existe déjà. Choisissez un slug unique.');
      } else {
        toast.error('Erreur lors de l\'enregistrement');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="h-full flex flex-col">
        {/* Fixed Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/gestion-qcmcivique-admin/blog')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {isEditing ? 'Modifier l\'article' : 'Nouvel article'}
              </h1>
              {formData.slug && (
                <a 
                  href={`/blog/${formData.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground text-sm hover:text-primary flex items-center gap-1"
                >
                  /blog/{formData.slug}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled={saving} onClick={() => handleSave(false)}>
              <Save className="w-4 h-4 mr-2" />
              Enregistrer
            </Button>
            <Button disabled={saving} onClick={() => handleSave(true)}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
              Publier
            </Button>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 min-h-0">
          {/* Main Content - Editor */}
          <div className="flex flex-col min-h-0 order-2 xl:order-1">
            <Card className="flex-1 flex flex-col min-h-0">
              <CardHeader className="pb-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Contenu de l'article</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col min-h-0 pb-4">
                {/* Title Input */}
                <div className="space-y-2 mb-4 flex-shrink-0">
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Titre de l'article..."
                    className="text-xl font-semibold h-12 border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>

                {/* Excerpt */}
                <div className="space-y-2 mb-4 flex-shrink-0">
                  <Label className="text-sm text-muted-foreground">Extrait / Résumé</Label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => handleChange('excerpt', e.target.value)}
                    placeholder="Résumé court pour la liste du blog et les réseaux sociaux..."
                    rows={2}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">{formData.excerpt.length}/200 caractères</p>
                </div>

                {/* Tiptap Editor */}
                <div className="flex-1 min-h-[500px]">
                  <TiptapEditor
                    content={formData.content}
                    onChange={(content) => handleChange('content', content)}
                    showTemplateButton={!isEditing && !formData.content}
                    onInsertTemplate={handleInsertTemplate}
                    className="h-full"
                  />
                </div>
                
                {/* Word count */}
                <p className="text-xs text-muted-foreground mt-3 flex-shrink-0">
                  {formData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length} mots • 
                  Temps de lecture: {calculateReadTime(formData.content)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Metadata */}
          <div className="flex flex-col gap-4 order-1 xl:order-2">
            <ScrollArea className="xl:h-[calc(100vh-180px)]">
              <div className="space-y-4 pr-2">
                {/* Publication Settings */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-primary" />
                      <CardTitle className="text-sm">Publication</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Statut</Label>
                        <Select value={formData.status} onValueChange={(v) => handleChange('status', v)}>
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Brouillon</SelectItem>
                            <SelectItem value="published">Publié</SelectItem>
                            <SelectItem value="archived">Archivé</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Catégorie</Label>
                        <Select value={formData.category} onValueChange={(v) => handleChange('category', v)}>
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs">Slug (URL)</Label>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <span>/blog/</span>
                      </div>
                      <Input
                        value={formData.slug}
                        onChange={(e) => handleChange('slug', e.target.value)}
                        placeholder="mon-article"
                        className="font-mono text-sm h-9"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs">Auteur</Label>
                      <Input
                        value={formData.author}
                        onChange={(e) => handleChange('author', e.target.value)}
                        className="h-9"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* SEO Settings */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-primary" />
                      <CardTitle className="text-sm">SEO</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Meta Title</Label>
                      <Input
                        value={formData.meta_title}
                        onChange={(e) => handleChange('meta_title', e.target.value)}
                        placeholder="Titre pour Google..."
                        className="h-9"
                      />
                      <p className={`text-xs ${formData.meta_title.length > 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {formData.meta_title.length}/60
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs">Meta Description</Label>
                      <Textarea
                        value={formData.meta_description}
                        onChange={(e) => handleChange('meta_description', e.target.value)}
                        placeholder="Description pour Google..."
                        rows={3}
                        className="resize-none text-sm"
                      />
                      <p className={`text-xs ${formData.meta_description.length > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {formData.meta_description.length}/160
                      </p>
                    </div>

                    {/* Google Preview */}
                    <div className="p-3 bg-muted/50 rounded-lg border">
                      <p className="text-[10px] text-muted-foreground mb-1.5 uppercase tracking-wide">Aperçu Google</p>
                      <p className="text-primary text-sm font-medium truncate">
                        {formData.meta_title || formData.title || 'Titre de l\'article'}
                      </p>
                      <p className="text-emerald-600 dark:text-emerald-400 text-xs font-mono truncate">
                        qcmcivique.fr › blog › {formData.slug || 'slug'}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                        {formData.meta_description || formData.excerpt || 'Description...'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Featured Image */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-primary" />
                      <CardTitle className="text-sm">Image à la une</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs">URL de l'image</Label>
                      <Input
                        value={formData.featured_image}
                        onChange={(e) => handleChange('featured_image', e.target.value)}
                        placeholder="https://..."
                        className="h-9"
                      />
                    </div>

                    {formData.featured_image && (
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <img 
                          src={formData.featured_image} 
                          alt={formData.featured_image_alt || 'Preview'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <Label className="text-xs">Texte alternatif (alt)</Label>
                      <Input
                        value={formData.featured_image_alt}
                        onChange={(e) => handleChange('featured_image_alt', e.target.value)}
                        placeholder="Description de l'image..."
                        className="h-9"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
