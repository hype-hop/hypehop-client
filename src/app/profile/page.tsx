'use client';

import { connection } from 'next/server';
import Profile from '../../components/profile/Profile';

async function ProfilePage() {
  await connection();
  return <Profile />;
}

export default ProfilePage;
