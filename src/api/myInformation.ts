import BASE_URL from '../config';
import { Result } from '../types/commonApi';
import { MyInformation } from '../types/myInformation';
import ensureError from '../utils/error';

async function getMyInformation(): Promise<Result<MyInformation>> {
  try {
    const response = await fetch(`${BASE_URL}/api/dashboard`, {
      method: 'GET',
      credentials: 'include',
    });
    return { success: true, data: await response.json() };
  } catch (error) {
    const ensuredError = ensureError(error);
    return { success: false, error: ensuredError };
  }
}

export default getMyInformation;
