import BASE_URL from '../config';
import { Result } from '../types/commonApi';
import { Profile } from '../types/user';
import ensureError from '../utils/error';

async function getProfile(id: string): Promise<Result<Profile>> {
  try {
    const response = await fetch(`${BASE_URL}/api/userReviews/${id}`, {
      method: 'GET',
      credentials: 'include',
    });
    return { success: true, data: await response.json() };
  } catch (error) {
    const ensuredError = ensureError(error);
    return { success: false, error: ensuredError };
  }
}

export default getProfile;
