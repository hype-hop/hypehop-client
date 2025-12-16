const BASE_URL =
  process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_API_URL : 'https://server.hypehop.co.kr';

export default BASE_URL;
