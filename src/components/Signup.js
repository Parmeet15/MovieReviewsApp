import React, { Component } from 'react';
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";
import UserHome from './UserHome'
import {Redirect, BrowserRouter, Route} from 'react-router-dom';

import {  withRouter, Router} from 'react-router';
let username = '';
let userid = 0;
let homeRedirect = false;

class Signup extends Component {
  constructor(props)
  {
    super(props)
    console.log("Inside signup constructor")
    console.log(this.props) 
  }

 
  setHomeRedirect = () => {
    console.log("ïnside.setHomeRedirect");
    homeRedirect = true;
    console.log("homeredirect value")
    console.log(homeRedirect);
  }

  renderRedirect = () => {
    console.log("ïnside. render redirect");
    if(homeRedirect){
      alert("Signup successfull");    
     
    }
    console.log("homeredirect value")
    console.log(homeRedirect);
  }

  render() {
    {
      console.log("Inside sign up render")
      if(homeRedirect){
        alert("Signup successfull");
        return (
          <BrowserRouter>
          <Route path='/' render={props => <UserHome {...props} state = {this.props.location} currentUserName = {username} currentUserId = {userid}/>}
          />
          </BrowserRouter>
        )
      }
    }

    return (
      <div id="content" style={{
        backgroundColor: '#E0E0E0',
        width: '1530px',
        height: '650px'
      }}>
        {this.renderRedirect()}
      <img src={Left} width="400" height="650"></img>
      <div  style={{
        backgroundColor: 'white',
        width: '400px',
        height: '450px',
        position: 'absolute', left: '50%', top: '30%',
        transform: 'translate(-50%, -30%)' 
      }}>
        <h2><center><b><font face="biome" >Signup</font></b></center></h2>
        <form onSubmit = 
          {async (event) => {
            event.preventDefault();
            const name = this.username.value
            const email = this.email.value
            const password = this.password.value
           
            await this.props.location.signUp(name, email, password)
            let count = this.props.location.userNumber
            console.log(count)
            console.log("user added")
            username = this.name
            userid = this.props.location.userNumber
            this.setHomeRedirect()
                      
          }          
            
          }>
            <br></br>
            <br></br>
        <div className="form-group mr-sm-2">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <b>Name</b>
            <input 
            id="username"
            type="text"
            ref={(input)=>{this.username=input}}
            className="form-control"
            placeholder="username"
            required/>
        </div>
        <div className="form-group mr-sm-2"></div>
        <div className="form-group mr-sm-2">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <b>Email</b>
            <input 
            id="email"
            type="text"
            ref={(input)=>{this.email=input}}
            className="form-control"
            placeholder="email"
            required/>
        </div>
        <div className="form-group mr-sm-2">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <b>Password</b>
            <input 
            id="password"
            type="text"
            ref={(input)=>{this.password=input}}
            className="form-control"
            placeholder="password"
            required/>
        </div>
       <center>
        <button type="submit" className="btn btn-primary">Sign Up</button>
        </center>
        </form>

       
      </div>
      <div style ={{
      float: 'right'
        }}>
       <img src={Right}  right= '500px' width="400" height="650" position='absolute'></img>  
      </div>
      </div>
    );
  }
}

export default withRouter(Signup);