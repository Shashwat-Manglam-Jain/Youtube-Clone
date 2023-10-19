import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const url ='https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=7ghhRHRP6t4&part=id%2Csnippet&type=video&maxResults=50';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9e7ccf6144mshb8836e663767cf1p13ec17jsn523b2556652c',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

const RapidApi = () => {
  const [first, setfirst] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.items) {
          setfirst(result.items);
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
    <>
      <div
        style={{
          display: "grid",
         gridTemplateColumns: 'auto auto auto ', // Adjust column size automatically
          gap: "20px",
          position: "relative",
          top: "9rem",
          right: "11rem",
          color: "black",
          left: "2rem",
          background: "white",
          zIndex: "1",
          width:'30vw'
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          first.map((value, index) => (
            <div
              key={index}
              style={{ border: "1px solid #ddd", padding: "10px" }}
            >
              <Link to={`/video/${value.id.videoId}?channelName=${value.snippet.channelTitle}`}>
                {value.snippet &&
                  value.snippet.thumbnails &&
                  value.snippet.thumbnails.high && (
                    <img
                      src={value.snippet.thumbnails.high.url}
                      height="300"
                      width="380"
                      alt=""
                    />
                  )}
                <h2 style={{ color: 'black',  width:'25vw', overflow:'hidden'}}>{value.snippet.title}</h2>
                <h3 style={{ color: 'black' }}>{value.snippet.channelTitle}☑</h3>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default RapidApi;
