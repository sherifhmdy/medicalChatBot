import React, { useState } from 'react';
import ChatBox from './ChatBox';
import {Route} from 'react-router-dom';
import './App.css';

function App() {

  const [firstName, setFirstName] = useState('');
  const [goChat, setGoChat] = useState('false');


  const handleClick = () => {
    setGoChat('true');
  };

  const ChatBoxWrapper= () => {
    return(<ChatBox firstName={firstName} />);
  };
  
  return (
  goChat === 'true'?  
  <React.Fragment>
    <Route component={ChatBoxWrapper} />
  </React.Fragment>
  :
  
    <div className="container">
      <div className="row" style={{marginTop:'3rem',width:'700px', borderStyle:'solid', 
      padding:'2rem',marginLeft:'13rem', borderWidth:'1px', borderRadius:'5px', borderColor:'lightgray'}}>

        
          <div className="col-4 offset-2">
              <div className="form-group">
                <label htmlFor="firstName">first name</label>
                <input type="text" value={firstName} className="form-control" id="firstName" 
                onChange={event => setFirstName(event.target.value)} tabIndex='1' required/>
              </div>
              <div className="form-group">
                <label htmlFor="Gender">Gender</label>
                <select className="form-control" id="Gender" tabIndex='3'>
                  <option>N/A</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <button type="submit" className="btn btn-outline-success" onClick={handleClick} tabIndex='5'>Submit</button>
          </div>

          <div className="col-4">
              <div className="form-group">
                <label htmlFor="lastName">last name</label>
                <input type="text" className="form-control" id="lastName" tabIndex='2'/>
              </div>
              <div className="form-group">
                <label htmlFor="ageRange">Age Range</label>
                <select className="form-control" id="ageRange" tabIndex='4'>
                  <option>N/A</option>
                  <option>less than 6</option>
                  <option>6:17</option>
                  <option>18:30</option>
                  <option>more than 30</option>
                </select>
              </div>
          </div>

      </div>
    </div>
  );
}

export default App;
