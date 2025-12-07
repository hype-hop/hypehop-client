'use client';

import { IconButton } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import LogoHoverIcon from './Header/LogoHoverIcon';
import LogoMainIcon from '../../assets/icons/logo-main.svg';

export default function AppLogo() {
  const [logoHover, setLogoHover] = useState(false);

  const handleHoverLogoOver = () => {
    setLogoHover(true);
  };

  const handleHoverLogoOut = () => {
    setLogoHover(false);
  };
  return (
    <Link href="/">
      <IconButton
        onClick={handleHoverLogoOut}
        onMouseOver={handleHoverLogoOver}
        onMouseOut={handleHoverLogoOut}
        disableRipple
        sx={{ padding: 0 }}
      >
        {logoHover ? <LogoHoverIcon /> : <LogoMainIcon width={125} height={20} />}
      </IconButton>
    </Link>
  );
}
