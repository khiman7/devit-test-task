import {
  Controller,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';

import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { UpdateArticleDTO } from './dtos/update-article.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('offset') offset = 0,
    @Query('limit') limit = 10,
  ): Promise<{ articles: Article[]; count: number }> {
    return this.articleService.findAll(offset, limit, search);
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
