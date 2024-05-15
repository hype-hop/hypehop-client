import ReactStars from 'react-rating-stars-component';
import { ReactComponent as FullStar } from '../../assets/icons/fullStar.svg';
import { ReactComponent as HalfStar } from '../../assets/icons/halfStar.svg';
import { ReactComponent as EmptyStar } from '../../assets/icons/emptyStar.svg';

function CustomStars({ name, onChange, ...props }) {
  const mergedProps = {
    emptyIcon: <EmptyStar />,
    halfIcon: <HalfStar />,
    filledIcon: <FullStar />,
    count: 5,
    isHalf: true,

    onChange: (newValue) => onChange({ target: { name, value: newValue } }),
    ...props,
  };

  return <ReactStars {...mergedProps} />;
}

export default CustomStars;
