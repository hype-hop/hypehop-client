/* eslint-disable react/destructuring-assignment */

import { Helmet } from 'react-helmet-async';

interface MetaTagProps {
  title?: string;
  description?: string;
  imgSrc?: string;
}

export default function MetaTag(props: MetaTagProps) {
  return (
    <Helmet>
      <title>{(props.title && `${props.title}`) || '하입합 | 앨범 리뷰'}</title>
      <meta
        name="description"
        content={
          props.description || '하입합, hypehop, 앨범 리뷰, 힙합, 음악, 차트, 앨범 차트, 힙합 차트, 앨범, 앨범 평점'
        }
      />
      <meta property="og:title" content={props.title || ' 리뷰 평점'} />
      <meta property="og:site_name" content="하입합" />
      <meta property="og:description" content={props.description || ''} />
      <meta property="og:image" content={props.imgSrc || 'image'} />
    </Helmet>
  );
}
