import { SyntheticEvent, useState } from 'react';

const useTabs = (tabName: string) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const tabProps = (index: number) => {
    return {
      id: `${tabName}-tab-${index}`,
      'aria-controls': `${tabName}-tabpanel-${index}`,
    };
  };
  const handleChangeCurrentTab = (event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return { currentTab, setCurrentTab, tabProps, handleChangeCurrentTab };
};

export default useTabs;
