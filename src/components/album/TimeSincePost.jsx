import React from 'react';

function TimeSincePost({ createdAt }) {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const difference = now - createdDate;

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365); // Calculate years

  let timeSince;

  if (years > 0) {
    // Handles cases more than a year
    timeSince = `${years}년 전`;
  } else if (days > 30) {
    // For dates more than 20 days but less than a year, show month and day
    timeSince = createdDate.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });
  } else if (days > 0) {
    timeSince = `${days}일 전`;
  } else if (hours > 0) {
    timeSince = `${hours}시간 전`;
  } else if (minutes > 0) {
    timeSince = `${minutes}분 전`;
  } else {
    // For very recent posts
    timeSince = `방금 전`;
  }

  return <div>{timeSince}</div>;
}

export default TimeSincePost;
