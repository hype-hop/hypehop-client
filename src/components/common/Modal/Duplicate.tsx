import { Box, Modal, Typography, Button } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { ReactComponent as Close } from '../../../assets/icons/modal-close.svg';
import { ReactComponent as Warning } from '../../../assets/icons/warning.svg';

function Duplicate({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) {
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
            <Warning />
          </Box>
          <Typography sx={{ mt: '16px', mb: '24px' }} textAlign="center">
            중복된 앨범 리뷰입니다.
          </Typography>
        </Box>
        <Box sx={{ pl: '8px', pr: '8px' }}>
          <Button
            onClick={() => setOpen(false)}
            fullWidth
            sx={{
              height: '30px',
            }}
          >
            <Typography>확인</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default Duplicate;
