import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Article, ArticleDocument } from './article.entity';
import { CreateArticleDTO } from './dtos/create-article.dto';
import { UpdateArticleDTO } from './dtos/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(dto: CreateArticleDTO): Promise<Article> {
    const article = new this.articleModel(dto);
    return article.save();
  }

  async findAll(): Promise<Article[]> {
    const articles = await this.articleModel.find();
    return articles;
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
