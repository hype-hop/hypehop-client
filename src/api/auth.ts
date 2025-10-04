import { User } from '../AuthenticationContext';
import BASE_URL from '../config';

const getUser = async (): Promise<{ user: User }> => {
  const result = await fetch(`${BASE_URL}/api/user`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result.json();
};

export default getUser;
