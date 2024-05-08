import { Box, Modal, Typography, Button, Input } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { ReactComponent as Close } from '../../../assets/icons/modal-close.svg';
import { typography } from '../../../constants/themeValue';
import BASE_URL from '../../../config';

function ChangeName({
  open,
  setOpen,
  userId,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userId: string;
}) {
  const [formData, setFormData] = useState({
    name: '',
    userId,
  });
  const [error, setError] = useState(null);
  const handleClose = () => setOpen(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/api/edit-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setError(data?.errors[0]?.msg);
        } else {
          setError(data?.msg || 'Success');
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

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
            borderBottom: '1px solid rgb(52, 52, 52)',
          }}
        >
          <Typography
            fontSize={typography.size.lg}
            fontWeight={typography.weight.bold}
            sx={{ mt: '10px', mb: '10px' }}
            textAlign="center"
          >
            닉네임 변경
          </Typography>
          <Close
            onClick={() => setOpen(false)}
            style={{ position: 'absolute', top: 12, left: 272, width: '12', height: '12' }}
          />
        </Box>
        <Box sx={{ alignContent: 'center', justifyContent: 'center', pl: '16px', pr: '16px' }}>
          <Box sx={{ mt: '16px' }}>
            <Input name="name" value={formData.name} onChange={handleChange} fullWidth placeholder="닉네임 입력" />
            {error && (
              <Box className="error-message">
                <Typography
                  textAlign="left"
                  fontSize="fontSizeMd"
                  fontWeight="fontWeightRegular"
                  sx={{
                    mt: '10px',
                    ml: '8px',
                    color: 'rgb(131, 36, 254)',
                  }}
                >
                  *{error}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ pl: '8px', pr: '8px', pb: '16px' }}>
          <Button
            onClick={handleSubmit}
            fullWidth
            sx={{
              height: '30px',
              background: 'rgb(152, 72, 255)',
              mt: '16px',
            }}
          >
            <Typography fontSize={typography.size.md} fontWeight={typography.weight.medium}>
              저장
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ChangeName;
