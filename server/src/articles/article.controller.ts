import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { UpdateArticleDTO } from './dtos/update-article.dto';
import { CreateArticleDTO } from './dtos/create-article.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateArticleDTO): Promise<Article> {
    return this.articleService.create(dto);
  }

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Article | null> {
    return this.articleService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateArticleDTO,
  ): Promise<Article | null> {
    return this.articleService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string): Promise<Article | null> {
    return this.articleService.delete(id);
  }
}
