import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Article, UpdateArticleDTO } from '../types';
import {
  deleteArticleById,
  fetchArticles,
  updateArticleById,
} from '../services/articles.service';
import { QUERY_KEYS } from '../constants';

export default function useArticles() {
  const queryClient = useQueryClient();
  const { data, isSuccess, isLoading, isError, error } = useQuery<Article[]>({
    queryKey: [QUERY_KEYS.ARTICLES],
    queryFn: fetchArticles,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: Article['_id']; dto: UpdateArticleDTO }) =>
      updateArticleById(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLES] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: Article['_id'] }) => deleteArticleById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLES] });
    },
  });

  return {
    articles: data,
    isSuccess,
    isLoading,
    isError,
    error,
    updateArticle: (id: Article['_id'], dto: UpdateArticleDTO) =>
      updateMutation.mutate({
        id,
        dto,
      }),
    deleteArticle: (id: Article['_id']) => deleteMutation.mutate({ id }),
  };
}
