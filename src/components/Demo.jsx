import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Textarea, Button, Input } from "@mantine/core";
import TypeWriterEffect from "react-typewriter-effect";
import { api } from "../helpers/api";
import axios from "axios";

const Demo = () => {
  const [toggle, setToggle] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [length, setLength] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      // eslint-disable-next-line no-restricted-globals
      .post(api.posts.create, { name, length })
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message || err);
      });
  }

  const nameo = "your name";
  const element = (
    <TypeWriterEffect
      // textStyle={{ fontFamily: 'Red Hat Display' }}
      startDelay={100}
      cursorColor="black"
      text={`${nameo} `}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Textarea>
        <Input
          placeholder="Enter the number of words to Generate"
          style={{
            width: "500px",
            height: "20px",
            marginLeft: "360px",
            marginTop: "60px",
          }}
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        ></Input>
        <div
          contentEditable="true"
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
          onClick={() => {
            setToggle(!toggle);
          }}
          style={{ marginLeft: "360px", marginTop: "5px" }}
          type="submit"
          loading={loading.toString()}
          disabled={loading}
        >
          Submit
        </Button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default Demo;
