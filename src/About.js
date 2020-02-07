import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="container">
            <div className="row" style={{marginTop:'1rem'}}>
                <div className="col-6">
                    <h4 className="">About the Application:</h4>
                    <p>
                        We’re a group of colleagues who seek to facilitate people’s life in many different aspects. 
                        In this project we’re running into the medical field.
                    </p>
                    <p>
                        Nowadays and with the rise of the globalization, the world is too small, 
                        people can move all over the world and go anywhere in no time; with the ease of movement, 
                        diseases are spreading and a lot of diseases are appearing; every good thing has a bad face.
                    </p>
                    <p>
                        We’re seeking to facilitate people’s life, we’ve decided to start in our project to digitalize 
                        the disease identification through analyzing the symptoms we take from the patients using a 
                        chat bot that interacts with people, give a prescription for the common, well-known diseases 
                        or even route patients to doctors with the needed specialties.
                    </p>
                    <p>
                        The chat bot is a web-app with a simple GUI, it analyzes users’ entered text, 
                        understands the context fetching certain words which would be our keys to search with in 
                        our dataset to recognize the disease. Based on the disease the application can route to
                        certain doctors with the right specialties.
                    </p>
                </div>
                <div className="col-5 offset-1">
                    <h4>About the <span className="badge badge-danger text-wrap">Chuck Norris</span> Team:</h4>
                    <ul>
                        <li>
                            <img className="profilePic" src={require('./maiada.png')} alt="./medbot.png"/>
                            <div className="moreDetails">
                                <p className="name">Maiada Mohsen</p>
                                <p className="jobTitle">Vodafone Billing Engineer</p>
                                <p className="id">181075</p>
                            </div>
                        </li>
                        <li>
                            <img className="profilePic" src={require("./fady.jpeg")} alt=""/>
                            <div className="moreDetails">
                                <p className="name">Fady Adel</p>
                                <p className="jobTitle">Vodafone Billing Engineer</p>
                                <p className="id">181075</p>
                            </div>
                        </li>
                        <li>
                            <img className="profilePic" src={require('./amr.png')}  alt="./medbot.png"/>
                            <div className="moreDetails">
                                <p className="name">Amr Mostafa</p>
                                <p className="jobTitle">Vodafone Charging Engineer</p>
                                <p className="id">181103</p>
                            </div>
                        </li>
                        <li>
                            <img className="profilePic" src={require('./junior.png')}  alt="./medbot.png"/>
                            <div className="moreDetails">
                                <p className="name">Ahmed Abd El-Atty</p>
                                <p className="jobTitle">Vodafone Charging Engineer</p>
                                <p className="id">181057</p>
                            </div>
                        </li>
                        <li>
                            <img className="profilePic" src={require('./sherif.png')}  alt="./medbot.png"/>
                            <div className="moreDetails">
                                <p className="name">Sherif Hamdy</p>
                                <p className="jobTitle">Vodafone Charging Engineer</p>
                                <p className="id">181075</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;