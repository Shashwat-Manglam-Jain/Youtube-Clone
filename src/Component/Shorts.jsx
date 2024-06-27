import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Stack, Skeleton } from '@mui/material';

const API_KEY = 'AIzaSyDuUBQBD9dncpC5brObvAc6RoOjc4qWvAY';
const REGION_CODE = 'IN';

const fetchVideos = async (pageToken = '') => {
  const API_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&regionCode=${REGION_CODE}&q='india trending reel in hindi'&type=video&videoDuration=short&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;

  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const Shorts = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);
  const [error, setError] = useState(null);
  const [pageToken, setPageToken] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const fetchMoreVideos = useCallback(async () => {
    setIsFetching(true);
    try {
      const result = await fetchVideos(pageToken);
      const shorts = result.items.filter(video => {
        const duration = video.contentDetails.duration;
        const seconds = parseISO8601Duration(duration);
        return seconds <= 60;
      });
      setVideos(prevVideos => [...prevVideos, ...shorts]);
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
        const shorts = result.items.filter(video => {
          const duration = video.contentDetails.duration;
          const seconds = parseISO8601Duration(duration);
          return seconds <= 60;
        });
        setVideos(shorts);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoElement = entry.target.querySelector('iframe');
          if (entry.isIntersecting) {
            const src = videoElement.getAttribute('src');
            if (!src.includes('autoplay=1')) {
              videoElement.src = src.replace('autoplay=0', 'autoplay=1');
            }
          } else {
            const src = videoElement.getAttribute('src');
            if (src.includes('autoplay=1')) {
              videoElement.src = src.replace('autoplay=1', 'autoplay=0');
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRefs.current) {
      videoRefs.current.forEach((ref) => ref && observer.observe(ref));
    }

    return () => {
      if (videoRefs.current) {
        videoRefs.current.forEach((ref) => ref && observer.unobserve(ref));
      }
    };
  }, [loading]);

  const parseISO8601Duration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  };

  return (
    <>
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
        {/* Optional: Add any header content here */}
      </Stack>

      <div style={{
        marginTop: '1rem',
        padding: '0 1rem',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        height: 'calc(100vh - 6rem)',
      }}>
        {loading ? (
          Array.from({ length: 16 }).map((_, index) => (
            <div
              key={index}
              style={{
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'center',
                scrollSnapAlign: 'start',
              }}
            >
              <div style={{ position: 'relative', width: '100%', maxWidth: 360, height: 650 }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  style={{
                    marginBottom: '2rem',
                    borderRadius: '8px',
                    scrollSnapAlign: 'start',
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          videos.map((video, index) => (
            <div
              key={index}
              style={{
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'center',
                scrollSnapAlign: 'start',
              }}
              ref={(el) => (videoRefs.current[index] = el)}
            >
              <div style={{ position: 'relative', width: '100%', maxWidth: 360, height: 650 }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=0&loop=1&playlist=${video.id.videoId}`}
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  }}
                ></iframe>
              </div>
            </div>
          ))
        )}
      </div>

      {isFetching && (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <Skeleton variant="rectangular" width="100%" height={100} />
        </div>
      )}
    </>
  );
};

export default Shorts;
