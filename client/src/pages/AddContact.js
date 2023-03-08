import React, { useState } from 'react'
function AddContact(props) {
    const userEmail = "7phussain@gmail.com";
    const userName = "Hussain";
    const [contactName, setContactName] = useState();
    const [contactEmail, setContactEmail] = useState();
    const [result, setResult] = useState()


    const submitHandler = async (event) => {
        event.preventDefault();

        if (!contactName && !contactEmail) {
            return setResult("Please fill the fields");
        }

        const data = { contactName, contactEmail, userName, userEmail };

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/addContactApi'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
            credentials:"include"
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const res = await response.json();
        // setResult(res)
        setContactEmail("");
        setContactName("");
    }


    const validation = () => {

    }


    return (props.addContact) ? <form method='post' onSubmit={submitHandler} className='add-contact'>
        <h2>Add New Contact</h2>
        { <p style={{color:"red"}} >{result}</p>}
        <input type="text" name='contactName' value={contactName} onChange={(event) => setContactName(event.target.value)} placeholder='Name' />
        <input type="email" name='contactEmail' value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} placeholder='Email' />
        <div className="contact-buttons">
            <button type='submit' >Save</button>
            <button id='contact-discard' type='button' onClick={() => props.addContactHandler(false)}>Discard</button>
        </div>
    </form> : null;
}

export default AddContact