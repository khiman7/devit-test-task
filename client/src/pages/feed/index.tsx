import { useEffect, useState } from 'react';
import { Box, Input, Typography } from '@mui/joy';
import { Search } from '@mui/icons-material';

import useArticles from '../../hooks/useArticles.hook';
import debounce from '../../utilities/debounce';

import ArticlesList from '../../components/ArticlesList';
import Pagination from '../../components/Pagination';

export const ARTICLES_PAGE_SIZE = 10;

export default function Feed() {
  const [searchText, setSearchText] = useState<string>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { articles, count, isSuccess, refetch } = useArticles({
    search: searchText,
    offset: (currentPage - 1) * ARTICLES_PAGE_SIZE,
    limit: ARTICLES_PAGE_SIZE,
  });

  useEffect(() => {
    refetch();
  }, [searchText, currentPage, refetch]);

  const debouncedSetSearchText = debounce(
    (text: string) => setSearchText(text),
    300
  );

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    debouncedSetSearchText(event.target.value);
  }

  return (
    <>
      <Typography level="h4" fontWeight="bold">
        Feed
      </Typography>
      <Box sx={{ my: 2 }}>
        <Input
          startDecorator={<Search />}
          placeholder="Search..."
          onChange={(event) => handleSearchChange(event)}
        />
      </Box>
      {isSuccess && articles && <ArticlesList data={articles} />}
      {count ? (
        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(count / ARTICLES_PAGE_SIZE)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Box>
      ) : (
        <Typography level="body-md">No results</Typography>
      )}
    </>
  );
}
