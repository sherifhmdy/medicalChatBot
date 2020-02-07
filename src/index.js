import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import About from './About';

ReactDOM.render(
    <Router>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/application" component={App} />
        <Route exact path="/about" component={About} />
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
