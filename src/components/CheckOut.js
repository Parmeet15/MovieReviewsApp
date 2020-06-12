import React, { Component } from 'react';
import "./css/Home.css";
import Logo from "./images/home_page.jpg";
import {Route} from 'react-router-dom';
import {  withRouter, Router} from 'react-router';
import {Redirect} from 'react-router-dom';
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";
import "./css/Location.css";
let unixTime = 0;
let inttime = 0;
class CheckOut extends Component {
  constructor(props)
  {
    super(props)
    console.log("Inside checkout constructor")
    console.log(this.props) 
    console.log(this.state)
        
    var time = new Date().getTime();
    //unixTime = time/1000;
    //inttime = Math.trunc(unixTime);

    inttime = time;
    
    
  } 
     
  render() {
    {
      console.log("Inside Check out render");
    }
    return (
      <div id="content" style={{
        backgroundColor: '#E0E0E0',
        width: '1530px',
        height: '650px'
      }}>
      <img src={Left} width="400" height="650"></img>
      <div className="Location" style={{
        backgroundColor: 'white',
        width: '400px',
        height: '450px',
        position: 'absolute', left: '50%', top: '30%',
        transform: 'translate(-50%, -30%)' 
      }}>
        <p><h2><center><b><font face="biome">Have you finished your movie? Are you sure you want to checkout?</font></b></center></h2></p>
        <div className="form-group mr-sm-2">
        <form onSubmit = 
          {async (event) => {
            event.preventDefault();

            let userId = this.props.location.currentUserId;
            let bookingId = 0;
            let movieId = 0;
            let movieBookingsNumber = this.props.location.bookingNumber;
            let moviebookings = this.props.location.movieBookings;
            for(var i= 1; i <= movieBookingsNumber ; i++)
            {
              if (moviebookings[i-1].userId == userId)
              {
                bookingId = i;
              }
            }
            if(bookingId !=0)
            {
              movieId = moviebookings[bookingId-1].movieId
            }
            
            await this.props.location.checkOut(userId,movieId,inttime,this.review.value);
            console.log("successfully")
            alert("checkout done Successfully")
          }
            
          }>
        <div className="form-group mr-sm-2">
        <input 
            id="review"
            type="text"
            ref={(input)=>{this.review=input}}
            className="form-control"
            placeholder="Review"
            required/>
        </div>
       <center>
        <button type="submit" className="btn btn-primary">Check Out</button>
        </center>
        </form>
   
            
            
            
           
        </div>
        
       
        <br></br>
        <br></br>
       
       </div>
    </div>
    
    );
    
  }
}

export default withRouter(CheckOut);
