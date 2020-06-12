import React, { Component } from 'react';
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";
import MovieBooking from './MovieBooking'
import {Redirect, BrowserRouter, Route} from 'react-router-dom';
import Logo from "./images/home_page.jpg";
import {  withRouter, Router} from 'react-router';

let username = '';
let userid = 0;

class UserHome extends Component {
  constructor(props)
  {
    super(props)
    console.log("Inside UserHome constructor")
    console.log(this.props) 
  }

 

  state = {
    homeRedirect: false,
    BookCancelMovieRedirect: false,
    CheckInCheckOutRedirect: false,
    CheckOutOnly: false,
    MovieReviewRedirect: false
  }
  
  setHomeRedirect = () => {
    this.setState({
      homeRedirect: true
    })
  }
  setBookCancelMovieRedirect= () => {
    this.setState({
      BookCancelMovieRedirect: true
    })
  }
  setCheckInCheckOutRedirect= () => {
    this.setState({
      CheckInCheckOutRedirect: true
    })
  }

  setCheckOutOnlyRedirect= () => {
    this.setState({
      CheckOutOnlyRedirect: true
    })
  }
  setMovieReviewRedirect= () => {
    this.setState({
      MovieReviewRedirect: true
    })
  }
  renderRedirect = () => {
    if(this.state.homeRedirect){
      alert("UserHome successfull");     
    }
    if(this.state.BookCancelMovieRedirect)
    {
      return <Redirect to={{ 
        pathname: '/BookCancelMovie',
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
    }
    if(this.state.CheckInCheckOutRedirect){
      return <Redirect to={{ 
        pathname: '/CheckInCheckOut',
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
    }
    if(this.state.CheckOutOnlyRedirect){
      return <Redirect to={{ 
        pathname: '/CheckOut',
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
  }
    if(this.state.MovieReviewRedirect){
      return <Redirect to={{ 
        pathname: '/MovieReviews',
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
    }
    
  }

  render() {
    {
      console.log("Inside Home render");
    }
    return (
      <div id="content" style={{
        backgroundColor: '#E0E0E0',
        width: '1530px',
        height: '650px'
      }}>
        {this.renderRedirect()}
    <div style={{
        backgroundColor: 'white',
        width: '1100px',
        height: '650px' 
      }}>
    <img src={Logo} width="1100" height="650"></img>
    <div className="UserHome"   style={{
        position: 'absolute', left: '88%', top: '50%',
        transform: 'translate(-80%, -50%)'         
    }}>
        <button type="submit" onClick={this.setBookCancelMovieRedirect} className="btn btn-primary">Book Movie</button>
        <br></br>
        <br></br>
        <button type="submit" onClick={this.setCheckInCheckOutRedirect} className="btn btn-primary">Check In</button>
        <br></br>
        <br></br>
        <button type="submit" onClick={this.setCheckOutOnlyRedirect} className="btn btn-primary">Check Out</button>
        <br></br>
        <br></br>
        <button type="submit" onClick={this.setMovieReviewRedirect} className="btn btn-primary">Movie Reviews</button>
        <br></br>
        <br></br>
       </div>
    </div>
    </div>
    );
  }
}

export default withRouter(UserHome);