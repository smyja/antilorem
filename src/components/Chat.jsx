import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { Paper, TextInput, Button, Space } from "@mantine/core";
import axios from "axios";
import { api } from "../helpers/api";
import "../test.css";


// set backcground color of the entire page

const Chat = () => {
  const [text, setText] = useState("");
  const [prevMessage, setPrevMessage] = useState([]);
  const [prevOutput, setPrevOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!text) { 
      setError("Please enter a question.");
      return;
    }
  
    setError(null);
    
    const currentMessage = text;
    setPrevMessage([...prevMessage, currentMessage]);
    setLoading(true);
  
    const timeoutId = setTimeout(() => {
      setError("Sorry, there was an error processing your request.");
      setLoading(false);
    }, 5000);
  
    axios.post(api.posts.chat, { name: text, length: 15 })
      .then(response => {
        clearTimeout(timeoutId);
        const answer = response.data.output;
        setPrevOutput([...prevOutput, answer]);
        setLoading(false);
      })
      .catch(error => {
        setError("Sorry, there was an error processing your request.");
        setLoading(false);
      });
  };
  
  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Text"
          placeholder="Ask a question"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "550px",
            marginLeft: "5px",
          }}
        ></TextInput>
        <Space h="md" />
        <Button
          type="submit"
          style={{
            marginLeft: "5px",
          }}
        >
          Submit
        </Button>
      </form>
      {/* display message as chat after submit */}
      {/* display a prevMessage for each prevOutput */}

      {prevMessage.map((message, index) => (
        <div key={index}>
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
              {message}
            </div>
          </Paper>
          {loading ? (
                //   Specify color of the text in the typing effect
                  <div style={{ color: "purple" }}>
               
                    
                  <Typewriter
                  options={{
              
                    loop: true,
                }}
              onInit={(typewriter) => {
                          typewriter.typeString(".......").start();
                       
              }}
            /> </div>
          ) : (
            <div>
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
                  <div style={{ color: "#454546" ,fontStyle: "italic",}}>{prevOutput[index]}</div>
                )}
              </Paper>
            </div>
          )}
        </div>
      ))}

    </div>
  );
};

export default Chat;
