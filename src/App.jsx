import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/components/Login'
import Edituser from '../src/components/EditUser'
import UserList from '../src/components/UserList'

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/users' element={<UserList/>}/>
        <Route path='/edit/:id' element={<Edituser/>}/>
    </Routes>
  );
};
export default App;
