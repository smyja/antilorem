import React,{useState} from 'react'
import { Textarea, Button, SimpleGrid,Radio, RadioGroup} from '@mantine/core'
import { api } from "../helpers/api";
import axios from "axios";

const Qgen = () => {
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState([]);
  const [text, setText] = useState("");
  const handleChange = (event) => {
    setChecked(true)
  };
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      // eslint-disable-next-line no-restricted-globals
      .post(api.posts.qgen, { context: text})
      .then((res) => {
        // console.log(res.data);
        setLoading(false);
        setOutput(res.data);
        console.log(res.data)
    
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message || err);
      });
  }
  // const response = {
  //   "question": ['uuu','uuu',],
  //   "answer": ['uuu','uuu',],
  //   "distractors_sublist": [
  //     ["boy", "girl"], ["man", "uu"]
  //   ]
  // }
  return (
    <SimpleGrid cols={2} spacing="lg">
      <div>
        <form onSubmit={handleSubmit}>
          <Textarea
         label="Text"
          placeholder="Enter an essay/text"
        
          minRows={2}
            maxRows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
          style={{
            marginTop: "5px",
            width: "550px",
          height: "300px !important",marginLeft: "30px",}}
          />
          <Button
                 type="submit"
                 loading={loading}
            style={{ marginTop: "5px", marginLeft: "30px", }}>Generate</Button>
        </form>
           
      </div>
      

      <div>
        <h1> Questions </h1>
        
        {loading ? (<h1>Loading...</h1>) : (
      
          <div>
            {/* // each question has an answer and distractors */}
          
            {output.question && output.question.map((question, index) => (
        <div key={index}>
          <h1>{question}</h1>
          <RadioGroup

            orientation="vertical"  
            size="sm"

            spacing="sm"
            //set checked for each checkbox to true
            checked={checked}
            onChange={handleChange}
          >
            <Radio value="react" label={output.answer[index]} />
            <Radio value="svelte" label={output.distractors_sublist[index][0]} />
            <Radio value="ng" label={output.distractors_sublist[index][1]} />
          </RadioGroup>
        </div>
      ))}
          </div>
        )

      }</div>
       
    
     

    </SimpleGrid>
          

      
  )
}

export default Qgen;