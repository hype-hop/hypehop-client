import { Box } from '@mui/material';
import { AlbumDetailType } from '../../../types/albumDetail';

function AlbumDetailTracks({ data }: { data: AlbumDetailType }) {
  const tracksByDisc = {};

  data?.albumData.tracks.items.forEach((track) => {
    const discNumber = track.disc_number || 1;
    if (!tracksByDisc[discNumber]) {
      tracksByDisc[discNumber] = [];
    }
    tracksByDisc[discNumber].push(track);
  });

  return (
    <>
      {Object.keys(tracksByDisc).map((discNumber) => (
        <div key={discNumber}>
          <h3>
            Disc
            {discNumber}
          </h3>
          <Box>
            {tracksByDisc[discNumber].map((track, index) => (
              <div key={index}>
                {index + 1}.{track.name} -{' '}
                {Number.isNaN(data?.storedAverageArr[Number(discNumber) - 1]?.values[index])
                  ? '평점이 없습니다.'
                  : data?.storedAverageArr[Number(discNumber) - 1]?.values[index]}
              </div>
            ))}
          </Box>
        </div>
      ))}
    </>
  );
}

export default AlbumDetailTracks;
