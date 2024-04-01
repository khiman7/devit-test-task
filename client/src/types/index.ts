export interface Article {
  _id: string;
  title: string;
  link: string;
  description: string;
  author: string;
  publishedAt: string;
  categories: string[];
  imageUrl: string;
  mediaCredit: string;
  mediaDescription: string;
}

export type UpdateArticleDTO = Partial<Omit<Article, '_id'>>;

export interface SignInDTO {
  username: string;
  password: string;
}

export interface FetchArticlesQueryParams {
  search?: string;
  offset?: number;
  limit?: number;
}
