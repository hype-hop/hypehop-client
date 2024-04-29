import AlbumChart from '../components/album/AlbumChart';
import PopularReview from '../components/review/PopularReview';
import ReviewMain from '../components/review/ReviewMain';
import FloatingActionButton from '../components/common/FloatingActionButton';

function MainPage() {
  return (
    <div className="Main">
      <ReviewMain />

      <AlbumChart />

      <PopularReview />

      <FloatingActionButton />
    </div>
  );
}

export default MainPage;
