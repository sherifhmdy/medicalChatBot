import React, { useState, useEffect } from 'react';
import './Nav.css';

const Nav = () => {
    const [activePage, setActivePage] = useState('home');

    useEffect(()=>{
        setActivePage(document.location.pathname);
    },[activePage]);
    return (
        <nav className="navbar navbar-light ">
            <a className="navbar-brand" href="/">
                <img src="./medbot.png" width="50" height="50" alt="" 
                className="d-inline-block align-middle" style={{paddingRight:'5px'}}/>
                Medical Chat-Bot <b style={{color:"red",fontSize:"25px",fontWeight:"bolder",fontFamily:'Ubuntu'}}>+</b>
            </a>

            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                    <p className="underline" style={{display: activePage === '/'?'block':'none'}}>____</p>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/application">Application</a>
                    <p className="underline" style={{display: activePage === '/application'?'block':'none'}}>____</p>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/about">About</a>
                    <p className="underline" style={{display: activePage === '/about'?'block':'none'}}>____</p>
                </li>
            </ul>

        </nav>
    );
};

export default Nav;