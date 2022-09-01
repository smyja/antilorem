import React from 'react'
import { useState } from 'react'
import { Textarea, Button, SimpleGrid, RadioGroup,Radio } from '@mantine/core'

// Question and Answer options for the checkbox
const Ho = () => {
  const [checked, setChecked] = useState(false)
  const response = {
    "question": ['uuu','uuu',],
    "answer": ['uuu','uuu',],
    "distractors_sublist": [
      ["boy", "girl"], ["man", "uu"]
    ]
  }
  
    const handleChange = () => {
        // set as checked if checked is true
        setChecked(true)
    };

  return (
    <>
      
     <div>ho</div>
      {/* //map response */}
      {response.question.map((question, index) => (
        <div key={index}>
          <h1>{question}</h1>
          <RadioGroup

            orientation="vertical"  
          
            size="sm"

            //set checked for each checkbox to true
            checked={checked}
            onChange={handleChange}
          >
            <Radio value="react" label={response.answer[index]} />
            <Radio value="svelte" label={response.distractors_sublist[index][0]} />
            <Radio value="ng" label={response.distractors_sublist[index][1]} />
          </RadioGroup>
        </div>
      ))}
      </>
    

      
      
  )
}

export default Ho