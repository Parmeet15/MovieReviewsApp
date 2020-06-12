import React, { Component } from 'react';
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";
import UserHome from './UserHome';
import AdminHome from './AdminHome';
import {Redirect, BrowserRouter, Route} from 'react-router-dom';

import {  withRouter, Router} from 'react-router';
let username = '';
let userid = 0;
let userpassword = '';
let useremail = '';
let homeRedirect = false;

class Login extends Component {
  constructor(props)
  {
    super(props)
    console.log("Inside login constructor")
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
      alert("login successfull");
      if(useremail == 'admin' && userpassword == 'admin')
      {
        return (

          <BrowserRouter>
          <Route path='/' render={props => <AdminHome {...props} state = {this.props.location} currentUserName = {username} currentUserId = {userid}/>}
          />
          </BrowserRouter>
        )
      }
     
      return (
        <BrowserRouter>
        <Route path='/' render={props => <UserHome {...props} state = {this.props.location} currentUserName = {username} currentUserId = {userid}/>}
        />
        </BrowserRouter>
      )
    }
    console.log("homeredirect value")
    console.log(homeRedirect);
  }

  render() {
    {
      console.log("Inside login render")
      
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
        <h2><center><b><font face="biome" >Login</font></b></center></h2>
        <form onSubmit = 
          {async (event) => {
            event.preventDefault();
            const email = this.email.value
            const password = this.password.value
            let userDetails = this.props.location.userDetails
            let userNumber = this.props.location.userNumber
            let userid = 0;
            for(var i= 1; i <= userNumber ; i++)
            {
              if (userDetails[i-1].email == email && userDetails[i-1].password == password)
              {
                userid = i;
              }
            }
            if(userid !=0)
            {
              username = userDetails[userid-1].name
              userid= userid
              password= this.password.value
             // this.setState ({currentUserId: userid})
              //this.setState ({currentUserName: userDetails[userid-1].name})
              console.log("found");  
              console.log(userDetails[userid-1].name)
              this.setHomeRedirect()
              this.renderRedirect()
              //todo redirect to home page will all the options
            }
            else{
              useremail = this.email.value
              userid= userid
              userpassword= this.password.value
              if(useremail == 'admin' && userpassword == 'admin')
              {
                this.setHomeRedirect()
                this.renderRedirect()
              }
            else 
            {
              alert("User not found")
            }            
            }   
            console.log("after form click")      
            this.setHomeRedirect()
                      
          }          
            
          }>
            <br></br>
            <br></br>
        <div className="form-group mr-sm-2">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <b>Email</b>
            <input 
            id="email"
            type="text"
            ref={(input)=>{this.email=input}}
            className="form-control"
            placeholder="Email"
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
        <button type="submit" className="btn btn-primary">Login</button>
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

export default withRouter(Login);