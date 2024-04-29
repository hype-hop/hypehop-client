import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as PlusIcon } from '../../assets/icons/write.svg';

export default function FloatingActionButton() {
  return (
    <Link to="/album">
      <IconButton
        sx={{
          position: 'fixed',
          right: '15%',
          bottom: '10%',
          width: 60,
          height: 60,
          background: 'rgb(152, 72, 255)',
          ':hover': {
            background: 'rgb(152, 72, 255)',
          },
        }}
      >
        <PlusIcon />
      </IconButton>
    </Link>
  );
}
