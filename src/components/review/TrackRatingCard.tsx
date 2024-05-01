import React from 'react';
import { Card, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { typography } from '../../constants/themeValue';

function TrackRatingCard({ data }) {
  return (
    <Card
      variant="outlined"
      sx={{
        ml: '67px',
        width: '287px',
        height: '500px',
        padding: '16px',
        overflow: 'auto',
        bgcolor: 'background.default',
        justifyContent: 'center',
        border: '1px solid',
        borderColor: 'rgb(52,52,52)',
        borderRadius: '0px 16px 16px 16px',
      }}
    >
      <Box sx={{ margin: 'auto', width: '100%', maxWidth: 360 }}>
        {data?.review.tracks.map((disc, index) => (
          <Card key={index} sx={{ mb: 2, bgcolor: 'background.default' }}>
            <Typography fontSize={typography.size.lg} component="div">
              Disc {index + 1}
            </Typography>
            <List component="nav" aria-label="tracks">
              {disc.trackTitle.map((track, trackIndex) => (
                <ListItem key={trackIndex} sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          fontSize: '12px',
                          fontWeight: 400,
                          flex: '1',
                          maxWidth: '150px',
                          minWidth: '150px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        },
                      }}
                      primary={track}
                    />
                    <ListItemText
                      secondaryTypographyProps={{ sx: { fontSize: '14px', fontWeight: 400, color: 'white' } }}
                      secondary={
                        <Box
                          sx={{
                            display: 'flex',
                            alignContent: 'center',
                            justifyContent: 'center',
                            ml: 'auto',
                            width: '46px',
                            height: '20px',
                            border: '1px solid rgb(86, 87, 87) ',
                            borderRadius: '67px',
                          }}
                        >
                          <StarIcon fontSize="small" sx={{ color: 'white.main', mt: '1px' }} />
                          <Typography
                            sx={{
                              width: '15.33px',
                              alignContent: 'end',
                              fontSize: '11px',
                              fontWeight: '400',
                            }}
                          >
                            {' '}
                            {/* eslint-disable-next-line no-unsafe-optional-chaining */}
                            {data?.review.tracks[index].trackRating &&
                            data?.review.tracks[index].trackRating[trackIndex]
                              ? Number(data?.review.tracks[index].trackRating[trackIndex]).toFixed(1)
                              : '--'}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
          </Card>
        ))}
      </Box>
    </Card>
  );
}

export default TrackRatingCard;
