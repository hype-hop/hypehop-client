

import { Box } from '@mui/material';


import WriteReview from '../components/review/WriteReview';
import { useAuth } from '../AuthenticationContext';
import LogInForm from '../components/sign/LogInForm';

function AlbumPage() {
  const [user] = useAuth();

  return (
    <div className="Album">
      {user ? (


        <WriteReview userData={user} />


      ) : (
        <div>
          <LogInForm />
        </div>
      )}
    </div>
  );
}

export default AlbumPage;
