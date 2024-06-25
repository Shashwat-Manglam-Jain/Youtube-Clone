
import { BrowserRouter, Routes ,Route } from 'react-router-dom';

import Navbar from './Component/Navbar';
import Left from './Component/Left';
import Video from './Component/Video';
import God from './Component/God';
import Output from './Component/Output';
import Shorts from './Component/Shorts';







const App = () => {
  return (
    <BrowserRouter>

 <Routes>

 <Route path='/' element={  <Navbar/>}/>
  <Route path='/video/:videoId' element={  <Video/>}/>
  <Route path='/:name' element={  <Left/>}/>
  <Route path="/Search/:name" element={<God/>} />
  <Route path="/Searching/:input" element={<Output />} />
  <Route path="/Shorts" element={<Shorts />} />
 </Routes>
 
    </BrowserRouter>
  )
}

export default App
