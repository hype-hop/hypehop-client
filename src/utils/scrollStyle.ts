const scrollStyle = {
  web: {
    default: {
      scrollbarWidth: 'thin', // Firefox
      scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent', // Firefox (thumb, track)
      '&::-webkit-scrollbar': {
        height: '6px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '3px',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        },
      },
    },
  },
};

export default scrollStyle;
