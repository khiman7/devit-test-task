import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as Parser from 'rss-parser';

import { ArticleService } from '../article.service';
import { constants } from '../constants';
import { CreateArticleDTO } from '../dtos/create-article.dto';

@Injectable()
export class ParseRssJob {
  constructor(private readonly articleService: ArticleService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async run() {
    try {
      await this.articleService.deleteAll();
      const parser = new Parser({
        customFields: {
          item: [
            'description',
            'dc:creator',
            'publishedAt',
            'media:content',
            'media:credit',
            'media:description',
          ],
        },
      });
      const feed = await parser.parseURL(
        'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
      );

      for (const item of feed.items) {
        const dto: CreateArticleDTO = {
          title: item.title!,
          link: item.link!,
          description: item.description,
          author: item['dc:creator'],
          categories: item.categories
            ? item.categories.map((category) => (category as any)._)
            : [],
          publishedAt: new Date(item.pubDate!),
          imageUrl: item['media:content']
            ? item['media:content'].$.url
            : constants.articleImagePlaceholder,
          mediaCredit: item['media:credit'] || '',
          mediaDescription: item['media:description'] || '',
        };

        await this.articleService.create(dto);
      }
    } catch (error) {
      console.log('Error parsing RSS feed: ', error);
    }
  }
}
