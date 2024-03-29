import {
  AspectRatio,
  Box,
  Card,
  CardProps,
  Chip,
  Link,
  Typography,
} from '@mui/joy';
import { Launch } from '@mui/icons-material';

import { Article } from '../../types';
import formatDate from '../../utilities/formatDate';

export interface ArticleProps extends CardProps {
  article: Article;
}

export default function ArticleListItem({ article, ...props }: ArticleProps) {
  return (
    <Card {...props}>
      <AspectRatio>
        <img src={article.imageUrl} loading="lazy" alt={article.title} />
      </AspectRatio>
      <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
        <Typography level="title-lg">{article.title}</Typography>
        <Link startDecorator={<Launch />} href={article.link}>
          Read more
        </Link>
      </Box>
      <Typography sx={{ display: 'block' }} level="body-md" fontWeight="bold">
        {formatDate(article.publishedAt)}
      </Typography>
      <Typography level="title-md">Author: {article.author}</Typography>
      <Typography level="body-md">{article.description}</Typography>
      <Box
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
      </Box>
    </Card>
  );
}
