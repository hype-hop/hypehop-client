import AlbumChart from '../components/AlbumChart';
import PopularReview from '../components/PopularReview';
import ReviewMain from '../components/ReviewMain';

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
