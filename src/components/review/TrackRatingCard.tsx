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
        <Box sx={{ width: '100%', height: '336px', overflow: 'auto' }}>
          {tracks.map((disc, index) => (
            <List key={index} sx={{ bgcolor: 'inherit' }}>
              {isMultipleDisc && (
                <Typography sx={{ mb: '16px' }} fontSize={typography.size.lg} fontWeight="400" component="div">
                  Disc {index + 1}
                </Typography>
              )}
              <List component="nav" aria-label="tracks">
                {disc.trackTitle.map((track, trackIndex) => (
                  <ListItem key={trackIndex} sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <ListItemText
                        sx={{
                          fontSize: 'typography.size.lg',
                          fontWeight: 400,
                          flex: '1',
                          width: '150px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          margin: '0px',
                        }}
                        primary={track}
                      />
                      <ListItemText
                        sx={{ fontSize: '14px', fontWeight: 400, color: 'white' }}
                        secondary={
                          <Box
                            sx={{
                              display: 'flex',
                              alignContent: 'center',
                              justifyContent: 'center',
                              ml: 'auto',
                              width: '46px',
                              height: '20px',
                            }}
                          >
                            <StarIcon fontSize="small" sx={{ color: 'star.main', mt: '1px', mr: '2.46px' }} />
                            <Typography
                              sx={{
                                width: '15.33px',
                                alignContent: 'center',
                                fontSize: '11px',
                                fontWeight: '400',
                              }}
                            >
                              {/* eslint-disable-next-line no-unsafe-optional-chaining */}
                              {tracks[index].trackRating && tracks[index].trackRating[trackIndex]
                                ? Number(tracks[index].trackRating[trackIndex]).toFixed(1)
                                : ' --'}
                            </Typography>
                          </Box>
                        }
                      />
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
