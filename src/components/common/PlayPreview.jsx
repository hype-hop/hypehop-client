import { Box } from '@mui/material';
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { useState, useEffect } from 'react';
import { ReactComponent as Play } from '../../assets/icons/playButton.svg';
import { ReactComponent as Pause } from '../../assets/icons/pauseButton.svg';

const audioController = {
  currentAudio: null,
  setCurrentAudio(audio) {
    if (this.currentAudio && this.currentAudio !== audio) {
      this.currentAudio.pause();
    }
    this.currentAudio = audio;
  },
};

function PlayPreview({ previewUrl, size }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (audioController.currentAudio) {
        audioController.currentAudio.pause();
      }
    };
  }, []);

  const handlePlayPause = (event, url) => {
    event.stopPropagation();
    event.preventDefault();

    if (!audioController.currentAudio || audioController.currentAudio.src !== url) {
      const newAudio = new Audio(url);
      newAudio.addEventListener('play', () => setIsPlaying(true));
      newAudio.addEventListener('pause', () => setIsPlaying(false));
      newAudio.addEventListener('ended', () => setIsPlaying(false));
      audioController.setCurrentAudio(newAudio);
      newAudio.play();
    } else if (audioController.currentAudio.paused) {
      audioController.currentAudio.play();
    } else {
      audioController.currentAudio.pause();
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (audioController.currentAudio) {
      const handleEnded = () => setIsPlaying(false);
      audioController.currentAudio.addEventListener('ended', handleEnded);
      return () => {
        audioController.currentAudio.removeEventListener('ended', handleEnded);
      };
    }
  }, [isPlaying]);

  return (
    <Box>
      {previewUrl ? (
        <Box sx={{ ml: '10px', mt: '4px', mr: '6px' }} onClick={(event) => handlePlayPause(event, previewUrl)}>
          {isPlaying ? <Pause sx={size ? { fontSize: size } : {}} /> : <Play sx={size ? { fontSize: size } : {}} />}
        </Box>
      ) : (
        <Box sx={{ ml: '10px', mt: '4px', mr: '6px' }} />
      )}
    </Box>
  );
}

export default PlayPreview;
