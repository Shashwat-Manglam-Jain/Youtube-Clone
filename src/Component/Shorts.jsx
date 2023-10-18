import React, { useEffect, useState } from 'react';
import Search from './Search';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const url = 'https://yt-api.p.rapidapi.com/shorts/sequence?params=GhEKCzBJNkZXMkZYX2I4GAAgASoCGA9CAGIEUkRTSA%253D%253D.Cgt4QTg3Z0ltOWdScyi56NqeBg%253D%253D';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '63c51fc540mshcb9f35603f6f2aep1ae95cjsnf569e911d906',
		'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
	}
};
const Shorts = () => {
  const [first, setFirst] = useState([]);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setFirst(result.data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchShorts();
  }, []);

  return (
    <>
     <Stack
      direction='row'
 padding={2} style={{position:'fixed',zIndex:'20',background:'white',width:'100vw'}}
    > <Link to='/'><img src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Symbol.png" alt="youtube"
    height={45}    /></Link>
      <Link to="/" style={{paddingLeft:'8rem'}} >
        <Search/>
      
      </Link>

    </Stack>
      {first.map((value, index) => (
        <div key={index} style={{position:'relative',left:'35rem',margin:'4rem  0rem'}}>
         <iframe
                  width="360"
                  height="650"
                  src={`https://www.youtube.com/embed/${value.videoId}`} 
                  frameBorder="0"
                  allowFullScreen
                  scrolling="onChange"
                ></iframe>
                <p>
               
                </p>
        </div>
      ))}
    </>
  );
};

export default Shorts;
