import BASE_URL from '../config';
import ensureError from '../utils/error';

async function fetchNotification() {
  try {
    const response = await fetch(`${BASE_URL}/api/notification`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const data = await response.json();
    return data.notifications;
  } catch (error) {
    const ensuredError = ensureError(error);
    return { success: false, error: ensuredError };
  }
}

export default fetchNotification;
