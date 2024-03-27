
import { useNavigate} from 'react-router-dom';
import AlbumChart from '../components/AlbumChart'
import PopularReview from '../components/PopularReview';
import ReviewMain from '../components/ReviewMain';

function MainPage() {

  
  const navigate = useNavigate();




  return (
    <div className="Main">

<ReviewMain/>

<AlbumChart/>

<PopularReview/>





    </div>

  );
}

export default MainPage;
