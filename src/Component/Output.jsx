import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { Grid, Typography, Badge, Stack, Box } from '@mui/material';
import Search from './Search';

const Output = () => {
  const { input } = useParams();
  const url = `https://yt-api.p.rapidapi.com/search?query=${input}`;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '9e7ccf6144mshb8836e663767cf1p13ec17jsn523b2556652c',
    'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
  },
};
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setVideos(result.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);
  console.log(videos);

  return (
    <Box>

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

      
      <Grid container spacing={2} justifyContent="center" style={{ padding: 20 }}>
        {loading ? (
         
          Array.from({ length: 12 }).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
              <Skeleton variant="text" width="80%" animation="wave" />
              <Skeleton variant="text" width="60%" animation="wave" />
            </Grid>
          ))
        ) : (
         
          videos.map((video, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Link  to={`/video/${video.videoId}?channelName=${video.title}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
                <img
                  src={video.thumbnail && video.thumbnail.length > 0 ? video.thumbnail[0].url : ''}
                  alt={video.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                />
                <Box p={2}>
                  <Typography variant="subtitle1" style={{ marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {video.title}
                  </Typography>
                  <Typography variant="body2" style={{ color: '#555', marginBottom: '8px' }}>
                    {video.channelTitle} • {video.publishDate}
                  </Typography>
                  <Typography variant="body2" style={{ color: '#777' }}>
                    {video.viewCount} views • {video.lengthText}
                  </Typography>
                  <div style={{ marginTop: '8px' }}>
                    {/* Mapping badges with proper styling */}
                    {video.badges && video.badges.map((badge, bIndex) => (
                      <Badge key={bIndex} color="primary" badgeContent={badge} style={{ marginRight: '8px' }}>
                        <Typography variant="caption" style={{ color: 'white' }}>
                          {badge}
                        </Typography>
                      </Badge>
                    ))}
                  </div>
                </Box>
              </Link>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Output;
