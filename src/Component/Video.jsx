import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Search from './Search';
import { Stack, Grid, Typography, Box, Skeleton } from '@mui/material';

const API_URL = 'https://youtube-v31.p.rapidapi.com/search';
const API_KEY = '9e7ccf6144mshb8836e663767cf1p13ec17jsn523b2556652c';
const API_HOST = 'youtube-v31.p.rapidapi.com';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
  },
};

function Video() {
  const { videoId } = useParams();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        const response = await fetch(`${API_URL}?relatedToVideoId=${videoId}&part=id%2Csnippet&type=video&maxResults=12`, options);
        const result = await response.json();
        setRelatedVideos(result.items);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRelatedVideos();
  }, [videoId]);

  return (
    <Box >
      <Stack
        direction='row'
        alignItems='center'
        padding={2}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          background: 'white',
          width: '100%',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Link to='/'>
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Symbol.png"
            alt="youtube"
            height={45}
            style={{ marginRight: 16 }}
          />
        </Link>
        <Search />
      </Stack>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} px={2} py={4}>
        <Box flex={1} pr={{ md: 4 }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            <div style={{ position: 'relative', paddingBottom: '66.25%', height: 0 }}>
              <iframe
                title="YouTube Video Player"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                frameBorder="0"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                scrolling="no"
              ></iframe>
            </div>
          </div>
        
        </Box>

        <Box flex={1} pl={{ md: 4 }}>
          <Typography variant="h5" mt={{ xs: 4, md: 0 }}>
            Related Videos
          </Typography>
          <Grid container spacing={2} mt={2}>
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Skeleton variant="rectangular" width="100%" height={150} />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="80%" />
                  </Grid>
                ))
              : relatedVideos.map((value, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Link to={`/video/${value.id.videoId}?channelName=${value.snippet.channelTitle}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {value.snippet &&
                        value.snippet.thumbnails &&
                        value.snippet.thumbnails.high && (
                          <img
                            src={value.snippet.thumbnails.high.url}
                            alt={value.snippet.title}
                            style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                          />
                        )}
                      <Typography variant="subtitle1" mt={2} noWrap>
                        {value.snippet.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {value.snippet.channelTitle}
                      </Typography>
                    </Link>
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Video;
