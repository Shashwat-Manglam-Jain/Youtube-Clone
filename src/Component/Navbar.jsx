import React from 'react';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Left from './Left';
import Search from './Search';







const Navbar = () => {
  return (<>
<Stack
      direction='row'
 padding={2} style={{position:'fixed',zIndex:'20',background:'white',width:'100vw'}}
    > <Link to='/'><img src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Symbol.png" alt="youtube"
    height={45}    /></Link>
      <Link to="/" style={{paddingLeft:'8rem'}} >
        <Search/>
      
      </Link>

    </Stack>
  
   <Left/>
    </>
  );
}

export default Navbar;
