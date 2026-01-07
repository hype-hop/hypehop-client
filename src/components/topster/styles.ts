export const switchSx = {
  width: 44,
  height: 24,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: '2px',
    transitionDuration: '200ms',
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: 'rgb(152, 72, 255)',
        opacity: 1,
        border: 0,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 20,
    height: 20,
    boxShadow: 'none',
  },
  '& .MuiSwitch-track': {
    borderRadius: 12,
    backgroundColor: 'rgb(86, 87, 87)',
    opacity: 1,
  },
};

export const sliderSx = {
  height: 4,
  '& .MuiSlider-thumb': {
    width: 16,
    height: 16,
    backgroundColor: 'white',
    boxShadow: 'none',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: 'none',
    },
  },
  '& .MuiSlider-track': {
    backgroundColor: 'rgb(152, 72, 255)',
    border: 'none',
  },
  '& .MuiSlider-rail': {
    backgroundColor: 'rgb(86, 87, 87)',
    opacity: 1,
  },
};
