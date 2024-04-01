import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Article, ArticleDocument } from './article.entity';
import { CreateArticleDTO } from './dtos/create-article.dto';
import { UpdateArticleDTO } from './dtos/update-article.dto';

export interface FindArticlesQuery {
  title?: { $regex: string; $options: string };
}

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(dto: CreateArticleDTO): Promise<Article> {
    const article = new this.articleModel(dto);
    return article.save();
  }

  async findAll(
    offset: number,
    limit: number,
    search?: string,
  ): Promise<{ articles: Article[]; count: number }> {
    const query: FindArticlesQuery = {};

    if (search) {
      query.title = { $regex: `^${search}`, $options: 'i' };
    }

    const [articles, count] = await Promise.all([
      this.articleModel.find(query).skip(offset).limit(limit).exec(),
      this.articleModel.countDocuments(query).exec(),
    ]);

    return { articles, count };
  }

  async findById(id: ArticleDocument['_id']): Promise<Article | null> {
    const article = await this.articleModel.findById(id);
    return article;
  }

  async update(
    id: ArticleDocument['_id'],
    dto: UpdateArticleDTO,
  ): Promise<Article | null> {
    const updatedArticle = await this.articleModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    return updatedArticle;
  }

  async delete(id: ArticleDocument['_id']): Promise<Article | null> {
    const deletedArticle = await this.articleModel.findByIdAndDelete(id);
    return deletedArticle;
  }

  async deleteAll(): Promise<void> {
    this.articleModel.deleteMany();
  }
}
