import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Chat.css'; // import a separate CSS file for the component styles
import {api} from '../helpers/api';
import { Paper, TextInput, Button, Space } from "@mantine/core";
function Chat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setChatHistory([{ text: 'Welcome! How can I assist you today?', from: 'bot' }]);
  }, []);


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
      setError("Something went wrong. Please try again later.");
      setChatHistory(prevChatHistory => [...prevChatHistory, { text: error, from: 'bot' }]);

    }
    setIsLoading(false);
    setMessage('');
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Chat Component</h1>
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index}>
          {message.from === 'user' ?          
          <Paper
            style={{
              padding: 10,
              marginLeft: 410,
              width: 300,
              backgroundColor: "white",
              border: "2px solid rgb(229, 130, 67)",
              boxShadow: "rgb(229, 130, 67) 4px 5px",
              color: "#454546",
            }}
          >
            <h5 style={{ color: "#454546", marginTop: "0px" }}>You</h5>
            <div
              style={{
                color: "#454546",
                marginTop: "-10px",
                fontStyle: "italic",
              }}
            >
              {message.text}
            </div>
          </Paper>:             <div>
              <Paper
                style={{
                  padding: 10,
                  margin: 10,
                  width: 300,
                  backgroundColor: "white",
                  border: "2px solid rgb(244, 110, 223)",
                  boxShadow: "rgb(244, 110, 223) 4px 5px",
                  color: "#454546",
                }}
              >
                {/* Author name */}
                <h4 style={{ color: "#454546", marginTop: "-0px" }}>
                  Abraham Lincoln
                </h4>

                {error ? (
                  <> {error} </>
                ) : (
                  <div style={{ color: "#454546" ,fontStyle: "italic",}}>{message.text}</div>
                )}
              </Paper>
            </div>}
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
