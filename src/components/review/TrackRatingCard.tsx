import React from 'react';
import { Card, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { typography } from '../../constants/themeValue';

function TrackRatingCard({ data }) {
  const tracks = data?.review?.tracks || [];
  const isMultipleDisc = tracks.length > 1;
  return (
    <Box>
      <Typography variant="h1" component="div" sx={{ mt: { xs: '40px', sm: '40px' }, mb: '16px' }}>
        트랙별 평점
      </Typography>
      <Card
        variant="outlined"
        sx={{
          mb: { xs: '40px', sm: '40px', md: '40px', lg: '0px' },
          width: { xs: '100%', sm: '100%', md: '287px', lg: '287px' },
          p: 2,
          bgcolor: 'grey.darkest',
          justifyContent: 'center',
          borderRadius: '12px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxHeight: '336px',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgb(86,87,87)',
              borderRadius: '4px',
            },
          }}
        >
          {tracks.map((disc, index) => (
            <List key={index} sx={{ bgcolor: 'inherit' }}>
              {isMultipleDisc && (
                <Typography sx={{ mb: '16px' }} fontSize={typography.size.lg} fontWeight="400" component="div">
                  Disc {index + 1}
                </Typography>
              )}
              <List
                component="nav"
                aria-label="tracks"
                sx={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                {disc.trackTitle.map((track, trackIndex) => (
                  <ListItem key={trackIndex} sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Box
                        sx={{
                          fontWeight: 400,
                          flex: 1,
                          minWidth: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {track}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                        <StarIcon fontSize="small" sx={{ color: 'star.main', mr: '2.46px' }} />
                        <Typography component="span" sx={{ color: 'text.primary', minWidth: '24px' }}>
                          {tracks[index].trackRating && tracks[index].trackRating[trackIndex]
                            ? Number(tracks[index].trackRating[trackIndex]).toFixed(1)
                            : '--'}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </List>
          ))}
        </Box>
      </Card>
    </Box>
  );
}

export default TrackRatingCard;
