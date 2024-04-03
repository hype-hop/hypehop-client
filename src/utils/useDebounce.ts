import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsTyping(false);
    }, delay);

    return () => {
      clearTimeout(timer);
      setIsTyping(true);
    };
  }, [value, delay]);

  return { debouncedValue, isTyping };
};

export default useDebounce;
