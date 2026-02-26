import { Box, Modal, Typography, Button, Input } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import BASE_URL from '../../../config';

function ChangeName({
  open,
  setOpen,
  userId,
  onSuccess,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userId: string;
  onSuccess?: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    userId,
  });
  const [error, setError] = useState(null);
  const handleClose = () => setOpen(false);

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
          setOpen(false);
          onSuccess?.();
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
          top: '50%',
          left: '50%',
          boxSizing: 'border-box',
          transform: 'translate(-50%, -50%)',
          borderRadius: '16px',
          background: 'rgb(27, 27, 27)',
          width: '300px',
          outline: 'none',
          p: '16px',
        }}
      >
        <Box>
          <Input name="name" value={formData.name} onChange={handleChange} fullWidth placeholder="닉네임 입력" />

          <Box minHeight="24px">
            {error && (
              <Typography
                textAlign="left"
                sx={{
                  color: 'primary.main',
                }}
              >
                {error}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: '8px',
          }}
        >
          <Button fullWidth onClick={handleClose} color="white">
            닫기
          </Button>
          <Button fullWidth onClick={handleSubmit} variant="contained" color="primary">
            수정하기
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ChangeName;
