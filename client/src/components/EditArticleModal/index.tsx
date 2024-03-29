import { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  Sheet,
  Typography,
} from '@mui/joy';
import { useForm } from 'react-hook-form';
import { Article, UpdateArticleDTO } from '../../types';

export interface EditArticleModalProps {
  isOpen: boolean;
  article: Article;
  onClose: () => void;
  onSubmit: (id: Article['_id'], dto: UpdateArticleDTO) => void;
}

export interface FormData {
  title: Article['title'];
  link: Article['link'];
  description: Article['description'];
  author: Article['author'];
  imageUrl: Article['imageUrl'];
}

export default function EditArticleModal({
  isOpen,
  article,
  onClose,
  onSubmit,
}: EditArticleModalProps) {
  const { register, setValue, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    if (article) {
      setValue('title', article.title);
      setValue('link', article.link);
      setValue('description', article.description);
      setValue('author', article.author);
      setValue('imageUrl', article.imageUrl);
    }
  }, [article, setValue]);

  return (
    <Modal
      open={isOpen}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClose={onClose}
    >
      <Sheet sx={{ p: 3, borderRadius: 8, width: '480px' }}>
        <Typography level="h3">✏️ Edit article</Typography>
        <Box
          component="form"
          sx={{ mt: 3 }}
          onSubmit={handleSubmit(async (data) => {
            onSubmit(article._id, data);
            onClose();
          })}
        >
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input {...register('title')} placeholder="Title" />
          </FormControl>
          <FormControl>
            <FormLabel sx={{ mt: 1 }}>Link</FormLabel>
            <Input {...register('link')} placeholder="Link" />
          </FormControl>
          <FormControl>
            <FormLabel sx={{ mt: 1 }}>Description</FormLabel>
            <Input {...register('description')} placeholder="Description" />
          </FormControl>
          <FormControl>
            <FormLabel sx={{ mt: 1 }}>Author</FormLabel>
            <Input {...register('author')} placeholder="Author" />
          </FormControl>
          <FormControl>
            <FormLabel sx={{ mt: 1 }}>Image URL</FormLabel>
            <Input {...register('imageUrl')} placeholder="Image URL" />
          </FormControl>
          <Button type="submit" sx={{ width: '100%', mt: 3 }}>
            Edit
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
}
