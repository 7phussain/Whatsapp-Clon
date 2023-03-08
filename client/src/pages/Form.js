import React from 'react'
import { useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

function Form(props) {
    const currentData = props.data;
    const [currentMsg, setCurrentMsg] = useState();
    const [isMsg, setIsMsg] = useState(true);


    const changeHandler = (event) => {
        if (event.target.value) {
            setIsMsg(false);
        } else {
            setIsMsg(true);
        }
        setCurrentMsg(event.target.value);

    }

    const userEmail = "7phussain@gmail.com";


    const submitHandler = async (event) => {
        event.preventDefault();
        const data = { ...currentData, userEmail, currentMsg };
        const JSONdata = JSON.stringify(data)
        const endpoint = '/form'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
            credentials:'include'
        }
        const response = await fetch(endpoint, options)
        setCurrentMsg('');
        const result = await response.json()
    }



    return (
        <form method='post' onSubmit={submitHandler} className="message-form">
            <SentimentSatisfiedAltIcon style={{ fontSize: "2rem" }}></SentimentSatisfiedAltIcon>

            <input type="text" name="message" id="message" value={currentMsg} onChange={changeHandler} placeholder="Message" />
            <button className='message-button' type='submit'>
                {(isMsg) ? <MicIcon style={{ fontSize: "2rem" }} /> : <SendIcon style={{ fontSize: "2rem" }} />}</button>
        </form>
    )
}

export default Form;