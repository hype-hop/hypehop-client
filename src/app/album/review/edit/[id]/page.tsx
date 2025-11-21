'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Error from 'next/error';
import EditReview from '../../../../../components/review/EditReview';
import BASE_URL from '../../../../../config';
import { ReviewEdit } from '../../../../../types/review';
import { AlbumData } from '../../../../../types/albumData';

function EditReviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [reviewData, setReviewData] = useState<ReviewEdit | null>(null);
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);

  // 리뷰 데이터 가져오기
  const fetchReviewData = async () => {
    if (!id) return;

    try {
      const response = await fetch(`${BASE_URL}/album/api/review/edit/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        if (response.status === 404) {
          return;
        }
      }

      const result = await response.json();
      setReviewData(result);
    } catch (error) {
      console.error('Error fetching review data:', error);
    }
  };

  // 앨범 데이터 가져오기
  const fetchAlbumData = useCallback(async (albumId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/album/api/${albumId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const result = await response.json();
      setAlbumData(result);
    } catch (error) {
      console.error('Error fetching album data:', error);
    }
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    fetchReviewData();
  }, []);

  // 리뷰 데이터가 로드되면 앨범 데이터 로드
  useEffect(() => {
    if (reviewData?.review?.albumId) {
      fetchAlbumData(reviewData.review.albumId);
    }
  }, [reviewData?.review?.albumId, fetchAlbumData]);

  return (
    <div className="Edit-review">
      {reviewData && albumData && <EditReview reviewData={reviewData} albumData={albumData} />}
    </div>
  );
}

export default EditReviewPage;
