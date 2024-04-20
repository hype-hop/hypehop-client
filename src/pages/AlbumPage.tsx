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
          <h1>앨범 리뷰 작성 페이지</h1>
          <WriteReview userData={user} />
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
