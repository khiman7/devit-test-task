import { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  Sheet,
  Typography,
} from '@mui/joy';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

const schema = z.object({
  title: z.string().min(3),
  link: z.string().url(),
  description: z.string().min(16),
  author: z.string().min(3),
  imageUrl: z.string().url(),
});

export default function EditArticleModal({
  isOpen,
  article,
  onClose,
  onSubmit,
}: EditArticleModalProps) {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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
      onClose={() => {
        reset();
        onClose();
      }}
    >
      <Sheet sx={{ p: 3, borderRadius: 8, width: '480px' }}>
        <Typography level="h3">✏️ Edit article</Typography>
        <Box
          component="form"
          sx={{ mt: 3 }}
          onSubmit={handleSubmit(async (data) => {
            onSubmit(article._id, data);
            reset();
            onClose();
          })}
        >
          <FormControl error={!!errors.title}>
            <FormLabel>Title</FormLabel>
            <Input {...register('title')} placeholder="Title" />
            {errors.title && (
              <FormHelperText>{errors.title?.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.link}>
            <FormLabel sx={{ mt: 1 }}>Link</FormLabel>
            <Input {...register('link')} placeholder="Link" />
            {errors.link && (
              <FormHelperText>{errors.link?.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.description}>
            <FormLabel sx={{ mt: 1 }}>Description</FormLabel>
            <Input {...register('description')} placeholder="Description" />
            {errors.description && (
              <FormHelperText>{errors.description?.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.author}>
            <FormLabel sx={{ mt: 1 }}>Author</FormLabel>
            <Input {...register('author')} placeholder="Author" />
            {errors.author && (
              <FormHelperText>{errors.author?.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.imageUrl}>
            <FormLabel sx={{ mt: 1 }}>Image URL</FormLabel>
            <Input {...register('imageUrl')} placeholder="Image URL" />
            {errors.imageUrl && (
              <FormHelperText>{errors.imageUrl?.message}</FormHelperText>
            )}
          </FormControl>
          <Button type="submit" sx={{ width: '100%', mt: 3 }}>
            Edit
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
}
