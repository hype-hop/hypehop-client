'use client';

import { Avatar, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { StyledMenu, StyledMenuItem } from '../StyledMenu';
import { typography } from '../../../constants/themeValue';
import BASE_URL from '../../../config';
import { useAuth } from '../../../AuthenticationContext';

export default function ProfileMenu() {
  const { user, setUser } = useAuth();
  const [anchorProfile, setAnchorProfile] = useState(null);
  const handleMenuProfile = (event) => {
    setAnchorProfile(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorProfile(null);
  };
  const handleChange = (event) => {
    setUser(event.target.checked);
  };
  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuProfile}
        sx={{ color: 'white.main' }}
      >
        <Avatar
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
          }}
          src={user?.image}
          alt="user"
        />
      </IconButton>
      <StyledMenu
        id="menu-appbar"
        anchorEl={anchorProfile}
        open={Boolean(anchorProfile)}
        onClose={handleCloseProfile}
        width={200}
      >
        <Link href="/my-information" style={{ textDecorationLine: 'none' }}>
          <StyledMenuItem onClick={handleCloseProfile}>
            <PersonIcon sx={{ marginRight: '16px', color: 'white.main' }} />
            <Typography fontSize={typography.size.md} sx={{ color: 'white.main' }}>
              마이 프로필
            </Typography>
          </StyledMenuItem>
        </Link>

        <Link href={`${BASE_URL}/api/logout`} style={{ textDecorationLine: 'none' }}>
          <StyledMenuItem onClick={handleChange}>
            <LogoutIcon sx={{ marginRight: '16px', color: 'white.main' }} />
            <Typography fontSize={typography.size.md} sx={{ color: 'white.main' }}>
              로그아웃
            </Typography>
          </StyledMenuItem>
        </Link>
      </StyledMenu>
    </>
  );
}
