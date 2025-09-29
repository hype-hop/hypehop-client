import { useState } from 'react';
import readNotification from '../api/notification';

const useNotification = () => {
  const [anchorNoti, setAnchorNoti] = useState(null);
  const [hasUnreadNoti, setHasUnreadNoti] = useState(false);

  const handleMenuNoti = (event) => {
    setAnchorNoti(event.currentTarget);
    if (hasUnreadNoti) {
      readNotification();
    }

    setHasUnreadNoti(false);
  };

  const handleCloseNoti = () => {
    setAnchorNoti(null);
  };

  return { anchorNoti, hasUnreadNoti, handleMenuNoti, handleCloseNoti, setHasUnreadNoti };
};

export default useNotification;
