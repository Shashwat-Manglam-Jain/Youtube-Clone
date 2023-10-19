import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Search from './Search';
import { Stack } from '@mui/material';

const url = 'https://youtube-v31.p.rapidapi.com/search?q=music&part=snippet%2Cid&regionCode=US&maxResults=50&order=date';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9e7ccf6144mshb8836e663767cf1p13ec17jsn523b2556652c',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

function Video() {
  const [first, setfirst] = useState([]);
  const { videoId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setfirst(result.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const video = first.find((item) => item.id.videoId === videoId);

  return (
    <div>
      <div style={{ position: 'relative', width: '100%' }}>
        <Stack
          direction='row'
          padding={2}
          style={{ position: 'relative', zIndex: '2000', background: 'white', width: '100%' }}
        >
          <Link to='/'>
            <img src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Symbol.png" alt="youtube" height={45} />
          </Link>
          <Link to="/" style={{ paddingLeft: '8rem' }}>
            <Search />
          </Link>
        </Stack>
      </div>

      {video && (
        <div>
          <iframe
            width="1400"
            height="720"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            frameBorder="0"
            allowFullScreen
            style={{ position:'relative',left:'2.5rem' }}
            scrolling="no"
          ></iframe>
          <h2 style={{ padding: '0rem 2rem' }}>{video.snippet.title}</h2>
          <h3 style={{ padding: '0rem 2rem' }}> {video.snippet.channelTitle}☑</h3>
        </div>
      )}

      <div style={{ padding: '1rem 2rem', display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '40px', color: 'black' , width:'30vw'}}>
        {first.map((value, index) => (
          <div key={index} style={{ color: 'black' }} onClick={()=>{ window.scrollTo({
            top: 0,
            behavior: "smooth"
        });}}>
            <Link to={`/video/${value.id.videoId}?channelName=${value.snippet.channelTitle}`}>
              {value.snippet &&
                value.snippet.thumbnails &&
                value.snippet.thumbnails.high && (
                  <img src={value.snippet.thumbnails.high.url} height="300" width="430" alt="" />
                )}
              <h2 style={{ color: 'black',width: '30vw'  }}>{value.snippet.title}</h2>
              <h3 style={{ color: 'black' }}>{value.snippet.channelTitle}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Video;
