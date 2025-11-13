import BASE_URL from '../config';
import { PaginatedReviews } from '../types/review';

const fetchPaginatedReviews = async (page: number, genre: string = 'all'): Promise<PaginatedReviews | null> => {
  try {
    const url = `${BASE_URL}/album/api/review/scroll?${genre === 'all' ? '' : `genre=${genre}&`}page=${page}`;
    const result = (await fetch(url)).json();
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchPaginatedReviews;
