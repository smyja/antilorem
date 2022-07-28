import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Textarea, Button ,NumberInput} from "@mantine/core";
import TypeWriterEffect from "react-typewriter-effect";
import {api} from '../helpers/api'
import axios from "axios";

const Demo = () => {
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [length, setLength] = useState(0);
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      // eslint-disable-next-line no-restricted-globals
      .post(api.posts.create, { name:title, length:length })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setOutput(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message || err);
      });
  }
  console.log(output.output)      
  const element = (
  
    <TypeWriterEffect
      // textStyle={{ fontFamily: 'Red Hat Display' }}
      startDelay={100}
      cursorColor="black"
      text={output.output}
      typeSpeed={100}
    />
  );
  const html = ReactDOMServer.renderToString(element);
  return (
    <>
      
      <form onSubmit={handleSubmit}>
        <Textarea
        placeholder="Autosize with no rows limit"
        label="Autosize with no rows limit"
        autosize
        style={{
          width: "500px",
          height: "20px",
          marginLeft: "360px",
        }}
        
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></Textarea>
      <NumberInput
        placeholder="Enter the number of words to Generate"
        style={{
        width: "500px",
        height: "20px",
          marginLeft: "360px",
          marginTop: "60px",
        }}
      
        value={length}
        onChange={(val) => setLength(val)} 
        />
      <div
          contentEditable="true"
          suppressContentEditableWarning={true}
        style={{
          // backgroundColor: "#2C2E33",
          font: "small courier, monospace black",
          width: "500px",
          // height: "60px" /* or whatever measurements you want */,
          overflow: "hidden",
          overflowWrap: "break-word",
          outline: "0px solid transparent",
          borderStyle: "none none solid",
          marginLeft: "360px",
          marginTop: "60px",
          borderBottom: "medium none",
        }}
      >
        {element}
      </div>

      <Button
    
          style={{ marginLeft: "360px", marginTop: "5px" }}
          type="submit" loading={loading}
      >
        Submit
        </Button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default Demo;
