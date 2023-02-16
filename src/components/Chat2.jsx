import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css'; // import a separate CSS file for the component styles
import {api} from '../helpers/api';

function Chat() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await axios.post(api.posts.chat, { text:message });
      console.log(result.data.id);
      setResponse([...response, { text: message, from: 'user' }, { text: result.data.id, from: 'bot' }]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    setMessage(''); // clear the message input field after sending
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Chat Component</h1>
      <div className="chat-history">
        {response.map((message, index) => (
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
