import axios from '../axios';
import { API_ENDPOINTS } from '../constants';
import { SignInDTO } from '../types';

export async function signIn(
  dto: SignInDTO
): Promise<{ access_token: string }> {
  const { data } = await axios.post(API_ENDPOINTS.SIGNIN, dto);
  return data;
}

export async function verifyAccessToken(): Promise<{
  payload: { username: string };
}> {
  const { data } = await axios.get(API_ENDPOINTS.VERIFY_ACCESS_TOKEN);
  return data;
}
