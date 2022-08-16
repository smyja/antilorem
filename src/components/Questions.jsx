import React, { useState } from "react";
import { Button, TextInput,  createStyles, Textarea } from "@mantine/core";
import { api } from "../helpers/api";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  form: {
    "@media (max-width: 800px)": {
      marginLeft: "-350px",
    },
  },
  textare: {
    "@media (max-width: 800px)":
    {
      width: "400px !important",
      },
  },
  output: {
    "@media (max-width: 800px)":
    {
      width: "400px !important",
    },
 
  },
}))
const Questiongen = () => {
  const { classes } = useStyles();
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      // eslint-disable-next-line no-restricted-globals
      .post(api.posts.question, { context: text, answer: answer })
      .then((res) => {
        // console.log(res.data);
        setLoading(false);
        setOutput(res.data);
    
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message || err);
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
      <Textarea
        label="Text"
        placeholder="Enter an essay/text"
        autosize
        minRows={2}
          maxRows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "500px",
            height: "20px",
            marginLeft: "360px",

          }}
          className={classes.textare}

      />
  
        <TextInput
          label="Pick a word from the text you typed as an answer"
          placeholder="Enter the Answer"
          className={classes.textare}
          style={{
            width: "500px",
            height: "20px",
            marginLeft: "360px",
            marginTop: "130px",
          }}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <div
          className= {classes.output}
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
         {loading ? ( <div>Loading...</div>) : ( <div>{output.question}</div>)}
        </div>

        <Button
          style={{ marginLeft: "360px", marginTop: "5px" }}
          type="submit"
          loading={loading}
        >
          Submit
        </Button>

        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default Questiongen;
