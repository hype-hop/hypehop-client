'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function ReviewsLayout({ children }) {
  return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
}

export default ReviewsLayout;
