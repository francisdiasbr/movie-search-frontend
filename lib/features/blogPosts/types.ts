export interface BlogPostResponse {
  primaryTitle: string;
  content: any;
  tconst: string;
  isAiGenerated: boolean;
  created_at: string;
  references: string[];
  original_movie_soundtrack?: string;
}
