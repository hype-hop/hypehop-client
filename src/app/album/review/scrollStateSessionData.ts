import { ScrollState } from '../../../types/scrollState';

const saveScrollStateSessionData = (data: ScrollState) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('ScrollState', JSON.stringify(data));
  }
};

const getScrollStateSessionData = (): ScrollState | null => {
  if (typeof window !== 'undefined') {
    const data = sessionStorage.getItem('ScrollState');
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export { saveScrollStateSessionData, getScrollStateSessionData };
