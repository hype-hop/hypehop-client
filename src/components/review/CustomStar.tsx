import ReactStars from 'react-rating-stars-component';
import FullStar from '../../assets/icons/fullStar.svg';
import HalfStar from '../../assets/icons/halfStar.svg';
import EmptyStar from '../../assets/icons/emptyStar.svg';

function CustomStars(props) {
  const mergedProps = {
    emptyIcon: <EmptyStar />,
    halfIcon: <HalfStar />,
    filledIcon: <FullStar />,
    count: 5,
    isHalf: true,
    ...props,
  };

  return <ReactStars {...mergedProps} />;
}

export default CustomStars;
