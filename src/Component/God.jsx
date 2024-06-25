import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Search from './Search';
import { Stack, Box, Grid, Typography, Skeleton } from '@mui/material';

const God = () => {
  const { name } = useParams();
  const url = `https://yt-api.p.rapidapi.com/search?query=${name}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '63c51fc540mshcb9f35603f6f2aep1ae95cjsnf569e911d906',
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
    },
  };

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setVideos(result.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);
  console.log(videos);

  return (
    <Box>
      {/* Header with logo and search bar */}
      <Stack
        direction='row'
        alignItems='center'
        padding={2}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          backgroundColor: 'white',
          width: '100%',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Link to='/'>
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Symbol.png"
            alt="youtube"
            height={45}
          />
        </Link>
        <Box ml={10} flexGrow={1}>
          <Search />
        </Box>
      </Stack>

      {/* Grid container for displaying videos */}
      <Grid container spacing={4} padding={4}>
        {loading ? (
          // Skeleton loading while fetching data
          Array.from({ length: 12 }).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ backgroundColor: 'white', color: 'black', padding: '1rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Skeleton variant="rectangular" width="100%" height={215} animation="wave" />
                <Skeleton variant="text" width="80%" animation="wave" />
                <Skeleton variant="text" width="60%" animation="wave" />
              </Box>
            </Grid>
          ))
        ) : error ? (
          // Display error message if data fetching fails
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        ) : (
          // Render videos once data is loaded
          videos.map((value, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Link to={`/video/${value.videoId}?channelName=${value.channelTitle}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {value.thumbnail && value.thumbnail.length > 0 && (
                <img
                  src={value.thumbnail[0].url}
                  alt={value.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                />
              )}
              <Typography variant="subtitle1" mt={2} noWrap>
                {value.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {value.channelTitle}
              </Typography>
            </Link>
          </Grid>
          
          ))
        )}
      </Grid>
    </Box>
  );
};

export default God;
