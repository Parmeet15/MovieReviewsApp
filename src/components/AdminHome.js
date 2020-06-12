import React, { Component } from 'react';
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";
import MovieBooking from './MovieBooking';
import Logo from "./images/home_page.jpg";
import {Route} from 'react-router-dom';
import {  withRouter, Router} from 'react-router';
import {Redirect} from 'react-router-dom';
//import {Redirect, BrowserRouter, Route} from 'react-router-dom';

let username = '';
let userid = 0;

class AdminHome extends Component {
  constructor(props)
  {
    super(props)
    console.log("Inside AdminHome constructor")
    console.log(this.props) 
  }
  state = {
    homeRedirect: false,
    locationUpdateRedirect: false,
    cinemaHallUpdateRedirect: false,
    movieUpdateRedirect: false,
    viewDeleteLocationRedirect: false,
    cinemaHallViewDeleteRedirect: false,
    movieViewDeleteRedirect:false
  }
  setLocationUpdateRedirect = () => {
    this.setState({
      locationUpdateRedirect: true
    })
  }
  setViewDeleteRedirect = () => {
    this.setState({
      viewDeleteLocationRedirect: true
    })
  }

  setCinemaHallUpdateRedirect = () => {
    this.setState({
      cinemaHallUpdateRedirect: true
    })
  }

  setMovieUpdateRedirect = () => {
    this.setState({
      movieUpdateRedirect: true
    })
  }
  setHomeRedirect = () => {
    this.setState({
      homeRedirect: true
    })
  }

  setCinemaHallViewDeleteRedirect = () => {
    this.setState({
      cinemaHallViewDeleteRedirect: true
    })
  }

  setMovieViewDeleteRedirect = () => {
    this.setState({
      movieViewDeleteRedirect: true
    })
  }
  renderRedirect = () => {
    if(this.state.homeRedirect){
      alert("AdminHome successfull");     
    }

    if(this.state.locationUpdateRedirect){
      return <Redirect to={{ 
        pathname: '/Location', 
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
        currentUserId: "0",
        currentUserName: "admin"       
      }}/>
    }

    if(this.state.viewDeleteLocationRedirect){
      return <Redirect to={{ 
        pathname: '/UpdateLocation', 
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
        currentUserId: "0",
        currentUserName: "admin"       
      }}/>
    }

    if(this.state.cinemaHallUpdateRedirect){
      return <Redirect to={{ 
        pathname: '/Cinema', 
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
        currentUserId: "0",
        currentUserName: "admin"        
      }}/>
    }
    if(this.state.cinemaHallViewDeleteRedirect){
      return <Redirect to={{ 
        pathname: '/UpdateCinemaHall', 
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
        currentUserId: "0",
        currentUserName: "admin"       
      }}/>
    }
    if(this.state.movieUpdateRedirect){
      return <Redirect to={{ 
        pathname: '/Movie', 
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
        currentUserId: "0",
        currentUserName: "admin"      
      }}/>
    }
    if(this.state.movieViewDeleteRedirect){
      return <Redirect to={{ 
        pathname: '/UpdateMovie', 
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
        currentUserId: "0",
        currentUserName: "admin"       
      }}/>
    }
  
  }
  render() {
    {
      console.log("Inside admin home render")
      
      }
    

    return (
      <div  style={{
        backgroundColor: '#E0E0E0',
        width: '1500px',
        height: '650px'
      }}>
        {this.renderRedirect()}
    <div style={{
        backgroundColor: 'white',
        width: '1100px',
        height: '650px'
      }}>
    <img src={Logo} width="1100" height="650"></img>
    <div className="AdminHome"   style={{
        position: 'absolute', left: '88%', top: '50%',
        transform: 'translate(-80%, -50%)'         
    }}>
        <button type="submit" onClick={this.setLocationUpdateRedirect} className="btn btn-primary">Location Update</button>
        <br></br>
        <br></br>
        <button type="submit" onClick={this.setViewDeleteRedirect} className="btn btn-primary">Location View</button>
        <br></br>
        <br></br>
        <button type="submit" onClick={this.setCinemaHallUpdateRedirect} className="btn btn-primary">CinemaHall Update</button>
        <br></br>
        <br></br>
        <button type="submit" onClick={this.setCinemaHallViewDeleteRedirect} className="btn btn-primary">CinemaHall View</button>
        <br></br>
        <br></br>
        <button type="submit" onClick={this.setMovieUpdateRedirect} className="btn btn-primary">Movie Update</button>
        <br></br>
        <br></br>
        <button type="submit" onClick={this.setMovieViewDeleteRedirect} className="btn btn-primary">Movie View</button>
       </div>
    </div>
    </div>
    );
  }
}

export default withRouter(AdminHome);
