import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router';
import { Login } from '@mui/icons-material';

function LoginForm() {
    const navigate = useNavigate()

const [credintialsError, setCredintialsError] = useState("")
const [credintials, setCredintials] = useState({
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

const submitHandler = async (event) => {
    event.preventDefault();
    if (!credintials.userEmail || !credintials.userPassword) { return setCredintialsError("Please fill the fields") }

    setCredintialsError("");
    const data = credintials;
    const JSONdata = JSON.stringify(data)
    const endpoint = '/loginForm'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
        credentials: "include"
    }
    const response = await fetch(endpoint, options)
    setCredintials({userEmail: "", userPassword: "" });
    const result = await response.json()
    console.log(result)
    if(result.message){
        navigate("/app")
    }
}


    return (
        <div className='Form'>
            <h1>Live Chat</h1>            
            <form action="" onSubmit={submitHandler}>
                <h2>Please Login!</h2>
                <p>{credintialsError}</p>
                <input type="email" onChange={changeHandler} value={credintials.userEmail} className='loginEmail' name='userEmail' placeholder='Email..' />
                <input type="text" onChange={changeHandler} value={credintials.userPassword}  className='loginPassword' name='userPassword' placeholder='Password...' />
                <div >
                    <a href="signUp">Sign Up?</a>   <button type='submit' className='btnWithIcon'><div>Login</div><div><Login style={{fontSize:"large"}}></Login></div></button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm