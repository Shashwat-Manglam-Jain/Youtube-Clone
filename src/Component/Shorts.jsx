import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Stack, Skeleton } from '@mui/material';

const API_KEY = 'AIzaSyDuUBQBD9dncpC5brObvAc6RoOjc4qWvAY';
const REGION_CODE = 'IN';

const fetchVideos = async (pageToken = '') => {
  const searchAPIUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&regionCode=${REGION_CODE}&q='india trending reel in hindi'&type=video&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;

  const searchResponse = await fetch(searchAPIUrl);
  if (!searchResponse.ok) {
    throw new Error('Failed to fetch search data');
  }
  const searchData = await searchResponse.json();

  const videoIds = searchData.items.map(item => item.id.videoId).join(',');
  const detailsAPIUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`;

  const detailsResponse = await fetch(detailsAPIUrl);
  if (!detailsResponse.ok) {
    throw new Error('Failed to fetch video details');
  }
  const detailsData = await detailsResponse.json();

  return {
    items: searchData.items.map((item, index) => ({
      ...item,
      contentDetails: detailsData.items[index].contentDetails
    })),
    nextPageToken: searchData.nextPageToken
  };
};

const Shorts = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);
  const [error, setError] = useState(null);
  const [pageToken, setPageToken] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  const parseISO8601Duration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  };

  const fetchMoreVideos = useCallback(async () => {
    if (isFetching || !pageToken) return;

    setIsFetching(true);
    try {
      const result = await fetchVideos(pageToken);
      const shorts = result.items.filter(video => {
        const duration = video.contentDetails.duration;
        const seconds = parseISO8601Duration(duration);
        return seconds <= 60;
      });
      setVideos(prevVideos => {
        const newVideos = [...prevVideos, ...shorts];
        newVideos.forEach((_, index) => {
          if (!videoRefs.current[index]) {
            videoRefs.current[index] = React.createRef();
          }
        });
        return newVideos;
      });
      setPageToken(result.nextPageToken || '');
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setIsFetching(false);
    }
  }, [pageToken, isFetching]);

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
        shorts.forEach((_, index) => {
          videoRefs.current[index] = React.createRef();
        });
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
      const container = containerRef.current;
      if (
        container.scrollHeight - container.scrollTop <= container.clientHeight + 500 && 
        !isFetching && 
        pageToken
      ) {
        fetchMoreVideos();
      }
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [fetchMoreVideos, isFetching, pageToken]);

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

    videoRefs.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, videos]);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div
        ref={containerRef}
        style={{
          padding: '0 1rem',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          backgroundColor: '#F9F9F9',
          scrollbarWidth: 'thin',
          scrollbarColor: '#FF0000 #FFFFFF',
        }}
      >
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
                  animation="wave"
                  style={{
                    borderRadius: '8px',
                    marginTop: '2rem',
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
              ref={videoRefs.current[index]}
            >
              <div style={{ position: 'relative', width: '100%', maxWidth: 360, height: 650, marginTop: '2rem' }}>
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
        {isFetching && (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <Skeleton variant="rectangular" width="100%" height={100} animation="wave" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Shorts;
