import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

const url ='https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=7ghhRHRP6t4&part=id%2Csnippet&type=video&maxResults=50';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '63c51fc540mshcb9f35603f6f2aep1ae95cjsnf569e911d906',
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
    },
  };

const RapidApi = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.items) {
          setVideos(result.items);
        }
        setLoading(false); // Data has been fetched
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center">
      {loading ? (
        Array.from({ length: 12 }).map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3} >
            <Skeleton variant="rectangular" width="20vw" height={200} animation="wave" />
            <Skeleton variant="text" width="20vw" animation="wave" />
            <Skeleton variant="text" width="20vw" animation="wave" />
          </Grid>
        ))
      ) : (
        videos.map((video, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Link to={`/video/${video.id.videoId}?channelName=${video.snippet.channelTitle}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
              <img
                src={video.snippet && video.snippet.thumbnails && video.snippet.thumbnails.high ? video.snippet.thumbnails.high.url : ''}
                alt={video.snippet && video.snippet.title ? video.snippet.title : ''}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
              />
              <div style={{ padding: '12px' }}>
                <h2 style={{ fontSize: '1rem', margin: '0', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {video.snippet && video.snippet.title ? video.snippet.title : ''}
                </h2>
                <p style={{ fontSize: '0.875rem', color: '#555', margin: '0' }}>
                  {video.snippet && video.snippet.channelTitle ? `${video.snippet.channelTitle} ☑` : ''}
                </p>
              </div>
            </Link>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default RapidApi;
