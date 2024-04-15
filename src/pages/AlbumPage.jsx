import AlbumSearch from '../components/AlbumSearch';
import RecentlyReviewed from '../components/RecentlyReviewed';
import WriteReview from '../components/WriteReview';
import { useAuth } from '../AuthenticationContext';
import LogInForm from '../components/LogInForm';

function AlbumPage() {
  const [user] = useAuth();

  return (
    <div className="Album">
      {user ? (
        <>
          <h1>AlbumPage.jsx - 작성페이지</h1>
          <AlbumSearch />
          <WriteReview />
          <RecentlyReviewed />
        </>
      ) : (
        <div>
          <LogInForm />
        </div>
      )}
    </div>
  );
}

export default AlbumPage;
