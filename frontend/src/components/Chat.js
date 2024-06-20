import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios.js'; // Assuming you have axios installed
import io from 'socket.io-client';
import '../css/chat.css'; // Import your CSS file for styling

const Chat = () => {
  const { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socket.current = io('http://localhost:5000'); // Replace with your backend URL

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/messages/${username}`, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        // Ensure messages are ordered from oldest to newest
        // setMessages(response.data);
        setMessages(response.data.sort((a, b) => new Date(a.date) - new Date(b.date)));
        // console.log(response.data.sort((a, b) => new Date(a.date) - new Date(b.date)))
        scrollToBottom();
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Listen for new messages from the server
    socket.current.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    return () => {
      socket.current.disconnect();
    };
  }, [username]);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('/messages', { receiverUsername: username, text: newMessage }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      const sentMessage = response.data;
      setNewMessage('');
      // Manually add the new message to the state for immediate feedback
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === username ? 'sent' : 'received'}`}>
            <p>{message.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
