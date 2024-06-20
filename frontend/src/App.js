import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from './axios';
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import UserList from './components/UserList';


import './App.css'; // Make sure to import the CSS file

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="fixed-header">
          <h1>Social Media Platform</h1>
          <Navbar />
        </header>
        <main className="fixed-navbar">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat/:username" element={<Chat />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
