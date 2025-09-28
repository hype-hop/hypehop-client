import { RefObject, useEffect, useState } from 'react';
import useClickOutside from './useClickOutside';

export const searchClickState = {
  INITIAL: 'initial',
  SEARCHING: 'searching',
  OUTSIDE: 'outside',
  FOCUSED: 'focused',
};
const useAlbumSearchInputState = ({
  albumSearchBoxRef,
  albumSearchInputRef,
}: {
  albumSearchBoxRef: RefObject<HTMLDivElement>;
  albumSearchInputRef: RefObject<HTMLInputElement>;
}) => {
  const [isClickedOutside, setIsClickedOutside] = useState<(typeof searchClickState)[keyof typeof searchClickState]>(
    searchClickState.INITIAL,
  );

  useClickOutside(albumSearchBoxRef, () => {
    setIsClickedOutside(searchClickState.OUTSIDE);
  });

  useEffect(() => {
    albumSearchInputRef.current?.addEventListener('click', () => {
      setIsClickedOutside(searchClickState.FOCUSED);
    });
  }, [albumSearchInputRef]);

  return { isClickedOutside, setIsClickedOutside };
};
export default useAlbumSearchInputState;
