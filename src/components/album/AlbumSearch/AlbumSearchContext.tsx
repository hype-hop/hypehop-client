import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

export interface IAlbumSearchContext {
  pointedResultIndex: number;
  setPointedResultIndexDirectly: (_index: number) => void;
  increasePointedResultIndex: () => void;
  decreasePointedResultIndex: () => void;
}

const AlbumSearchContext = createContext<IAlbumSearchContext | undefined>(undefined);

export default function AlbumSearchContextProvider({ children }: { children: ReactNode }) {
  const [pointedResultIndex, setPointedResultIndex] = useState(0);

  const increasePointedResultIndex = () => {
    setPointedResultIndex((prev) => prev + 1);
  };

  const decreasePointedResultIndex = () => {
    setPointedResultIndex((prev) => prev - 1);
  };

  const setPointedResultIndexDirectly = (index: number) => {
    setPointedResultIndex(index);
  };

  const memoizedIndex = useMemo(() => {
    return {
      pointedResultIndex,
      setPointedResultIndex,
      increasePointedResultIndex,
      decreasePointedResultIndex,
      setPointedResultIndexDirectly,
    };
  }, [pointedResultIndex]);

  return <AlbumSearchContext.Provider value={memoizedIndex}>{children}</AlbumSearchContext.Provider>;
}

export const useAlbumSearchContext = (): IAlbumSearchContext => {
  const context = useContext(AlbumSearchContext);

  if (!context) {
    throw new Error('useContext should be executed inside of provider');
  }
  return context;
};
