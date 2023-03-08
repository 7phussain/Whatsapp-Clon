import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useRef, useState } from 'react';
import { ArrowBack, Backpack, Delete,Person } from '@mui/icons-material';


function CurrentChat(props) {
    const messages = props.messages;
    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [])
    // [props.messages]

    const userInfo = props.userInfo;
    let currentData = messages.filter((value) => {
        return (value._id == userInfo.chatId)
    })
    let message;
    if (currentData[0]) {
        message = currentData[0].messages;
    }
    const user = props.userEmail;



    const clearChat = async () => {
        props.clearChat(currentData[0]._id);
        const data ={_id:currentData[0]._id};
        const JSONdata = JSON.stringify(data)
        const endpoint = 'http://localhost:3000/api/clearChatApi'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()

    }

    function toContacts(){
        props.toContacts();
    }



    return (
        <>
            <div key={props.message} className="current-chat flex">
                <div className="current-chatter flex">
                    <div>
                        <Person className="current-image-width"/>
                    </div>
                    <div className="current-name">
                        <h4>{userInfo.contactName}</h4>
                    </div>
                </div>

                <div className="current-content-icons" >
                    <div className='more-vert-icon'>
                        <MoreVertIcon></MoreVertIcon>
                        <ul className="current-contact-controls">
                            <li className='clear-chat btnWithIcon' onClick={toContacts}><div>Back To Contacts</div><ArrowBack style={{fontSize:"larger"}}></ArrowBack></li>
                            <li className='clear-chat btnWithIcon' onClick={clearChat}><div>Clear chat</div><Delete style={{fontSize:"larger"}}></Delete></li>
                        </ul>
                    </div>
                </div>
            </div>
            <p>{props.number}</p>
            <dev className="current-background">
                {
                    (typeof message !== "undefined" && message !== null) ? message.map((value) => { return (value.sender == user) ? <p className="User message" >{value.message}<span>{value.date}</span></p> : <p className="Friend message" >{value.message}</p> }) : null
                }
                <div ref={bottomRef} />
            </dev>
        </>
    )
}

export default CurrentChat