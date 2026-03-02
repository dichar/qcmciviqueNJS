export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          created_by: string | null
          excerpt: string
          featured_image: string | null
          featured_image_alt: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          read_time: string
          slug: string
          status: string
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          author?: string
          category?: string
          content: string
          created_at?: string
          created_by?: string | null
          excerpt: string
          featured_image?: string | null
          featured_image_alt?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          read_time?: string
          slug: string
          status?: string
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          created_by?: string | null
          excerpt?: string
          featured_image?: string | null
          featured_image_alt?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          read_time?: string
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          admin_id: string
          body: string
          created_at: string
          failed_count: number
          filters: Json
          id: string
          is_test: boolean
          recipients_count: number
          sent_at: string | null
          sent_count: number
          status: string
          subject: string
        }
        Insert: {
          admin_id: string
          body: string
          created_at?: string
          failed_count?: number
          filters?: Json
          id?: string
          is_test?: boolean
          recipients_count?: number
          sent_at?: string | null
          sent_count?: number
          status?: string
          subject: string
        }
        Update: {
          admin_id?: string
          body?: string
          created_at?: string
          failed_count?: number
          filters?: Json
          id?: string
          is_test?: boolean
          recipients_count?: number
          sent_at?: string | null
          sent_count?: number
          status?: string
          subject?: string
        }
        Relationships: []
      }
      marketing_email_recipients: {
        Row: {
          campaign_id: string
          email: string
          id: string
          sent_at: string
          user_id: string
        }
        Insert: {
          campaign_id: string
          email: string
          id?: string
          sent_at?: string
          user_id: string
        }
        Update: {
          campaign_id?: string
          email?: string
          id?: string
          sent_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketing_email_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_discrepancies: {
        Row: {
          amount_cents: number | null
          currency: string | null
          detected_at: string
          discrepancy_type: string
          email: string | null
          id: string
          metadata: Json | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string
          stripe_created_at: string | null
          stripe_payment_intent: string | null
          stripe_session_id: string | null
          user_id: string | null
          user_purchase_id: string | null
        }
        Insert: {
          amount_cents?: number | null
          currency?: string | null
          detected_at?: string
          discrepancy_type: string
          email?: string | null
          id?: string
          metadata?: Json | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          stripe_created_at?: string | null
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          user_id?: string | null
          user_purchase_id?: string | null
        }
        Update: {
          amount_cents?: number | null
          currency?: string | null
          detected_at?: string
          discrepancy_type?: string
          email?: string | null
          id?: string
          metadata?: Json | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          stripe_created_at?: string | null
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          user_id?: string | null
          user_purchase_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_discrepancies_user_purchase_id_fkey"
            columns: ["user_purchase_id"]
            isOneToOne: false
            referencedRelation: "user_purchases"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          free_quiz_used: boolean
          full_name: string | null
          id: string
          nickname: string | null
          nickname_edit_count: number
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          free_quiz_used?: boolean
          full_name?: string | null
          id: string
          nickname?: string | null
          nickname_edit_count?: number
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          free_quiz_used?: boolean
          full_name?: string | null
          id?: string
          nickname?: string | null
          nickname_edit_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          answers: Json
          category_scores: Json | null
          created_at: string
          exam_type: string | null
          id: string
          notes: string | null
          questions: Json
          score: number
          time_taken: number
          total_questions: number
          user_id: string
        }
        Insert: {
          answers: Json
          category_scores?: Json | null
          created_at?: string
          exam_type?: string | null
          id?: string
          notes?: string | null
          questions: Json
          score: number
          time_taken: number
          total_questions: number
          user_id: string
        }
        Update: {
          answers?: Json
          category_scores?: Json | null
          created_at?: string
          exam_type?: string | null
          id?: string
          notes?: string | null
          questions?: Json
          score?: number
          time_taken?: number
          total_questions?: number
          user_id?: string
        }
        Relationships: []
      }
      stripe_payment_details: {
        Row: {
          created_at: string
          id: string
          stripe_payment_intent: string | null
          stripe_session_id: string | null
          user_purchase_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          user_purchase_id: string
        }
        Update: {
          created_at?: string
          id?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          user_purchase_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stripe_payment_details_user_purchase_id_fkey"
            columns: ["user_purchase_id"]
            isOneToOne: false
            referencedRelation: "user_purchases"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          sender_id: string | null
          sender_type: Database["public"]["Enums"]["message_sender_type"]
          ticket_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          sender_id?: string | null
          sender_type: Database["public"]["Enums"]["message_sender_type"]
          ticket_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          sender_id?: string | null
          sender_type?: Database["public"]["Enums"]["message_sender_type"]
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          created_at: string
          email: string | null
          has_unread_admin_reply: boolean | null
          id: string
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          type: Database["public"]["Enums"]["ticket_type"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          has_unread_admin_reply?: boolean | null
          id?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          type?: Database["public"]["Enums"]["ticket_type"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          has_unread_admin_reply?: boolean | null
          id?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          type?: Database["public"]["Enums"]["ticket_type"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_purchases: {
        Row: {
          amount_paid: number
          created_at: string
          currency: string
          expires_at: string | null
          has_full_access: boolean
          id: string
          pack_type: string | null
          purchased_at: string
          user_id: string
        }
        Insert: {
          amount_paid?: number
          created_at?: string
          currency?: string
          expires_at?: string | null
          has_full_access?: boolean
          id?: string
          pack_type?: string | null
          purchased_at?: string
          user_id: string
        }
        Update: {
          amount_paid?: number
          created_at?: string
          currency?: string
          expires_at?: string | null
          has_full_access?: boolean
          id?: string
          pack_type?: string | null
          purchased_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_common_errors:
        | {
            Args: { min_attempts?: number; min_error_rate?: number }
            Returns: {
              category: string
              correct_answer: string
              error_rate: number
              explanation: string
              incorrect_attempts: number
              options: Json
              question_text: string
              total_attempts: number
            }[]
          }
        | {
            Args: {
              min_attempts?: number
              min_error_rate?: number
              p_exam_type?: string
            }
            Returns: {
              category: string
              correct_answer: string
              error_rate: number
              explanation: string
              incorrect_attempts: number
              options: Json
              question_text: string
              total_attempts: number
            }[]
          }
      get_marketing_email_batch: {
        Args: {
          p_batch_size?: number
          p_date_from?: string
          p_date_to?: string
          p_exclude_if_emailed_times?: number
          p_free_users_only?: boolean
        }
        Returns: {
          email: string
          first_name: string
          user_id: string
        }[]
      }
      get_marketing_targeting_stats: {
        Args: {
          p_date_from?: string
          p_date_to?: string
          p_exclude_if_emailed_times?: number
          p_free_users_only?: boolean
        }
        Returns: Json
      }
      get_user_nickname: { Args: { user_uuid: string }; Returns: string }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      app_role: "admin" | "user"
      message_sender_type: "user" | "admin"
      ticket_status: "open" | "in_progress" | "resolved"
      ticket_type: "support" | "contact" | "feedback"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      message_sender_type: ["user", "admin"],
      ticket_status: ["open", "in_progress", "resolved"],
      ticket_type: ["support", "contact", "feedback"],
    },
  },
} as const
