import React, { useEffect, useState, useRef } from 'react';
import { Stack, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';

const url = 'https://yt-api.p.rapidapi.com/shorts/sequence?params=GhEKCzBJNkZXMkZYX2I4GAAgASoCGA9CAGIEUkRTSA%253D%253D.Cgt4QTg3Z0ltOWdScyi56NqeBg%253D%253D';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '63c51fc540mshcb9f35603f6f2aep1ae95cjsnf569e911d906',
    'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
  },
};

const Shorts = () => {
  const [first, setFirst] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setFirst(result.data); 
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchShorts();
  }, []);

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
        {/* Add your header content here */}
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
           
            style={{
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'center',
              scrollSnapAlign: 'start',
            }}
          
          >
            <div style={{ position: 'relative', width: 360, height: 650 }}>
            <Skeleton
              key={index}
              variant="rectangular"
              width={360}
              height={650}
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
          first.map((value, index) => (
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
              <div style={{ position: 'relative', width: 360, height: 650 }}>
                <iframe
                  width="360"
                  height="650"
                  src={`https://www.youtube.com/embed/${value.videoId}?autoplay=0`}
                  frameBorder="0"
                  allowFullScreen
                  mute="true"
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
    </>
  );
};

export default Shorts;
