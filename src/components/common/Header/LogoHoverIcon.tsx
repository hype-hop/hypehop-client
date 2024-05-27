import { useEffect, useState } from 'react';
import { ReactComponent as LogoMainIcon } from '../../../assets/icons/logo-main.svg';
import { ReactComponent as LogoSubIcon } from '../../../assets/icons/logo-hover.svg';

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

  return count ? (
    <LogoMainIcon
      style={{
        width: 125,
        height: 20,
      }}
    />
  ) : (
    <LogoSubIcon
      style={{
        width: 125,
        height: 20,
      }}
    />
  );
}
