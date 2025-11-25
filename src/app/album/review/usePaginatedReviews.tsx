'use client';

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import fetchPaginatedReviews from '../../../api/reviews';
import debounce from '../../../utils/debounce';

const usePaginatedReviews = (genre: string) => {
  const {
    data: paginatedReviews,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['paginatedReviews', genre],
    queryFn: ({ pageParam = 1 }) => fetchPaginatedReviews(pageParam, genre),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPageParam + 1;
    },
    getPreviousPageParam: () => {
      return undefined;
    },
  });

  const setScrollPostionToSession = () => {
    if (window.scrollY === 0) return;
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
  };

  const debouncedFetchWhenInView = debounce(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
      fetchNextPage();
    }
  }, 100);

  const handleScroll = () => {
    setScrollPostionToSession();
    debouncedFetchWhenInView();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }
  }, []);

  return { paginatedReviews, isLoading, fetchNextPage };
};

export default usePaginatedReviews;
