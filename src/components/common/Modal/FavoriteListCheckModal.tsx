import { Avatar, Box, Modal, Typography, List, ListItem, ListItemAvatar } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { ReactComponent as Close } from '../../../assets/icons/modal-close.svg';
import { FavoriteClickedUser } from '../../../types/favorite';

function FavoriteListCheckModal({
  open,
  setOpen,
  favoriteClickedUsers,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  favoriteClickedUsers: FavoriteClickedUser[];
}) {
  const handleClose = () => setOpen(false);

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
          maxWidth: '650px',
          maxHeight: '296px',
          outline: 'none',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            height: '66px',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: '1px solid rgb(196, 196, 196)',
          }}
        >
          <Close onClick={() => setOpen(false)} style={{ position: 'absolute', top: 24, right: 20 }} />
          <Typography component="div" fontWeight="bold" fontSize="24px">
            좋아요
          </Typography>
        </Box>
        <List
          sx={{
            maxHeight: '230px',
            overflowY: 'scroll',
          }}
        >
          {favoriteClickedUsers?.map(({ name, image }) => (
            <ListItem key={name} sx={{ height: '76px', paddingX: '16px', alignItems: 'center', cursor: 'pointer' }}>
              <ListItemAvatar>
                <Avatar sx={{ width: '35px', height: '35px' }} src={image} />
              </ListItemAvatar>
              <Typography fontSize="20px">{name}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
}

export default FavoriteListCheckModal;
