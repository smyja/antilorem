import React, { useState } from "react";
import {
  Textarea,
  Button,
  NumberInput,
  Group,
  createStyles,
} from "@mantine/core";
import Typewriter from "typewriter-effect";
import { api } from "../helpers/api";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  form: {
    "@media (max-width: 800px)": {
      marginLeft: "-350px",
    },
  },
  textare: {
    "@media (max-width: 800px)": {
      width: "50% !important",
    },
  },
  output: {
    "@media (max-width: 800px)": {
      width: "50% !important",
    },
  },
}));
const Demo = () => {
  const { classes } = useStyles();
  const [output, setOutput] = useState("");
  const [output1, setOutput1] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [title, setTitle] = useState("");
  const [length, setLength] = useState(0);
  const [author, setAuthor] = useState("");
  const [author1, setAuthor1] = useState("");
  const [author2, setAuthor2] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      // eslint-disable-next-line no-restricted-globals
      .post(api.posts.create, { name: title, length: length })
      .then((res) => {
        // console.log(res.data);
        setLoading(false);
        setOutput(res.data);
        setAuthor(
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(`${res.data.output}`)
                .changeDelay(1)
                .start();
            }}
          />
        );
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message || err);
      });
  }
  function paraphrase(e) {
    e.preventDefault();
    setLoading2(true);
    axios
      // eslint-disable-next-line no-restricted-globals
      .post(api.posts.paraphrase, { name: title, length: length })
      .then((res) => {
        // console.log(res.data);
        setLoading2(false);
        setOutput(res.data);
        setAuthor2(
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(`${res.data.output}`)
                .changeDelay(1)
                .start();
            }}
          />
        );
      })
      .catch((err) => {
        console.log(err);
        setLoading2(false);
        setError(err.message || err);
      });
  }
  function summarize(e) {
    e.preventDefault();
    setLoading1(true);
    axios
      // eslint-disable-next-line no-restricted-globals
      .post(api.posts.summarize, { name: title, length: length })
      .then((res) => {
        // console.log(res.data);
        setLoading1(false);
        setOutput1(res.data);
        setAuthor1(
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(`${res.data.output}`)
                .changeDelay(1)
                .start();
            }}
          />
        );
      })
      .catch((err) => {
        console.log(err);
        setLoading1(false);
        setError(err.message || err);
      });
  }
  return (
    <>
      <form className={classes.form}>
        <Textarea
          placeholder="Start writing your story..."
          label="Title"
          autosize
          minRows={2}
          maxRows={4}
          style={{
            width: "500px",

            marginLeft: "360px",
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={classes.textare}
        ></Textarea>
        <NumberInput
          placeholder="Enter the number of words to Generate"
          label="Number of words to Generate"
          className={classes.textare}
          style={{
            width: "500px",
            height: "20px",
            marginLeft: "360px",
            marginTop: "30px",
          }}
          value={length}
          onChange={(val) => setLength(val)}
        />
        <div
          className={classes.output}
          style={{
            // backgroundColor: "#2C2E33",
            font: "small courier, monospace black",
            width: "500px",
            // height: "60px" /* or whatever measurements you want */,
            // overflow: "hidden",
            overflowWrap: "break-word",
            outline: "0px solid transparent",
            borderStyle: "none none solid",
            marginLeft: "360px",
            marginTop: "60px",
            borderBottom: "medium none",
          }}
        >
          {loading ? <div>Loading...</div> : author}
          {loading1 ? <div>Loading...</div> : author1}
          {loading2 ? <div>Loading...</div> : author2}
        </div>
        <Group>
          {" "}
          <Button
            style={{ marginLeft: "360px", marginTop: "5px" }}
            type="button"
            loading={loading}
            onClick={handleSubmit}
          >
            Autocomplete
          </Button>
          <Button
            style={{ marginTop: "5px" }}
            type="button"
            loading={loading2}
            onClick={paraphrase}
          >
            Paraphrase
          </Button>
          <Button
            style={{ marginTop: "5px" }}
            type="button"
            loading={loading1}
            onClick={summarize}
          >
            Summarize
          </Button>
        </Group>

        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default Demo;
