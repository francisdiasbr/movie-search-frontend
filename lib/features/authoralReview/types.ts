export interface ReviewContentLanguage {
  text: string;
}

export interface ReviewContent {
  en: ReviewContentLanguage;
  pt: ReviewContentLanguage;
}

export interface CreateAuthoralReviewPayload {
  content: ReviewContent;
  primaryTitle: string;
  references?: string[];
  tconst: string;
}

export interface UpdateAuthoralReviewPayload {
  content: {
    en?: ReviewContentLanguage;
    pt?: ReviewContentLanguage;
  };
}

export interface AuthoralReviewResponse {
  _id: string;
  content: ReviewContent;
  created_at: string;
  images: string[];
  primaryTitle: string;
  references?: string[];
  tconst: string;
}

export interface MovieReviewResponse {
  content: any;
  primaryTitle: string;
  tconst: string;
}

export interface AuthoralReviewState {
  data: MovieReviewResponse | null;
  error: string | null;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
}
