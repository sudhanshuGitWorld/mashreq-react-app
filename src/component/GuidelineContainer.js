import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { guidelines, text } from '../constant/textConstants';

const GuidelineContainer = () => {
    return (
        <Box sx={{ position: 'absolute', top: '21%', left: '13%', width: '26%' }}>
                <Grid item xs={12}>
                  <Stack direction="column" spacing={2}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{ mt: '1em', textAlign: 'center' }}
                    >
                      {text.welcome}
                    </Typography>
                    <Typography component='span' variant="h6" style={{ marginTop: '0', textAlign: 'center' }}>
                      {text.subline}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sx={{ mt: '2em' }}>
                  <Stack direction="column" spacing={2}>
                    {guidelines?.map((item, idx) => (  
                      <List key={idx} style={{ marginTop: '10px', padding: '0' }}>
                        <ListItem sx={{ padding: '0'}}>
                          <ListItemIcon sx={{ color: '#fff', minWidth: '3em'}}>
                            <CheckCircleIcon />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      </List>
                    ))}
                  </Stack>
                </Grid>
              </Box>
    );
}
 
export default GuidelineContainer;
