response.question.map((question, index) => (
    <div key={index}>
      <h1>{question}</h1>
      <RadioGroup

        orientation="vertical"
        label="Select your favorite framework/library"
        description="This is anonymous"
        size="sm"

        spacing="sm"
        //set checked for each checkbox to true
        checked={checked}
        onChange={handleChange}
      >
        <Radio value="react" label={response.answer[index]} />
        <Radio value="svelte" label={response.distractors_sublist[index][0]} />
        <Radio value="ng" label={response.distractors_sublist[index][1]} />
      </RadioGroup>