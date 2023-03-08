import React from 'react'
import { useState } from 'react';

function SignUp() {
    const [credintialsError, setCredintialsError] = useState("")
    const [cPassword, setCPassword] = useState()
    const [credintials, setCredintials] = useState({
        userName: "",
        userEmail: "",
        userPassword: ""
    });


    const changeHandler = (event) => {

        const { value, name } = event.target;

        setCredintials((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }
    const cPasswordChangerHandler = (event) => {
        setCPassword(event.target.value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (!credintials.userName || !credintials.userEmail || !credintials.userPassword || !cPassword) { return setCredintialsError("Please fill the fields") }
        if (credintials.userPassword != cPassword) {
            return setCredintialsError("Confirm Password not matching");
        }
        
        setCredintialsError("");
        const data = credintials;
        const JSONdata = JSON.stringify(data)
        const endpoint = '/signUpForm'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        setCPassword("");
        setCredintials({ userName: "", userEmail: "", userPassword: "" });
        const result = await response.json()
    }





    return (
        <div className='Form'>
            <h1>Live Chat</h1>
            <form action="" onSubmit={submitHandler} className='signUpForm'>
                <h2>Create New Account</h2>
                <p style={{color:"red"}}>{credintialsError}!</p>
                <input type="text" onChange={changeHandler} value={credintials.userName} className='signUpName' placeholder='Name' name='userName' />
                <input type="email" onChange={changeHandler} value={credintials.userEmail} className='signUpEmail' name='userEmail' placeholder='Email...' />
                <input type="text" onChange={changeHandler} value={credintials.userPassword} className='signUpPassword' name='userPassword' placeholder='Password...' />
                <input type="text" onChange={cPasswordChangerHandler} value={cPassword} className='signUpRetypePassword' name='cPassword' placeholder='Confirm Password' />
                <div >
                    <a href="/">Login?</a> <button type='submit'>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;