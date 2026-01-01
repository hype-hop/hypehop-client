import BASE_URL from '../config';
import { PaginatedReviews, ReviewsCount, ReviewsRank } from '../types/review';

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

export const fetchPopularReviews = async (
  period?: string,
  limit?: string,
  offset?: string,
): Promise<ReviewsRank[] | null> => {
  const optionalQuery = `${period ? `period=${period}&` : ''}${limit ? `limit=${limit}&` : ''}${offset ? `offset=${offset}&` : ''}`;

  try {
    const url = `${BASE_URL}/api/reviews/popular?${optionalQuery}`;
    const result = (await fetch(url)).json();
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const fetchReviewsCount = async (): Promise<ReviewsCount | null> => {
  try {
    const url = `${BASE_URL}/api/reviews/count`;
    const result = (await fetch(url)).json();
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchPaginatedReviews;
