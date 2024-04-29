// import { Review } from './review';

interface SenderInfo {
  sender_id: string;
  name: string;
  displayName: string;
}

interface ReviewInfo {
  title: string;
  _id: string;
}

export interface Notification {
  sender_id: SenderInfo;
  recipient_id: string;
  type: string;
  review_id: ReviewInfo;
  text: string;
  timestamp: Date;
}
