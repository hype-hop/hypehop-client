import BASE_URL from '../config';
import { FavoriteClickedUser } from '../types/favorite';

const fetchReviewFavoriteUsers = async (reviewId: string): Promise<FavoriteClickedUser[] | null> => {
  try {
    const url = `${BASE_URL}/api/review/${reviewId}/favorites`;
    const result = await (await fetch(url)).json();
    return result.data;
  } catch (error) {
    return null;
  }
};
export default fetchReviewFavoriteUsers;
