import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateArticleDTO {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsUrl()
  @IsOptional()
  readonly link?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly author?: string;

  @IsDateString()
  @IsOptional()
  readonly publishedAt?: Date;

  @IsArray()
  @IsOptional()
  readonly categories?: string[];

  @IsUrl()
  @IsOptional()
  readonly imageUrl?: string;

  @IsString()
  @IsOptional()
  readonly mediaCredit?: string;

  @IsString()
  @IsOptional()
  readonly mediaDescription?: string;
}
