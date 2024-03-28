export class CreateArticleDTO {
  readonly title: string;
  readonly link: string;
  readonly description: string;
  readonly author: string;
  readonly publishedAt: Date;
  readonly categories: string[];
  readonly imageUrl: string;
  readonly mediaCredit: string;
  readonly mediaDescription: string;
}
