import React,{useState} from 'react'

import { Paper,TextInput,Button } from '@mantine/core'

const Chat = () => {
    const [text, setText] = useState("");
    const[message,setMessage]=useState('')
    const [loading, setLoading] = useState(false);
    //save previous message state
    const [prevMessage, setPrevMessage] = useState([])
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        console.log(text)
        
        setPrevMessage(prevMessage => [...prevMessage, text])
        setText('')
    };


    return (
        <>
            <div>Chat</div>
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Text"
                    placeholder="Enter an essay/text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}

                >
                </TextInput>
                <Button
                    type="submit"
                  

                >
                    Submit
                </Button>
            </form>
            {/* display message as chat after submit */}
            {prevMessage.map((message, index) => (
                    <div key={message}>
                        
                    <Paper style={{ padding: 10, margin: 10, width: 200, backgroundColor: 'blue' }}>
                        {message}
                    </Paper>
                    {loading ? (<h1>Loading...</h1>) : ( <Paper style={{ padding: 10, margin: 10, width: 200, backgroundColor: 'blue' }}> {message}</Paper>)}
                    </div>
                ))}
               

           

            
        </>
   

      
  )
}

export default Chat