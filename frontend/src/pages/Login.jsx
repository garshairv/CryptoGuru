import React, { useState, } from 'react';



export const Login = (props) => {

    return (
        <div className="center">
            <div className="loginForm">
                <form className="flexColumn" >
                    <input placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="submit" value="Log in" />
                </form>
            </div>
        </div>
    )
}