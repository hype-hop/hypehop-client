import { Avatar, Box, Modal, Typography, List, ListItem, ListItemAvatar, IconButton } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
// import Close from '../../../../assets/icons/modal-close.svg';
import Close from '@mui/icons-material/Close';
import { FavoriteClickedUser } from '../../../../types/favorite';

function FavoriteListModal({
  open,
  setOpen,
  favoriteClickedUsers,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  favoriteClickedUsers: FavoriteClickedUser[];
}) {
  const handleClose = () => setOpen(false);
  const isFavoriteClickedUsers = favoriteClickedUsers.length > 0;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          boxSizing: 'border-box',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgb(52, 52, 52)',
          borderRadius: '16px',
          background: 'rgb(27, 27, 27)',
          width: '90%',
          maxWidth: '630px',
          maxHeight: '296px',
          outline: 'none',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            height: '48px',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: isFavoriteClickedUsers ? '1px solid rgb(196, 196, 196)' : 'none',
          }}
        >
          <Typography component="div" fontWeight="bold" fontSize={{ xs: '16px', sm: '20px' }}>
            {isFavoriteClickedUsers ? '좋아요' : '아직 좋아요를 누른 사용자가 없어요.'}
          </Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', top: 2, right: 0, padding: 'none' }}>
            <Close style={{ width: 24, height: 24, color: 'white' }} />
          </IconButton>
        </Box>

        <List
          sx={{
            maxHeight: '230px',
            overflowY: 'scroll',
          }}
        >
          {favoriteClickedUsers.map(({ name, image }) => (
            <ListItem key={name} sx={{ height: '64px', paddingX: '16px', alignItems: 'center', cursor: 'pointer' }}>
              <ListItemAvatar>
                <Avatar sx={{ width: '30px', height: '30px' }} src={image} />
              </ListItemAvatar>
              <Typography fontSize="18px">{name}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
}

export default FavoriteListModal;
