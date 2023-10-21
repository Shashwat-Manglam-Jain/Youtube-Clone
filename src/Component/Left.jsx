import React, { useState } from 'react';
import Icon from './Iconapi';
import { useNavigate } from 'react-router-dom';
import Thumbnail from './Thumbnail';
import RapidApi from '../RapidApi';
import { Link} from 'react-router-dom';
import God from './God';



const Left = () => { const navigate=useNavigate();
  const [first, setfirst] = useState(Icon);
  const [ang, setang] = useState('New');

  return (<div style={{display:'flex'}}>
    <div style={{
  borderRight:"1px solid black", width:'10.2rem',position:'relative',top:'5.5rem'
  }} >  <button style={{
    width:'10rem',position:'relative',display:'flex'
    }} onClick={()=>{navigate('/Shorts')}}><div style={{marginLeft:'0.34rem'}}> <i class="fa-solid fa-circle-play"></i></div> <div  style={{marginLeft:'1.36rem'}} > Shorts</div> </button>
      {first.map((value, index) => (<Link to={`Search/${value.name}`} key={index}>
        <button  style={{display:'flex', flexDirection:'row',alignItems:'center',width:'10rem',height:'3rem'}} onClick={()=>{setang(value.name)}}>
          <p style={{ paddingRight:'1.2rem'}}>
            {value.icon}    </p>
         <div>   <span style={{ position: 'relative' , bottom:'0.2rem', }}>  {value.name}</span>
     </div>
      
        </button>
        
        </Link>
      ))}
         
    </div>
    
    <div >
     <p > &nbsp;   <span  style={{color:'black',position:'fixed',top:'5rem',left:'19rem',zIndex:'1',fontSize:'2rem',background:'white',width:'100vw'}}>{ang}  Videos  </span></p>

   
       </div>
 

    {/* <Thumbnail/> */}
    <RapidApi/>
    </div>
  );
};

export default Left;
