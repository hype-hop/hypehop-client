'use client';

import { Box, Typography, Input, Button, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../AuthenticationContext';
import BASE_URL from '../../config';

import GoogleIcon from '../../assets/icons/googleIcon.svg';

function LogInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isError = searchParams.get('error');
  const { user } = useAuth();
  const [isTyping, setIsTyping] = useState(false);
  const [refUrl, setRefUrl] = useState('/');
  const failedEmail = searchParams.get('email') || '';
  useEffect(() => {
    if (searchParams.get('album')) {
      setRefUrl('/album');
    }
  }, [searchParams, user, router]);

  const handleChange = () => {
    setIsTyping(true);
  };

  useEffect(() => {
    if (isError && isTyping) {
      router.push('/login');
    }
  }, [isError, isTyping, router]);

  return (
    <>
      <Typography
        variant="h1"
        textAlign="center"
        sx={{
          mt: { xs: '0px', lg: '105px' },
        }}
      >
        로그인
      </Typography>
      <form className="form" action={`${BASE_URL}/api/login`} method="POST">
        {/*    <form className="form" onSubmit={handleSubmit}>  */}
        <Box className="flex-column">
          <Input type="refUrl" name="refUrl" sx={{ display: 'none' }} value={refUrl} />
          <label className="labels" htmlFor="email" />
          <Box className="inputForm">
            <Input
              onChange={handleChange}
              required
              fullWidth
              type="email"
              id="email"
              name="email"
              value={failedEmail}
              className="form-control"
              placeholder="이메일을 입력해주세요."
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
          <label className="labels" htmlFor="password" />
          <Box className="inputForm">
            <Input
              onChange={handleChange}
              required
              fullWidth
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="비밀번호를 입력해주세요."
              sx={{
                borderRadius: '16px',
                backgroundColor: 'background.default',
                border: '1px solid rgb(52, 52, 52)',
              }}
            />
          </Box>
        </Box>
        {isError && !isTyping ? (
          <Box>
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
              *등록되지 않은 아이디이거나 비밀번호를 잘못 입력하셨습니다.
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography />
          </Box>
        )}
        <Button
          fullWidth
          type="submit"
          className="button-submit"
          sx={{
            borderRadius: '16px',
            background: 'rgb(152, 72, 255)',
            height: '60px',
            mt: '31px',
          }}
        >
          <Typography>로그인</Typography>
        </Button>
      </form>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '16px',
        }}
      >
        <Typography sx={{ mr: '5px' }}>계정이 없으신가요?</Typography>
        <Link href="/join" style={{ color: 'inherit', textDecoration: 'none' }}>
          <Typography sx={{ color: 'rgb(152, 72, 255)' }}>회원가입</Typography>{' '}
        </Link>
      </Box>

      <Box className="youtube">
        <Box sx={{ mt: '24px' }}>
          <Divider
            variant="middle"
            sx={
              {
                /* background: 'rgb(86, 87, 87)' */
              }
            }
          >
            OR
          </Divider>

          <Link href={`${BASE_URL}/auth/google`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button
              fullWidth
              sx={{
                mt: '24px',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgb(52, 52, 52)',
                borderRadius: '16px',
                height: '50px',
                padding: '0 16px',
              }}
            >
              <Box sx={{ width: '16px', display: 'flex', justifyContent: 'center', mr: '4px' }}>
                <GoogleIcon />
              </Box>

              <Typography fontSize="14px" fontWeight="500">
                구글 계정으로 로그인하기
              </Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default LogInForm;
