import { Typography } from '@mui/joy';

import ArticlesList from '../../components/ArticlesList';
import useArticles from '../../hooks/useArticles.hook';

export default function Feed() {
  const { articles, isSuccess } = useArticles();

  return (
    <>
      <Typography level="h4" fontWeight="bold">
        Feed
      </Typography>
      {isSuccess && articles && <ArticlesList data={articles} />}
    </>
  );
}
