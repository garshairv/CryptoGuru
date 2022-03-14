import React, { useState, } from 'react';
import axios from 'axios'



export const Signin = (props) => {

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const register = () =>{
     axios.post('http://localhost:3001/register',  {
        username: usernameReg,
        password:passwordReg
     }).then ((Response) => {
         console.log(Response);
     });   
    };

    return (
        <div className="center">
            <div className="loginForm">
                <form className="flexColumn" >
                    <input placeholder="Username" onChange={(e) => 
                        { setUsernameReg(e.target.value)}} />
                    <input type="password" placeholder="Password" onChange={(e) => 
                        { setPasswordReg(e.target.value)}}/>
                    <input type="submit" value="Sign up" onClick={register} />
                </form>
            </div>
        </div>
    )
}