import React, { Component } from 'react';
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";
import Home from './Home'
import {Redirect, BrowserRouter, Route} from 'react-router-dom';

import {  withRouter, Router} from 'react-router';

class MovieBooking extends Component {
  constructor(props)
  {
    super(props)
    console.log("Inside MovieBooking constructor")
    console.log(this.props) 
    console.log(this.state)    
  }

  state = {
    homeRedirect: false
  }
  
  setHomeRedirect = () => {
    this.setState({
      homeRedirect: true
    })
  }

  renderRedirect = () => {
    if(this.state.homeRedirect){
     
      /*
      return <Redirect to={{ 
        pathname: '/Home', 
        locationNumber: this.props.location.locationNumber,
        cinemaHallNumber: this.props.location.cinemaHallNumber,
        movieNumber: this.props.location.movieNumber,
        userNumber: this.props.location.userNumber,
        bookingNumber: this.props.location.bookingNumber,
        checkInCheckOutNumber: this.props.location.checkInCheckOutNumber,
        reviewNumber: this.props.location.reviewNumber,
        locations: this.props.location.locations,
        cinemaHalls: this.props.location.cinemaHalls,
        movies: this.props.location.movies,
        userDetails: this.props.location.userDetails,
        movieBookings: this.props.location.movieBookings,
        userCheckInCheckouts: this.props.location.userCheckInCheckouts,
        reviews: this.props.location.reviews,
        addLocation: this.props.location.addLocation,
        deleteLocation: this.props.location.deleteLocation,
        addCinemaHall: this.props.location.addCinemaHall,
        deleteCinemaHall: this.props.location.deleteCinemaHall,
        addMovie: this.props.location.addMovie,
        removeMovie: this.props.location.removeMovie,
        updateMovie: this.props.location.updateMovie,
        signUp: this.props.location.signUp,
        bookMovieTicket: this.props.location.bookMovieTicket,
        cancelMovieTicket: this.props.location.cancelMovieTicket,
        checkIn: this.props.location.checkIn,
        checkOut: this.props.location.checkOut,  
        currentUserId: this.props.location.currentUserId,
        currentUserName: this.props.location.currentUserName        
      }}/>
      */
    }
  }

  render() {
    {
      console.log("Inside Movie Booking render")
      console.log(this.props.location)
      
    }

    return (
      <div id="content" style={{
        backgroundColor: '#E0E0E0',
        width: '1530px',
        height: '650px'
      }}>
        <h1>Welcome</h1>
        {this.renderRedirect()}
      <img src={Left} width="400" height="650"></img>
      <div  style={{
        backgroundColor: 'white',
        width: '400px',
        height: '450px',
        position: 'absolute', left: '50%', top: '30%',
        transform: 'translate(-50%, -30%)' 
      }}>
        <h2><center><b><font face="biome" >Movie Booking</font></b></center></h2>
      
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
       
        </div>
       <center>
       
        </center>
        

       
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

export default withRouter(MovieBooking);
