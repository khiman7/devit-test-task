import { AspectRatio, Card, Chip, Grid, Link, Typography } from '@mui/joy';
import { Launch } from '@mui/icons-material';

import { Article } from '../../types';
import formatDate from '../../utilities/formatDate';

import styles from './ArticlesList.module.css';

export interface ArticlesListProps {
  data: Article[];
}

export default function ArticlesList({ data }: ArticlesListProps) {
  return (
    <ul className={styles['articles-list']}>
      {data.map((article) => (
        <li key={article._id} className={styles['articles-list__item']}>
          <Card sx={{ width: '100%' }}>
            <AspectRatio>
              <img src={article.imageUrl} loading="lazy" alt={article.title} />
            </AspectRatio>
            <Grid
              sx={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}
            >
              <Typography level="title-lg">{article.title}</Typography>
              <Link startDecorator={<Launch />} href={article.link}>
                Read more
              </Link>
            </Grid>
            <Typography
              sx={{ display: 'block' }}
              level="body-md"
              fontWeight="bold"
            >
              {formatDate(article.publishedAt)}
            </Typography>
            <Typography level="title-md">Author: {article.author}</Typography>
            <Typography level="body-md">{article.description}</Typography>
            <Grid
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flex: 1,
                flexDirection: 'row',
                gap: 1,
              }}
            >
              {article.categories.map((category) => (
                <Chip key={category}>{category}</Chip>
              ))}
            </Grid>
          </Card>
        </li>
      ))}
    </ul>
  );
}
