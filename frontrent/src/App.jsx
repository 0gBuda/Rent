// App.jsx
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Registration from "./components/Registration";
import AccountPage from "./components/AccountPage";
import HouseDetailsPage from "./components/HouseDetailsPage";

const App = () => {
    return (
        <Router>
            <div>
                <Header/>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/registration' element={<Registration/>} />
                <Route path='/account' element={<AccountPage/>} />
                <Route path='/houses/:house_id' element={<HouseDetailsPage/>} />
            </Routes>
        </div>
        </Router>
    );
}

export default App;
