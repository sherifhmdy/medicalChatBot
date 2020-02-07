import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="container mainpg" style={{marginTop:"6rem"}}>
            <div className="row text-center">
                <div className="col-8 offset-2">
                    <h1 className="welcome text-justify">“Isn’t it a bit unnerving that doctors call what they do “practice”?”</h1>
                    <h3 className="text-left">― George Carlin</h3>
                </div>
            </div>
            <br/><br/>
            <div className="row btns">
                <div className="col-2 offset-4">
                    <a href="/application" className="btn btn-danger btn-lg">Try our BOT</a>
                </div>
                <div className="col-2">
                    <a href="/about" className="btn btn-warning btn-lg">Know More</a>
                </div>
            </div>
        </div>
    );
};

export default Home;