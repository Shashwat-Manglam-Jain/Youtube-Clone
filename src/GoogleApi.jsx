import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const API_KEY = 'AIzaSyDuUBQBD9dncpC5brObvAc6RoOjc4qWvAY';
const REGION_CODE = 'IN';

const fetchVideos = async (pageToken = '') => {
  const API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=${REGION_CODE}&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const GoogleApi = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageToken, setPageToken] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const fetchMoreVideos = useCallback(async () => {
    setIsFetching(true);
    try {
      const result = await fetchVideos(pageToken);
      setVideos(prevVideos => [...prevVideos, ...result.items]);
      setPageToken(result.nextPageToken || '');
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setIsFetching(false);
    }
  }, [pageToken]);

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const result = await fetchVideos();
        setVideos(result.items);
        setPageToken(result.nextPageToken || '');
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    initialFetch();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500 && !isFetching) {
        fetchMoreVideos();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchMoreVideos, isFetching]);

  const isMobile = useMediaQuery('(max-width:600px)');

  const buttonStyle = {
    color: 'white',
    backgroundColor: '#ff0000',
    border: 'none',
    position: 'fixed',
    padding: '8px 16px',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    bottom: '20px', // Adjust bottom position for fixed positioning
    right: '20px', // Adjust right position for fixed positioning
    zIndex: 1000, // Ensure button is on top of other content
  };

  const buttonHoverStyle = {
    backgroundColor: '#e60000',
  };

  return (
    <Grid container spacing={2} justifyContent="center" style={{ padding: 20, overflowX: 'hidden' }}>
      {loading ? (
        Array.from({ length: 24 }).map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3} style={{ maxWidth: 'auto' }}>
            <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
            <Skeleton variant="text" width="80%" animation="wave" />
            <Skeleton variant="text" width="20vw" animation="wave" />
          </Grid>
        ))
      ) : error ? (
        <Grid item xs={12}>
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        </Grid>
      ) : (
        <>
          {isMobile && (
            <Grid item xs={12} style={{ textAlign: 'right', position: 'fixed', bottom: '20px', right: '10px', zIndex: 1000 }}>
              <Link to="/Shorts" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  startIcon={<PlayCircleFilledIcon />}
                  style={buttonStyle}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                >
                  Shorts
                </Button>
              </Link>
            </Grid>
          )}

          {videos.map((video, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3} style={{ overflow: 'hidden', maxWidth: '100%' }}>
              <Link to={`/video/${video.id}?channelName=${video.snippet.channelTitle}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                />
                <Box p={2} style={{ paddingBottom: isMobile ? '8px' : '16px' }}>
                  <Typography variant="subtitle1" style={{ marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap', fontSize: isMobile ? '14px' : '16px' }}>
                    {video.snippet.title}
                  </Typography>
                  <Typography variant="body2" style={{ color: '#555', marginBottom: '8px', fontSize: isMobile ? '12px' : '14px' }}>
                    {video.snippet.channelTitle} • {new Date(video.snippet.publishedAt).toDateString()}
                  </Typography>
                  <Typography variant="body2" style={{ color: '#777', fontSize: isMobile ? '12px' : '14px' }}>
                    {parseInt(video.statistics.viewCount).toLocaleString()} views • {parseInt(video.statistics.likeCount).toLocaleString()} likes
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </>
      )}
      {isFetching && (
        <Grid item xs={12}>
          <Typography variant="body1" color="textSecondary" align="center">
            Loading more videos...
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default GoogleApi;
