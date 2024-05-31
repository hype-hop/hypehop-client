import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Input, Button } from '@mui/material';
import BASE_URL from '../config';

function JoinPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/api/join`, {
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
          navigate('/login');
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
          mt: { xs: '0px', lg: '105px' },
        }}
      >
        회원가입
      </Typography>

      <div className="section">
        <form className="form" onSubmit={handleSubmit} method="POST">
          <Box className="flex-column">
            <label htmlFor="name" />
            <Box className="inputForm">
              <Input
                fullWidth
                type="name"
                id="name"
                name="name"
                className="form-control"
                placeholder="아이디를 입력해주세요."
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
          <Box className="flex-column">
            <label htmlFor="email" />
            <Box className="inputForm">
              <Input
                fullWidth
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="이메일을 입력해주세요."
                onChange={handleChange}
                value={formData.email}
                sx={{
                  borderRadius: '16px',
                  backgroundColor: 'background.default',
                  border: '1px solid rgb(52, 52, 52)',
                  mb: '16px',
                }}
              />
            </Box>
          </Box>

          <Box className="flex-column">
            <label htmlFor="password" />
            <Box className="inputForm">
              <Input
                fullWidth
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="비밀번호를 입력해주세요."
                onChange={handleChange}
                value={formData.password}
                sx={{
                  borderRadius: '16px',
                  backgroundColor: 'background.default',
                  border: '1px solid rgb(52, 52, 52)',
                  mb: '16px',
                }}
              />
            </Box>
          </Box>

          <Box className="flex-column">
            <label htmlFor="password2" />
            <Box className="inputForm">
              <Input
                fullWidth
                type="password"
                id="password2"
                name="password2"
                className="form-control"
                placeholder="비밀번호를 확인해주세요."
                onChange={handleChange}
                value={formData.password2}
                sx={{
                  mb: '16px',
                  borderRadius: '16px',
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
            회원가입
          </Button>
        </form>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: '16px',
          }}
        >
          <Typography sx={{ mr: '5px' }}>이미 계정이 있으신가요?</Typography>
          <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Typography sx={{ color: 'rgb(152, 72, 255)' }}>로그인</Typography>{' '}
          </Link>
        </Box>
      </div>
    </>
  );
}

export default JoinPage;
