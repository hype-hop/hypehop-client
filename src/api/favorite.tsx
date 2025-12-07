import BASE_URL from '../config';
import { FavoriteClickedUser } from '../types/favorite';

const fetchReviewFavoriteUsers = async (reviewId: string): Promise<FavoriteClickedUser[] | null> => {
  try {
    const url = `${BASE_URL}/api/review/${reviewId}/favorites`;
    const result = await fetch(url, { credentials: 'include' });
    return await result.json();
  } catch (error) {
    return null;
  }
};
export default fetchReviewFavoriteUsers;
