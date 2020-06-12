import React, { Component } from 'react';
import "./css/Home.css";
import Logo from "./images/home_page.jpg";
import {Route} from 'react-router-dom';
import {  withRouter, Router} from 'react-router';
import {Redirect} from 'react-router-dom';



class Home extends Component {
  constructor(props)
  {
    super(props)
    console.log("Inside home constructor")
    console.log(this.props) 
    console.log(this.state)
    
  }

  state = {
    loginRedirect: false,
    signupRedirect: false,
    adminHomeRedirect: false
  }
  setLoginRedirect = () => {
    this.setState({
      loginRedirect: true
    })
  }
  
  setSignupRedirect = () => {
    console.log("Inside signup redirect")
    this.setState({
      signupRedirect: true
    })
  }

  setAdminHomeRedirect = () => {
    console.log("Inside adminHome redirect")
    this.setState({
      adminHomeRedirect: true
    })
  }

  renderRedirect = () => {
    if(this.state.loginRedirect){
      return <Redirect to={{ 
        pathname: '/Login', 
        locationNumber: this.props.state.locationNumber,
        cinemaHallNumber: this.props.state.cinemaHallNumber,
        movieNumber: this.props.state.movieNumber,
        userNumber: this.props.state.userNumber,
        bookingNumber: this.props.state.bookingNumber,
        checkInCheckOutNumber: this.props.state.checkInCheckOutNumber,
        reviewNumber: this.props.state.reviewNumber,
        locations: this.props.state.locations,
        cinemaHalls: this.props.state.cinemaHalls,
        movies: this.props.state.movies,
        userDetails: this.props.state.userDetails,
        movieBookings: this.props.state.movieBookings,
        userCheckInCheckouts: this.props.state.userCheckInCheckouts,
        reviews: this.props.state.reviews,
        addLocation: this.props.state.addLocation,
        deleteLocation: this.props.state.deleteLocation,
        addCinemaHall: this.props.state.addCinemaHall,
        deleteCinemaHall: this.props.state.deleteCinemaHall,
        addMovie: this.props.state.addMovie,
        removeMovie: this.props.state.removeMovie,
        updateMovie: this.props.state.updateMovie,
        signUp: this.props.state.signUp,
        bookMovieTicket: this.props.state.bookMovieTicket,
        cancelMovieTicket: this.props.state.cancelMovieTicket,
        checkIn: this.props.state.checkIn,
        checkOut: this.props.state.checkOut,  
        currentUserId: this.props.state.currentUserId,
        currentUserName: this.props.state.currentUserName        
      }}/>
    }
    if(this.state.signupRedirect){
      return <Redirect to={{ 
        pathname: '/Signup', 
        locationNumber: this.props.state.locationNumber,
        cinemaHallNumber: this.props.state.cinemaHallNumber,
        movieNumber: this.props.state.movieNumber,
        userNumber: this.props.state.userNumber,
        bookingNumber: this.props.state.bookingNumber,
        checkInCheckOutNumber: this.props.state.checkInCheckOutNumber,
        reviewNumber: this.props.state.reviewNumber,
        locations: this.props.state.locations,
        cinemaHalls: this.props.state.cinemaHalls,
        movies: this.props.state.movies,
        userDetails: this.props.state.userDetails,
        movieBookings: this.props.state.movieBookings,
        userCheckInCheckouts: this.props.state.userCheckInCheckouts,
        reviews: this.props.state.reviews,
        addLocation: this.props.state.addLocation,
        deleteLocation: this.props.state.deleteLocation,
        addCinemaHall: this.props.state.addCinemaHall,
        deleteCinemaHall: this.props.state.deleteCinemaHall,
        addMovie: this.props.state.addMovie,
        removeMovie: this.props.state.removeMovie,
        updateMovie: this.props.state.updateMovie,
        signUp: this.props.state.signUp,
        bookMovieTicket: this.props.state.bookMovieTicket,
        cancelMovieTicket: this.props.state.cancelMovieTicket,
        checkIn: this.props.state.checkIn,
        checkOut: this.props.state.checkOut,  
        currentUserId: this.props.state.currentUserId,
        currentUserName: this.props.state.currentUserName        
      }}/>
    }
      if(this.state.adminHomeRedirect){
        return <Redirect to={{ 
          pathname: '/AdminHome', 
          locationNumber: this.props.state.locationNumber,
          cinemaHallNumber: this.props.state.cinemaHallNumber,
          movieNumber: this.props.state.movieNumber,
          userNumber: this.props.state.userNumber,
          bookingNumber: this.props.state.bookingNumber,
          checkInCheckOutNumber: this.props.state.checkInCheckOutNumber,
          reviewNumber: this.props.state.reviewNumber,
          locations: this.props.state.locations,
          cinemaHalls: this.props.state.cinemaHalls,
          movies: this.props.state.movies,
          userDetails: this.props.state.userDetails,
          movieBookings: this.props.state.movieBookings,
          userCheckInCheckouts: this.props.state.userCheckInCheckouts,
          reviews: this.props.state.reviews,
          addLocation: this.props.state.addLocation,
          deleteLocation: this.props.state.deleteLocation,
          addCinemaHall: this.props.state.addCinemaHall,
          deleteCinemaHall: this.props.state.deleteCinemaHall,
          addMovie: this.props.state.addMovie,
          removeMovie: this.props.state.removeMovie,
          updateMovie: this.props.state.updateMovie,
          signUp: this.props.state.signUp,
          bookMovieTicket: this.props.state.bookMovieTicket,
          cancelMovieTicket: this.props.state.cancelMovieTicket,
          checkIn: this.props.state.checkIn,
          checkOut: this.props.state.checkOut,  
          currentUserId: this.props.state.currentUserId,
          currentUserName: this.props.state.currentUserName        
        }}/>
    } 
  
  }
  
  render() {
    {
      console.log("Inside home render");
      console.log(this.state)
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
    <div className="Home"   style={{
        position: 'absolute', left: '88%', top: '50%',
        transform: 'translate(-80%, -50%)'         
    }}>
        <button type="submit" onClick={this.setLoginRedirect} className="btn btn-primary">Login</button>
        <br></br>
        <br></br>
        <button type="submit" onClick={this.setSignupRedirect} className="btn btn-primary">SignUp</button>
        <br></br>
        <br></br>
        <button type="submit" onClick={this.setAdminHomeRedirect} className="btn btn-primary">AdminHome</button>
       </div>
    </div>
    </div>
    );
  }
}

export default withRouter(Home);
