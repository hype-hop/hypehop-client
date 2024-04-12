import { useState, useEffect } from 'react';
import { Stack, Rating } from '@mui/material';
import BASE_URL from '../config';

function TrackListForEdit({ data, onUpdateTrackRatingForEdit }) {
  const [trackRatingForEdit, setTrackRatingForEdit] = useState(null);
  const [, setTrackRating] = useState(null);
  const [albumData, setAlbumData] = useState(null);

  const id = data?.review.albumId;
  const tracksByDisc = {};
  const tracks = [];

  const handleRatingChange = (event, newValue, albumIndex, trackIndex) => {
    const updatedState = [...trackRatingForEdit];
    updatedState[albumIndex].trackRating[trackIndex] = newValue;
    setTrackRatingForEdit(updatedState);
    onUpdateTrackRatingForEdit(updatedState);
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/album/api/${id}`);

          const result = await response.json();
          setAlbumData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      setTrackRatingForEdit(data?.review.tracks);
      const trackRatingArray = Array(data?.review.tracks.length || 0).fill(null);
      setTrackRating(trackRatingArray);

      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data]);

  albumData?.albumData?.tracks.items.forEach((track, index) => {
    const discNumber = track.disc_number || 1;
    if (!tracksByDisc[discNumber]) {
      tracksByDisc[discNumber] = [];
    }
    tracksByDisc[discNumber].push(track);
    tracks.push(`disc${discNumber - 1}-${index + 1}.${track.name}`);
  });

  return (
    <div className="TrackList">
      {trackRatingForEdit?.map((album, albumIndex) => (
        <div key={album._id}>
          <h3>Disc Number: {album.discNumber}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {album.trackTitle.map((title, trackIndex) => (
              <div style={{ display: 'flex' }} key={trackIndex}>
                {title} -
                <Stack spacing={1}>
                  <Rating
                    name="trackRating"
                    value={album.trackRating[trackIndex]}
                    precision={0.5}
                    onChange={(event, newValue) => handleRatingChange(event, newValue, albumIndex, trackIndex)}
                  />
                </Stack>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrackListForEdit;
