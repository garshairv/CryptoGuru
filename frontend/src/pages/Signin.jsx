import React, { useState, } from 'react';



export const Signin = (props) => {

    return (
        <div className="center">
            <div className="loginForm">
                <form className="flexColumn" >
                    <input placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <input type="submit" value="Sign up" />
                </form>
            </div>
        </div>
    )
}