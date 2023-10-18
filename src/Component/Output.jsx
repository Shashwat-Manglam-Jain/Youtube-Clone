import  { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Search from './Search';
import { Stack } from '@mui/material';


const Output = () => {
  const { input} = useParams();
  const url = `https://yt-api.p.rapidapi.com/search?query=${input}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '63c51fc540mshcb9f35603f6f2aep1ae95cjsnf569e911d906',
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
    },
  };

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setVideos(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Link to={`/Search/${name}`}></Link>
      <Stack
      direction='row'
 padding={2} style={{position:'fixed',zIndex:'20',background:'white',width:'100vw'}}
    > <Link to='/'><img src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Symbol.png" alt="youtube"
    height={45}    /></Link>
      <Link to="/" style={{paddingLeft:'8rem'}} >
        <Search/>
      
      </Link>

    </Stack>
    <div style={{display:'grid', gridTemplateColumns:'auto auto ' ,gap:'40px'}}>
        {videos.map((video, index) => (
        <div key={index}>
          <div
            style={{
              zIndex: '1',
              background: 'white',
              color: 'black',
              position: 'relative',
              top: '10rem',
              left: '5rem',
              width: '43vw',
          
            }}
          >
            <div key={index}>
              <div
                style={{           

              
                }}
              >
                <iframe
                  width="600"
                  height="345"
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0`}
                  frameBorder="0"
                  allowFullScreen
                  scrolling="no"
                  
                ></iframe>
                <p>
                  <h2>{video.title}</h2>
                </p>
                <p>
                  <h2>
                    {video.channelTitle} ☑
                    <span style={{ marginLeft: '17rem', fontSize: '1rem', color: 'gray' }}>
                      {video.viewCount} views
                    </span>
                  </h2>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Output;
