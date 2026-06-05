import apiClient from './client';
import { ApiResponse } from '@/types/api';

export interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  description: string;
  order: number;
  createdAt: string;
}

export const carouselApi = {
  getSlides: async (): Promise<ApiResponse<CarouselSlide[]>> => {
    return apiClient.get('/carousel') as any;
  },
};

export default carouselApi;
