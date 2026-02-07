'use client';

import { Box, Typography, Input, Button, Divider } from '@mui/material';
import { useActionState } from 'react';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import BASE_URL from '../../config';
import GoogleIcon from '../../assets/icons/googleIcon.svg';
import loginAction from './loginAction';

function LogInForm() {
  const param = useSearchParams();
  const callBackUrl = param.get('callbackUrl') || '';
  const [state, formAction] = useActionState((state, formData) => loginAction(state, formData, callBackUrl), {
    message: '',
  });

  return (
    <Box
      sx={{
        maxWidth: '588px',
        margin: '0 auto',
      }}
    >
      <Typography
        variant="h1"
        textAlign="center"
        sx={{
          mt: { xs: '0px', lg: '105px' },
        }}
      >
        로그인
      </Typography>
      <form className="form" action={formAction}>
        <Box className="flex-column">
          <label className="labels" htmlFor="email" />
          <Box className="inputForm" mt="40px">
            <Typography component="div" color="grey.main" mb={1}>
              이메일
            </Typography>
            <Input
              required
              fullWidth
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="이메일을 입력해주세요."
              sx={{
                borderRadius: '16px',
                mb: '16px',
              }}
            />
          </Box>
        </Box>

        <Box className="flex-column">
          <label className="labels" htmlFor="password" />
          <Box className="inputForm">
            <Typography component="div" color="grey.main" mb={1}>
              비밀번호
            </Typography>
            <Input
              required
              fullWidth
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="비밀번호를 입력해주세요."
            />
          </Box>
        </Box>

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
            {state.message}
          </Typography>
        </Box>

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
          alignItems: 'center',
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
    </Box>
  );
}

export default LogInForm;
