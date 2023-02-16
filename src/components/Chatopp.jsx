import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';
import {api} from '../helpers/api';
function Chat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMessage = { text: message, from: 'user' };
    setChatHistory([...chatHistory, newMessage]);
    setIsLoading(true);
    try {
      const result = await axios.post(api.posts.chat, { text: message});
      const botMessage = { text: result.data.id, from: 'bot' };
      setChatHistory(prevChatHistory => [...prevChatHistory, botMessage]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    setMessage('');
  };
  return (
    <div className="chat-container">
      <h1 className="chat-title">Chat Component</h1>
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={message.from === 'user' ? 'chat-message user-message' : 'chat-message bot-message'}>
            <div className="chat-message-text">{message.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} className="chat-input" />
        <button type="submit" className="chat-button">Send</button>
      </form>
      {isLoading && <div>Loading...</div>}
    </div>
  );

}

export default Chat;
