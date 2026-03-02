import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  Strikethrough,
  List, 
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Minus,
  Code2,
  Eye,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
  showTemplateButton?: boolean;
  onInsertTemplate?: () => void;
}

// Template HTML par défaut pour nouveaux articles
export const DEFAULT_BLOG_TEMPLATE = `<h2 class="text-primary">Introduction</h2>
<p>Depuis l'entrée en vigueur du <strong>décret 2025-1345</strong>, la préparation à l'examen civique est devenue une étape incontournable pour tout candidat à la naturalisation française ou à l'obtention d'un titre de séjour de longue durée.</p>

<h2>🎯 Pourquoi est-ce important ?</h2>
<p>L'examen civique évalue vos connaissances sur :</p>
<ul>
  <li><strong>Les valeurs de la République</strong> : Liberté, Égalité, Fraternité, Laïcité</li>
  <li><strong>L'histoire de France</strong> : Les grandes dates et événements fondateurs</li>
  <li><strong>Les institutions françaises</strong> : Président, Gouvernement, Parlement</li>
  <li><strong>La vie quotidienne</strong> : Droits et devoirs des citoyens</li>
</ul>

<h2>📚 Comment se préparer efficacement ?</h2>
<p>Pour maximiser vos chances de réussite, nous vous recommandons :</p>
<ol>
  <li><strong>Étudier le Livret du Citoyen</strong> : Document officiel de référence</li>
  <li><strong>S'entraîner avec des QCM</strong> : Testez vos connaissances en conditions réelles</li>
  <li><strong>Réviser régulièrement</strong> : La répétition espacée est la clé</li>
</ol>

<blockquote>
  <p>💡 <strong>Astuce :</strong> Commencez par identifier vos points faibles grâce à notre quiz gratuit, puis concentrez-vous sur les thématiques où vous avez le plus de difficultés.</p>
</blockquote>

<h2>📊 Le seuil de réussite</h2>
<p>Pour valider l'examen civique, vous devez obtenir un score minimum de <strong>80% de bonnes réponses</strong>. L'examen comprend 40 questions à choix multiples sur les thématiques officielles.</p>

<h2>🚀 Passez à l'action</h2>
<p>Ne laissez pas le stress de l'examen vous submerger. Avec une préparation adaptée et des outils performants, vous pouvez aborder cette épreuve en toute sérénité.</p>

<div style="background: linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.05)); border-left: 4px solid hsl(var(--primary)); padding: 1.5rem; border-radius: 0.5rem; margin: 2rem 0;">
  <p style="font-weight: 600; font-size: 1.125rem; margin-bottom: 0.5rem;">📝 Prêt à tester vos connaissances ?</p>
  <p style="margin-bottom: 1rem;">Découvrez notre plateforme d'entraînement avec plus de 600 questions officielles réparties sur 3 niveaux.</p>
  <p><a href="/entrainement-naturalisation" style="color: hsl(var(--primary)); font-weight: 600;">➡️ Commencer l'entraînement gratuit</a></p>
</div>
`;

export function TiptapEditor({ 
  content, 
  onChange, 
  className,
  showTemplateButton = false,
  onInsertTemplate 
}: TiptapEditorProps) {
  const [mode, setMode] = useState<'visual' | 'html'>('visual');
  const [htmlContent, setHtmlContent] = useState(content);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none min-h-[500px] px-6 py-4 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setHtmlContent(newContent);
      onChange(newContent);
    },
  });

  // Sync content when it changes externally
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
      setHtmlContent(content);
    }
  }, [content, editor]);

  // Handle mode switching
  const handleModeChange = (newMode: 'visual' | 'html') => {
    if (newMode === 'html' && editor) {
      setHtmlContent(editor.getHTML());
    } else if (newMode === 'visual' && editor) {
      editor.commands.setContent(htmlContent);
      onChange(htmlContent);
    }
    setMode(newMode);
  };

  // Handle HTML textarea changes
  const handleHtmlChange = (value: string) => {
    setHtmlContent(value);
    onChange(value);
  };

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('URL du lien:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('URL de l\'image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const insertTemplate = () => {
    if (onInsertTemplate) {
      onInsertTemplate();
    } else {
      editor.commands.setContent(DEFAULT_BLOG_TEMPLATE);
      setHtmlContent(DEFAULT_BLOG_TEMPLATE);
      onChange(DEFAULT_BLOG_TEMPLATE);
    }
  };

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    children,
    title 
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    children: React.ReactNode;
    title: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      title={title}
      className={cn(
        'h-8 w-8 p-0',
        isActive && 'bg-primary/20 text-primary'
      )}
    >
      {children}
    </Button>
  );

  return (
    <div className={cn('border border-input rounded-lg bg-background overflow-hidden', className)}>
      {/* Mode Toggle Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-input">
        <Tabs value={mode} onValueChange={(v) => handleModeChange(v as 'visual' | 'html')} className="w-auto">
          <TabsList className="h-8">
            <TabsTrigger value="visual" className="h-7 px-3 text-xs gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              Visuel
            </TabsTrigger>
            <TabsTrigger value="html" className="h-7 px-3 text-xs gap-1.5">
              <FileCode className="h-3.5 w-3.5" />
              HTML
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {showTemplateButton && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={insertTemplate}
            className="h-7 text-xs gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Template par défaut
          </Button>
        )}
      </div>

      {mode === 'visual' ? (
        <>
          {/* Visual Editor Toolbar */}
          <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-input bg-muted/30">
            {/* Text formatting */}
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              title="Gras (Ctrl+B)"
            >
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              title="Italique (Ctrl+I)"
            >
              <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive('underline')}
              title="Souligné (Ctrl+U)"
            >
              <UnderlineIcon className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive('strike')}
              title="Barré"
            >
              <Strikethrough className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              isActive={editor.isActive('code')}
              title="Code inline"
            >
              <Code className="h-4 w-4" />
            </ToolbarButton>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Headings */}
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive('heading', { level: 1 })}
              title="Titre 1"
            >
              <Heading1 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive('heading', { level: 2 })}
              title="Titre 2"
            >
              <Heading2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive('heading', { level: 3 })}
              title="Titre 3"
            >
              <Heading3 className="h-4 w-4" />
            </ToolbarButton>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Lists */}
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              title="Liste à puces"
            >
              <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              title="Liste numérotée"
            >
              <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive('blockquote')}
              title="Citation"
            >
              <Quote className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              title="Ligne horizontale"
            >
              <Minus className="h-4 w-4" />
            </ToolbarButton>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Alignment */}
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              isActive={editor.isActive({ textAlign: 'left' })}
              title="Aligner à gauche"
            >
              <AlignLeft className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              isActive={editor.isActive({ textAlign: 'center' })}
              title="Centrer"
            >
              <AlignCenter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              isActive={editor.isActive({ textAlign: 'right' })}
              title="Aligner à droite"
            >
              <AlignRight className="h-4 w-4" />
            </ToolbarButton>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Links & Media */}
            <ToolbarButton
              onClick={addLink}
              isActive={editor.isActive('link')}
              title="Ajouter un lien"
            >
              <LinkIcon className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={addImage}
              title="Ajouter une image"
            >
              <ImageIcon className="h-4 w-4" />
            </ToolbarButton>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Undo/Redo */}
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              title="Annuler (Ctrl+Z)"
            >
              <Undo className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              title="Rétablir (Ctrl+Y)"
            >
              <Redo className="h-4 w-4" />
            </ToolbarButton>
          </div>

          {/* Visual Editor Content */}
          <div className="min-h-[500px]">
            <EditorContent editor={editor} />
          </div>
        </>
      ) : (
        /* HTML Source Editor */
        <div className="relative">
          <Textarea
            value={htmlContent}
            onChange={(e) => handleHtmlChange(e.target.value)}
            className="min-h-[550px] font-mono text-sm border-0 rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-slate-950 text-green-400"
            placeholder="<h2>Titre de la section</h2>&#10;<p>Contenu de l'article...</p>"
            spellCheck={false}
          />
          <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-slate-800 px-2 py-1 rounded">
            HTML
          </div>
        </div>
      )}
    </div>
  );
}
