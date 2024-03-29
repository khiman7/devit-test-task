import { IsArray, IsDateString, IsString, IsUrl } from 'class-validator';

export class CreateArticleDTO {
  @IsString()
  readonly title: string;

  @IsUrl()
  readonly link: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly author: string;

  @IsDateString()
  readonly publishedAt: Date;

  @IsArray()
  readonly categories: string[];

  @IsUrl()
  readonly imageUrl: string;

  @IsString()
  readonly mediaCredit: string;

  @IsString()
  readonly mediaDescription: string;
}
