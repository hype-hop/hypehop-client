'use client';

import { Box } from '@mui/material';
import { Suspense, useEffect, useState } from 'react';
import { useAuth } from '../../../../AuthenticationContext';
import LogInForm from '../../../../components/sign/LogInForm';
import WriteReview from '../../../../components/review/WriteReview';

function AlbumPage() {
  const { user } = useAuth()!;
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    setIsUser(user !== null);
  }, [user]);

  if (!isUser) {
    return (
      <Box className="Album">
        <Suspense>
          <LogInForm />
        </Suspense>
      </Box>
    );
  }

  return (
    <Box className="Album">
      <Suspense>
        <WriteReview userData={user} />
      </Suspense>
    </Box>
  );
}

export default AlbumPage;
