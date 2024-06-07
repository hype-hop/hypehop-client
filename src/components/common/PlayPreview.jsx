import { Box, Button } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { useState, useEffect } from 'react';

const audioController = {
  currentAudio: null,
  setCurrentAudio(audio) {
    if (this.currentAudio && this.currentAudio !== audio) {
      this.currentAudio.pause();
    }
    this.currentAudio = audio;
  },
};

function PlayPreview({ previewUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (audioController.currentAudio) {
        audioController.currentAudio.pause();
      }
    };
  }, []);

  const handlePlayPause = (url) => {
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
      {previewUrl && (
        <Button onClick={() => handlePlayPause(previewUrl)}>
          {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
        </Button>
      )}
    </Box>
  );
}

export default PlayPreview;
