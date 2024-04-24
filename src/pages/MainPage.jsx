import AlbumChart from '../components/album/AlbumChart';
import PopularReview from '../components/review/PopularReview';
import ReviewMain from '../components/review/ReviewMain';

function MainPage() {
  return (
    <div className="Main">
      <ReviewMain />

      <AlbumChart />

      <PopularReview />
    </div>
  );
}

export default MainPage;
