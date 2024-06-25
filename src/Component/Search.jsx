import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const CustomButton = styled('button')({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  marginRight: '8px',
  outline: 'none',
  '&:focus': {
    outline: 'none',
  },
  '&:active': {
    outline: 'none',
    boxShadow: 'none',
  },
});

const CustomInput = styled('input')({
  flex: 1,
  height: '100%',
  border: 'none',
  outline: 'none',
  paddingLeft: '12px',
  fontSize: '14px',
  width: '100%',
  '&:focus': {
    outline: 'none',
    border: 'none',
  },
});

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/Searching/${searchTerm.trim()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        boxShadow: 'none',
        width: '100%',
        maxWidth: 869,
        margin: 'auto',
        paddingLeft: 2,
        paddingRight: 1,
      }}
    >
      <CustomInput
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <CustomButton
        type="button"
        onClick={handleSearch}
      >
        <img
          src="https://www.creativefabrica.com/wp-content/uploads/2022/01/12/Search-Icon-Graphics-23357706-1.jpg"
          alt="Search"
          height={20}
          style={{ verticalAlign: 'middle' }}
        />
      </CustomButton>
    </Paper>
  );
}

export default Search;
