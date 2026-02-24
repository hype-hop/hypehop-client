import BASE_URL from '../config';
import { PaginatedReviews, Review, ReviewEdit, ReviewsCount, ReviewsRank } from '../types/review';

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

export const fetchReviewById = async (id: string): Promise<ReviewEdit | null> => {
  try {
    const url = `${BASE_URL}/album/api/review/${id}`;
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

export const deleteReview = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/album/api/review/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete');
    }
    return true;
  } catch (error) {
    console.error('Error fetching data:', error);
    return false;
  }
};

export default fetchPaginatedReviews;
