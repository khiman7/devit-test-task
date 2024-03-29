import axios from '../axios';
import { API_ENDPOINTS } from '../constants';
import { Article, UpdateArticleDTO } from '../types';

export async function fetchArticles(): Promise<Article[]> {
  const { data } = await axios.get<Article[]>(API_ENDPOINTS.ARTICLES);
  return data;
}

export async function fetchArticleById(id: Article['_id']): Promise<Article> {
  const { data } = await axios.get<Article>(`${API_ENDPOINTS.ARTICLES}/${id}`);
  return data;
}

export async function updateArticleById(
  id: Article['_id'],
  dto: UpdateArticleDTO
) {
  const { data } = await axios.patch<Article>(
    `${API_ENDPOINTS.ARTICLES}/${id}`,
    dto
  );
  return data;
}

export async function deleteArticleById(id: Article['_id']): Promise<void> {
  return axios.delete(`${API_ENDPOINTS.ARTICLES}/${id}`);
}
