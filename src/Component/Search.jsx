import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Search() {
  const [first, setFirst] = useState('');
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate(`/Searching/${first}`);
    }
  };

  return (
    <>
      <Paper
        component="form"
        sx={{
          borderRadius: 20,
          border: '1px solid #e3e3e3',
          pl: 2,
          boxShadow: 'none',
          mr: { sm: 5 },
        }}
      >
        <input
          type="text"
          placeholder="search"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          onKeyPress={handleKeyPress} // Handle Enter key press
          style={{
            width: '70vw',
            height: '5vh',
            border: 'none',
            outline: 'none',
          }}
        />
        <Link to={`/Searching/${first}`}>
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2022/01/12/Search-Icon-Graphics-23357706-1.jpg"
            alt=""
            height={20}
            style={{ position: 'relative', top: '6px', right: '8px' }}
          />
        </Link>
      </Paper>
    </>
  );
}

export default Search;
