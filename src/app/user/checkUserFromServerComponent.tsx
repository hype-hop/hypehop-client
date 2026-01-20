import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { User } from '../../AuthenticationContext';
import BASE_URL from '../../config';

const checkUserFromServerComponent = async (callBackUrl: string | null): Promise<User> => {
  const headersList = await headers();
  const cookie = headersList.get('cookie') || '';

  const result = await fetch(`${BASE_URL}/api/user`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      cookie,
    },
  });
  const userData = await result.json();

  if (Object.keys(userData).length === 0) {
    redirect(`/login${callBackUrl ? `?callbackUrl=${encodeURI(callBackUrl)}` : ''}`);
  }
  return userData; // Updated to return userData instead of result.json()
};

export default checkUserFromServerComponent;
