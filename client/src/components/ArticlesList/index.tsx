import { AspectRatio, Box, Card, Chip, Link, Typography } from '@mui/joy';
import { Launch } from '@mui/icons-material';

import { Article } from '../../types';
import formatDate from '../../utilities/formatDate';
import ArticleListItem from '../Article';

export interface ArticlesListProps {
  data: Article[];
}

export default function ArticlesList({ data }: ArticlesListProps) {
  return (
    <Box component="ul" sx={{ listStyle: 'none', mt: 2 }}>
      {data.map((article) => (
        <Box component="li" key={article._id} sx={{ mb: 2 }}>
          <ArticleListItem article={article} sx={{ width: '100%' }} />
        </Box>
      ))}
    </Box>
  );
}
