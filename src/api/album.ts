import BASE_URL from '../config';
import { AlbumSearchResult } from '../types/albumSearch';
import { Result } from '../types/commonApi';
import ensureError from '../utils/error';

async function postSearchAlbum(keyword: string): Promise<Result<AlbumSearchResult[]>> {
  try {
    const response = await fetch(`${BASE_URL}/album/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from the server');
    }

    return { success: true, data: await response.json() };
  } catch (error) {
    const ensuredError = ensureError(error);

    return { success: false, error: ensuredError };
  }
}

export default postSearchAlbum;
