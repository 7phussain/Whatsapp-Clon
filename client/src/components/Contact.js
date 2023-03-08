import React, { useEffect,useState } from 'react';
import { Person } from '@mui/icons-material';
function Contact(props) {
  const contact = props.contact;
  const dataToCurrentChat =props.dataToCurrentChat;
  if(typeof contact.lastMsg !== "undefined" && contact.lastMsg !== null){
   var lastMsg = contact.lastMsg.message;
  }

const dataSender = ()=>{
  dataToCurrentChat(contact);
}
  return (
    
    <div className='contact' onClick={dataSender}>
      <div className="contact-image">
        <Person className='contact-image-width'/>
      </div>
      <div className="contact-info">
        <h3>{contact.contactName}</h3>
        <p className='last-msg'>{lastMsg}</p>
      </div>
      <div className="contact-last-seen">
        <span>3:34 pm</span>
      </div>
    </div>
    
    
  )
}

export default Contact