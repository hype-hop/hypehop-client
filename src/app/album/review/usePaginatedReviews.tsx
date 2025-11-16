'use client';

import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { PaginatedReviews } from '../../../types/review';
import fetchPaginatedReviews from '../../../api/reviews';
import debounce from '../../../utils/debounce';

const usePaginatedReviews = (genre: string) => {
  const [paginatedReviews, setPaginatedReviews] = useState<PaginatedReviews>({ totalPage: 0, reviews: [] });
  const page = useRef(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const stopLoadMore = isLoading || page.current === paginatedReviews.totalPage;

  const loadPaginatedReviews = useCallback(
    async (isInitial: boolean = false) => {
      const paginatedReviews = await fetchPaginatedReviews(page.current, genre);

      if (!paginatedReviews || paginatedReviews.reviews.length === 0) {
        return;
      }

      const newPaginatedReviews = (prev: PaginatedReviews) =>
        isInitial
          ? { totalPage: paginatedReviews.totalPage, reviews: paginatedReviews.reviews }
          : {
              ...prev,
              reviews: [...prev.reviews, ...paginatedReviews.reviews],
            };
      setPaginatedReviews((prevData) => newPaginatedReviews(prevData));

      page.current = Math.min(page.current + 1, paginatedReviews.totalPage);
    },
    [page, genre],
  );

  useEffect(() => {
    loadPaginatedReviews(true);
  }, [genre]);

  useEffect(() => {
    console.log(page.current);
  }, [page.current]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
      if (stopLoadMore) return;
      setIsLoading(true);
      loadPaginatedReviews().then(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    const debouncedScrollHandler = debounce(handleScroll, 500);

    window.addEventListener('scroll', debouncedScrollHandler);

    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
    };
  });

  return { paginatedReviews, loadPaginatedReviews, stopLoadMore, isLoading };
};

export default usePaginatedReviews;
