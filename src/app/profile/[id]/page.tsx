import { connection } from 'next/server';
import Profile from '../../../components/profile/Profile';

async function ProfilePage({ params }: { params: { id: string } }) {
  await connection();
  const { id } = await params;
  return <Profile userId={id} />;
}

export default ProfilePage;
