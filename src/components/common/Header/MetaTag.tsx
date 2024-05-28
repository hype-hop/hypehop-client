/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Helmet } from 'react-helmet-async';
import BASE_URL from '../../../config';

interface MetaTagProps {
  title?: string;
  description?: string;
  imgSrc?: string;
  url?: string;
}

export default function MetaTag(props: MetaTagProps) {
  // eslint-disable-next-line react/destructuring-assignment
  const url = props.url ? `${BASE_URL}${props.url}` : BASE_URL;

  return (
    <Helmet>
      <title>{(props.title && `${props.title}`) || '하입합 앨범 리뷰 평점'}</title>
      <meta name="description" content={props.description || ''} />
      <meta property="og:title" content={props.title || '하입합 앨범 리뷰 평점'} />
      <meta property="og:site_name" content="하입합" />
      <meta property="og:description" content={props.description || 'default description'} />
      <meta property="og:image" content={props.imgSrc || 'image'} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}
