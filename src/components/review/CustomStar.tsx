import { Rating } from '@mui/material';
import FullStar from '../../assets/icons/fullStar.svg';
import EmptyStar from '../../assets/icons/emptyStar.svg';

function CustomStars(props) {
  const mergedProps = {
    emptyIcon: <EmptyStar />,
    icon: <FullStar />,
    count: 5,
    precision: 0.5,
    ...props,
  };

  return <Rating {...mergedProps} />;
}

export default CustomStars;
