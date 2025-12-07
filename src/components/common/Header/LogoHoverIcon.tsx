'use client';

import { useEffect, useState } from 'react';
import LogoMainIcon from '../../../assets/icons/logo-main.svg';
import LogoSubIcon from '../../../assets/icons/logo-hover.svg';

export default function LogoHoverIcon() {
  const [count, setCount] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(!count);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  });

  return count ? <LogoMainIcon width={125} height={20} /> : <LogoSubIcon width={125} height={20} />;
}
