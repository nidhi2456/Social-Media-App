// src/components/Register.js
import React, { useState } from 'react';
import axios from '../axios';
import '../css/register.css'; // Import the CSS file

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', {
        username,
        email,
        password
      });
      console.log('User registered:', response.data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const passShow = () => {
    console.log("clikced")
    const passwordField = document.getElementById('password');
      const toggleButton = document.querySelector('.toggle-password');
      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.textContent = 'Hide';
      } else {
        passwordField.type = 'password';
        toggleButton.textContent = 'Show';
      }
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="toggle-password" onClick={passShow}>Show</span>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
