import { useState } from 'react';
import { Box, Button, Card, Grid, IconButton, Typography } from '@mui/joy';
import { Delete, Edit } from '@mui/icons-material';

import useArticles from '../../hooks/useArticles.hook';
import EditArticleModal from '../../components/EditArticleModal';
import { Article, UpdateArticleDTO } from '../../types';

export default function Dashboard() {
  const { articles, isSuccess, isLoading, updateArticle, deleteArticle } =
    useArticles();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [articleToEdit, setArticleToEdit] = useState<Article>();

  return (
    <>
      <EditArticleModal
        isOpen={isEditModalOpen}
        article={articleToEdit!}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={(id: Article['_id'], dto: UpdateArticleDTO) =>
          updateArticle(id, dto)
        }
      />
      <Typography level="h4" fontWeight="bold">
        Dashboard
      </Typography>
      <Box component="ul" sx={{ mt: 3, listStyle: 'none' }}>
        {isSuccess &&
          articles &&
          articles.map((article) => (
            <Box key={article._id} component="li" sx={{ mb: 1 }}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography level="body-md" fontWeight="bold">
                  {article.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    startDecorator={<Edit />}
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setArticleToEdit(article);
                    }}
                  >
                    Edit
                  </Button>
                  <IconButton
                    onClick={() => deleteArticle(article._id)}
                    color="danger"
                    variant="solid"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Card>
            </Box>
          ))}
      </Box>
    </>
  );
}
