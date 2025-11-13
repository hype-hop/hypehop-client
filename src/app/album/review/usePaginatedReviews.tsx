import { useCallback, useEffect, useState } from 'react';
import { PaginatedReviews } from '../../../types/review';
import fetchPaginatedReviews from '../../../api/reviews';
import debounce from '../../../utils/debounce';

const usePaginatedReviews = (genre: string) => {
  const [paginatedReviews, setPaginatedReviews] = useState<PaginatedReviews>({ totalPage: 0, reviews: [] });
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const stopLoadMore = isLoading || page === totalPage;

  const loadInitalPaginatedReviews = useCallback(async () => {
    const paginatedReviews = await fetchPaginatedReviews(page, genre);
    if (paginatedReviews) {
      setPaginatedReviews({ totalPage: paginatedReviews?.totalPage, reviews: paginatedReviews?.reviews });
      setTotalPage(paginatedReviews.totalPage);
    }
  }, [page, genre]);

  const loadPaginatedReviews = useCallback(async () => {
    const paginatedReviews = await fetchPaginatedReviews(page, genre);

    if (!paginatedReviews || paginatedReviews.reviews.length === 0) {
      return;
    }

    setPaginatedReviews((prevData) => ({
      ...prevData!,
      reviews: [...prevData!.reviews, ...paginatedReviews.reviews],
    }));

    setPage((prevPage) => Math.min(prevPage + 1, paginatedReviews.totalPage));
  }, [page, genre]);

  useEffect(() => {
    loadInitalPaginatedReviews();
  }, [genre]);

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
