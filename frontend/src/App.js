import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';

import Places from './components/Places';
import Detail from './components/Detail';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Header from './components/Header';
import AddNewPlace from './components/AddNewPlace';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
 let userToken= localStorage.getItem("userToken")


  return (
    <BrowserRouter>
    <Header/>
      <div className="App">
        
          <Routes>

            {userToken ?<>
              <Route path='/' element={<Home/>}/>
              <Route path='/places' element={<Places/>}/>
              <Route path='/places/:id' element={<Detail/>}/>  
              <Route path='/places/new' element={<AddNewPlace/>}/>
            </> : 
              <>
              <Route path='/login' element={<Login/>}/> 
              <Route path='/signUp' element={<SignUp/>}/> 
              </>
                }
              <Route path='/*' element={<NotFound/>}/>
          </Routes>
          
      </div>
    </BrowserRouter>
  );
}

export default App;
