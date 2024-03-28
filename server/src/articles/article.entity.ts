import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true, type: Date })
  publishedAt: Date;

  @Prop({ type: [String], default: [] })
  categories: string[];

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  mediaCredit: string;

  @Prop()
  mediaDescription: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
