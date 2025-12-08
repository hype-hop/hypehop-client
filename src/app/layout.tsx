import type { Metadata } from 'next';

import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import MainLayoutWrapper from '../components/MainLayoutWrapper';
import CommonRootLayout from '../components/common/RootLayout';

export const metadata: Metadata = {
  title: '하입합 | 앨범 리뷰',
  description: '하입합, hypehop, 앨범 리뷰, 힙합, 음악, 차트, 앨범 차트, 힙합 차트, 앨범, 앨범 평점',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta property="og:title" content="리뷰 평점" />
      <meta property="og:site_name" content="하입합" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="image" />
      <body className="antialiased">
        <AppRouterCacheProvider>
          <MainLayoutWrapper>
            <CommonRootLayout>{children}</CommonRootLayout>
          </MainLayoutWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
