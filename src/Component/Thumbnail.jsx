import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import './Thumbnail.css'; // Example CSS file for styling

const url = 'https://yt-api.p.rapidapi.com/trending?geo=US';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '9e7ccf6144mshb8836e663767cf1p13ec17jsn523b2556652c',
    'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
  },
};

const Thumbnail = () => {
  const [videos, setVideos] = useState([]);
  const [openVideo, setOpenVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setVideos(result.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error(error);
        setLoading(false); // Handle loading state on error
      }
    }

    fetchData();
  }, []);

  const handleToggleAccordion = (index) => {
    if (openVideo === index) {
      setOpenVideo(null);
    } else {
      setOpenVideo(index);
    }
  };

  return (
    <div className="thumbnail-container">
      <div className="video-grid">
        {loading ? (
          // Skeleton loading while data is being fetched
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={560}
              height={315}
              style={{ marginBottom: '2rem', borderRadius: '8px' }}
            />
          ))
        ) : (
          // Render videos once data is fetched
          videos.map((video, index) => (
            <div key={index} className="video-card">
              <iframe
                className="video-iframe"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0`}
                frameBorder="0"
                allowFullScreen
                scrolling="no"
              ></iframe>
              <div className="video-details">
                <h2 className="video-title">{video.title}</h2>
                <div className="video-meta">
                  <span className="channel">{video.channelTitle}</span>
                  <span className="views">{video.viewCount} views</span>
                </div>
                <button className="description-toggle" onClick={() => handleToggleAccordion(index)}>
                  {openVideo === index ? 'Close Description ⬆' : 'Open Description ⬇'}
                </button>
                {openVideo === index && (
                  <div className="description">
                    <p>{video.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Thumbnail;
