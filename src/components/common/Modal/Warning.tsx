import { Box, Modal, Typography, Button } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { ReactComponent as Close } from '../../../assets/icons/modal-close.svg';
import { ReactComponent as WarningImg } from '../../../assets/icons/warning.svg';

function Warning({
  open,
  setOpen,
  handleDelete,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
}) {
  const handleClose = () => setOpen(true);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          display: 'grid',
          top: '50%',
          left: '50%',
          boxSizing: 'border-box',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgb(52, 52, 52)',
          borderRadius: '16px',
          background: 'rgb(27, 27, 27)',
          width: '300px',
          height: '178px',
          outline: 'none',
        }}
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Close
            onClick={() => setOpen(false)}
            style={{ position: 'absolute', top: 12, left: 272, width: '12', height: '12' }}
          />
        </Box>
        <Box sx={{ alignContent: 'center', justifyContent: 'center', display: 'grid' }}>
          <Box sx={{ mt: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <WarningImg />
          </Box>
          <Typography sx={{ mt: '16px', mb: '24px' }} textAlign="center">
            삭제하시겠습니까?
          </Typography>
        </Box>
        <Box sx={{ pl: '8px', pr: '8px', pb: '16px' }}>
          <Button
            onClick={() => handleDelete()}
            fullWidth
            sx={{
              height: '30px',
              background: 'rgb(152, 72, 255)',
            }}
          >
            <Typography>삭제</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default Warning;
