import { Box, Typography, Input, Button } from '@mui/material';
import { useState } from 'react';
import BASE_URL from '../../config';

function EditProfile({ userId }) {
  const [formData, setFormData] = useState({
    name: '',
    userId,
  });
  const [error, setError] = useState(null);

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
    <>
      <Typography
        variant="h1"
        textAlign="center"
        sx={{
          mt: '105px',
        }}
      >
        회원가입
      </Typography>

      <Box className="flex-column">
        <label htmlFor="name" />
        <Box className="inputForm">
          <Input
            fullWidth
            type="name"
            id="name"
            name="name"
            className="form-control"
            placeholder="닉네임을 입력해주세요."
            onChange={handleChange}
            value={formData.name}
            sx={{
              borderRadius: '16px',
              mb: '16px',
              mt: '40px',
              backgroundColor: 'background.default',
              border: '1px solid rgb(52, 52, 52)',
            }}
          />
        </Box>
      </Box>

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

      <Button
        onClick={handleSubmit}
        fullWidth
        id="submit"
        type="submit"
        className="button-submit"
        sx={{
          borderRadius: '16px',
          background: 'rgb(152, 72, 255)',
          height: '60px',
          mt: '31px',
        }}
      >
        <Typography fontSize="16px" fontWeight="500">
          가입하기
        </Typography>
      </Button>
    </>
  );
}

export default EditProfile;
