import React, { useState, useEffect } from 'react';
import Icon from './Iconapi';
import { useNavigate } from 'react-router-dom';
import RapidApi from '../RapidApi';
import { Link } from 'react-router-dom';
import { useMediaQuery, Skeleton } from '@mui/material';

const Left = () => {
  const navigate = useNavigate();
  const [first, setFirst] = useState(Icon); // Assuming Icon is an array of objects with 'name' and 'icon' properties
  const [ang, setAng] = useState('New');
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 600px)'); // Define your breakpoint here

  // Simulating data fetching delay with setTimeout
  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1500); // Simulate delay of 1.5 seconds
    };

    fetchData();
  }, []);

  const buttonStyles = {
    width: '11rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '3rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
    paddingLeft: '10px',
    transition: 'color 0.3s, background-color 0.3s',
    outline: 'none', // Remove focus outline
  };

  const buttonHoverStyles = {
    backgroundColor: '#f0f0f0',
    color: '#000',
  };

  return (
    <div style={{ display: 'flex' }}>
      {!isMobile && (
        <div
          style={{
            borderRight: '1px solid black',
            width: '11.5rem',
            position: 'fixed',
            marginRight: '10px',
            overflowY: 'auto', // Ensure vertical scrollbar appears when content overflows
            maxHeight: 'calc(100vh - 70px)', // Example: Restricting height to the viewport height minus header height
            zIndex: 1, // Ensure the sidebar is above other content
          }}
        >
          {loading ? (
            // Skeleton loading for Shorts button and other buttons
            <>
              <Skeleton variant="rectangular" height={48} style={{ marginBottom: '10px' }} />
              {Array.from({ length: 13 }).map((_, index) => (
                <Skeleton key={index} variant="rectangular" height={48} style={{ marginBottom: '10px' }} />
              ))}
            </>
          ) : (
            <>
              <button
                style={{
                  ...buttonStyles,
                  ...(ang === 'Shorts' ? buttonHoverStyles : null),
                }}
                onClick={() => {
                  setAng('Shorts');
                  navigate('/Shorts');
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <i className="fa-solid fa-circle-play" style={{ marginRight: '8px' }}></i>
                Shorts
              </button>
              {first.map((value, index) => (
                <Link to={`/search/${value.name}`} key={index} style={{ textDecoration: 'none' }}>
                  <button
                    style={{
                      ...buttonStyles,
                      ...(ang === value.name ? buttonHoverStyles : null),
                    }}
                    onClick={() => setAng(value.name)}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {value.icon}
                    <span style={{ marginLeft: '8px' }}>{value.name}</span>
                  </button>
                </Link>
              ))}
            </>
          )}
        </div>
      )}
      <div style={{ marginLeft: isMobile ? '0' : '12.5rem' }}>
        {/* Content that should not overlap with the fixed sidebar */}
        <RapidApi />
      </div>
    </div>
  );
};

export default Left;
