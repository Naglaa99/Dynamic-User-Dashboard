import { Iuser } from './iuser';

export interface UserResponse {
  data: Iuser[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
