import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import MovieReview from '../abis/MovieReview'
import Addressbar from './Addressbar'
import Login from './Login'
import Signup from './Signup'
import Location from './Location'
import Cinema from './Cinema'
import UpdateCinemaHall from './UpdateCinemaHall'
import Home from './Home'
import UserHome from './UserHome'
import AdminHome from './AdminHome'
import UpdateLocation from './UpdateLocation'
import Movie from './Movie'
import UpdateMovie from './UpdateMovie'
import CheckInCheckOut from './CheckInCheckOut'
import CheckOut from './CheckOut'

import BookCancelMovie from'./BookCancelMovie'


import MovieReviews from'./MovieReviews'
import { Link, BrowserRouter as Router, Route, Switch , BrowserRouter} from 'react-router-dom';

import {  withRouter} from 'react-router';

class App extends Component {
  constructor(){
    super()
    this.state.addLocation = this.addLocation
    this.state.deleteLocation = this.deleteLocation
    this.state.addCinemaHall = this.addCinemaHall
    this.state.deleteCinemaHall = this.deleteCinemaHall
    this.state.addMovie = this.addMovie
    this.state.removeMovie = this.removeMovie
    this.state.updateMovie = this.updateMovie
    this.state.signUp = this.signUp
    this.state.bookMovieTicket = this.bookMovieTicket
    this.state.cancelMovieTicket = this.cancelMovieTicket
    this.state.checkIn = this.checkIn
    this.state.checkOut = this.checkOut

  }

  state = {    
    account: '',
    loading: true,
    owner: '',
    locationNumber: 0,
    cinemaHallNumber: 0,
    movieNumber: 0,
    userNumber: 0,
    bookingNumber: 0,
    checkInCheckOutNumber: 0,
    reviewNumber: 0,
    locations: [],
    cinemaHalls: [],
    movies: [],
    userDetails: [],
    movieBookings: [],
    userCheckInCheckouts: [],
    reviews: [],
    currentUserId: 0,
    currentUserName: '' 
  }

  async componentDidMount(){
    await this.getWeb3Provider();
    await this.connectToBlockchain();
  }
  
  async getWeb3Provider(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async connectToBlockchain(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts(); //account of metmask
    this.setState({account: accounts[0]}) // store the value of key and that value can be accessed anywhere between different componenets. like a cookie
    const networkId = await web3.eth.net.getId()  //it gives 5777
    const networkData = MovieReview.networks[networkId];
    if(networkData) {
      const deployedMovieReview = new web3.eth.Contract(MovieReview.abi, networkData.address); //use abi (bytecode) as bridge
      this.setState({deployedMovieReview: deployedMovieReview}); // or  this.setState({deployedMovieReview});  if name and value is same
      const locationNumber = await deployedMovieReview.methods.locationNumber().call(); //locationNumber is public variable in MovieReview.sol therefore can be used like this
      const cinemaHallNumber = await deployedMovieReview.methods.cinemaHallNumber().call();
      const movieNumber = await deployedMovieReview.methods.movieNumber().call();
      const userNumber = await deployedMovieReview.methods.userNumber().call();
      const bookingNumber = await deployedMovieReview.methods.bookingNumber().call();
      const checkInCheckOutNumber = await deployedMovieReview.methods.checkInCheckOutNumber().call();
      const reviewNumber = await deployedMovieReview.methods.reviewNumber().call();
     
      console.log("locationNumber - "+locationNumber);
      console.log("cinemaHallNumber - "+cinemaHallNumber);
      console.log("movieNumber - "+movieNumber);
      console.log("userNumber - "+userNumber);
      console.log("checkInCheckOutNumber - "+checkInCheckOutNumber);
      console.log("bookingNumber - "+bookingNumber);
      console.log("reviewNumber - "+reviewNumber);

      this.setState({locationNumber})
      this.setState({cinemaHallNumber})
      this.setState({movieNumber})
      this.setState({userNumber})
      this.setState({bookingNumber})
      this.setState({checkInCheckOutNumber})
      this.setState({reviewNumber})

      // setting state for locations
      for (var i = 1;i<= locationNumber;i++) {
        const location = await deployedMovieReview.methods.locations(i).call();
        this.setState({
          locations:[...this.state.locations, location] 
        });
      }
      console.log(this.state.locations);

      // setting state for cinemaHalls
      for (var i = 1;i<= cinemaHallNumber;i++) {
        const cinemaHall = await deployedMovieReview.methods.cinemaHalls(i).call();
        this.setState({
          cinemaHalls:[...this.state.cinemaHalls, cinemaHall] 
        });
      }
      console.log(this.state.cinemaHalls);

      // setting state for movies
      for (var i = 1;i<= movieNumber;i++) {
        const movie = await deployedMovieReview.methods.movies(i).call();
        this.setState({
          movies:[...this.state.movies, movie]
        });
      }
      console.log(this.state.movies);

      // setting state for user login credentials
      for (var i = 1;i<= userNumber;i++) {
        const userDetail = await deployedMovieReview.methods.userDetails(i).call();
        this.setState({
          userDetails:[...this.state.userDetails, userDetail] 
        });
      }
      console.log(this.state.userDetails);

      // setting state for movie bookings
      for (var i = 1;i<= bookingNumber;i++) {
        const movieBooking = await deployedMovieReview.methods.movieBookings(i).call();
        this.setState({
          movieBookings:[...this.state.movieBookings, movieBooking] 
        });
      }
      console.log(this.state.movieBookings);

      // setting state for checkin checkouts
      for (var i = 1;i<= checkInCheckOutNumber;i++) {
        const userCheckInCheckout = await deployedMovieReview.methods.userCheckInCheckouts(i).call();
        this.setState({
          userCheckInCheckouts:[...this.state.userCheckInCheckouts, userCheckInCheckout] 
        });
      }
      console.log(this.state.userCheckInCheckouts);

      // setting state for reviews
      for (var i = 1;i<= reviewNumber;i++) {
        const review = await deployedMovieReview.methods.reviews(i).call();
        this.setState({
          reviews:[...this.state.reviews, review] 
        });
      }
      console.log(this.state.reviews);
    
      this.setState({loading: false})

    } else {
      window.alert('MovieReview contract is not found in your blockchain.')
    }
  
  }


  addLocation = async (locationName) => {
    this.setState ({loading: true})
    const gasAmount = await this.state.deployedMovieReview.methods.addLocation(locationName).estimateGas({from: this.state.account}) //we are changing the state so .call () is not enough ...we need to specify account and gas will be 
    this.state.deployedMovieReview.methods.addLocation(locationName).send({from: this.state.account, gas: gasAmount}) //actual sending the real transaction
    .once('receipt', (receipt)=> {
      this.setState({loading: false});
    })
  }

  deleteLocation = async (id) => {
    this.setState ({loading: true})
    console.log("ïnside applicationCache.js delete location function")
    const gasAmount = await this.state.deployedMovieReview.methods.deleteLocation(id).estimateGas({from: this.state.account}) //we are changing the state so .call () is not enough ...we need to specify account and gas will be 
    this.state.deployedMovieReview.methods.deleteLocation(id).send({from: this.state.account, gas: gasAmount}) //actual sending the real transaction
    .once('receipt', (receipt)=> {
      console.log("after delete")
      this.setState({loading: false});
    })
  }


  addCinemaHall = async (name, locationID) => {
    this.setState ({loading: true})
    const gasAmount = await this.state.deployedMovieReview.methods.addCinemaHall(name, locationID).estimateGas({from: this.state.account}) //we are changing the state so .call () is not enough ...we need to specify account and gas will be 
    this.state.deployedMovieReview.methods.addCinemaHall(name, locationID).send({from: this.state.account, gas: gasAmount}) //actual sending the real transaction
    .once('receipt', (receipt)=> {
      this.setState({loading: false});
    })
  }


  deleteCinemaHall = async (id) => {
    this.setState ({loading: true})
    const gasAmount = await this.state.deployedMovieReview.methods.deleteCinemaHall(id).estimateGas({from: this.state.account}) //we are changing the state so .call () is not enough ...we need to specify account and gas will be 
    this.state.deployedMovieReview.methods.deleteCinemaHall(id).send({from: this.state.account, gas: gasAmount}) //actual sending the real transaction
    .once('receipt', (receipt)=> {
      this.setState({loading: false});
    })
  }


  addMovie = async (name, cinemaHallID, startDate, endDate, startTime, totalTime) => {
    this.setState ({loading: true})
    const gasAmount = await this.state.deployedMovieReview.methods.addMovie(name, cinemaHallID, startDate, endDate, startTime, totalTime).estimateGas({from: this.state.account}) //we are changing the state so .call () is not enough ...we need to specify account and gas will be 
    this.state.deployedMovieReview.methods.addMovie(name, cinemaHallID, startDate, endDate, startTime, totalTime).send({from: this.state.account, gas: gasAmount}) //actual sending the real transaction
    .once('receipt', (receipt)=> {
      this.setState({loading: false});
    })
  }


  removeMovie = async (id) => {
    this.setState ({loading: true})
    const gasAmount = await this.state.deployedMovieReview.methods.removeMovie(id).estimateGas({from: this.state.account}) //we are changing the state so .call () is not enough ...we need to specify account and gas will be 
    this.state.deployedMovieReview.methods.removeMovie(id).send({from: this.state.account, gas: gasAmount}) //actual sending the real transaction
    .once('receipt', (receipt)=> {
      this.setState({loading: false});
    })
  }


  updateMovie = async (id, startDate,endDate, startTime, totalTime) => {
    this.setState ({loading: true})
    const gasAmount = await this.state.deployedMovieReview.methods.updateMovie(id, startDate,endDate, startTime, totalTime).estimateGas({from: this.state.account}) //we are changing the state so .call () is not enough ...we need to specify account and gas will be 
    this.state.deployedMovieReview.methods.updateMovie(id, startDate,endDate, startTime, totalTime).send({from: this.state.account, gas: gasAmount}) //actual sending the real transaction
    .once('receipt', (receipt)=> {
      this.setState({loading: false});
    })
  }

  signUp = async (name, email, password) => {
    this.setState ({loading: true})
    alert("Signup click");
    
    const gasAmount = await this.state.deployedMovieReview.methods.signUp(name, email, password).estimateGas({from: this.state.account}) //we are changing the state so .call () is not enough ...we need to specify account and gas will be 
    this.state.deployedMovieReview.methods.signUp(name, email, password).send({from: this.state.account, gas: gasAmount}) //actual sending the real transaction
    .once('receipt', (receipt)=> {
      this.setState({loading: false});
    
    })
    
  }


  bookMovieTicket = async (userId, movieId, cinemaHallId, date, time) => {
    this.setState ({loading: true})
    window.web3 = new Web3(window.ethereum);
    const moviePrice = window.web3.utils.toWei('5', 'Ether')
    const gasAmount = await this.state.deployedMovieReview.methods.bookMovieTicket(userId, movieId, cinemaHallId, date, time).estimateGas({from: this.state.account, value: moviePrice})
    this.state.deployedMovieReview.methods.bookMovieTicket(userId, movieId, cinemaHallId, date, time).send({from: this.state.account, value: moviePrice, gas: gasAmount })
    .once('receipt', (receipt)=> {
      this.setState({loading: false});
    })
  }

  cancelMovieTicket = async (userId, movieId) => {
    this.setState ({loading: true})
    const gasAmount = await this.state.deployedMovieReview.methods.cancelMovieTicket(userId, movieId).estimateGas({from: this.state.account}) //we are changing the state so .call () is not enough ...we need to specify account and gas will be 
    this.state.deployedMovieReview.methods.cancelMovieTicket(userId, movieId).send({from: this.state.account, gas: gasAmount}) //actual sending the real transaction
    .once('receipt', (receipt)=> {
      this.setState({loading: false});
    })
  }


  checkIn = async (userId, movieId, checkInTime) => {
    this.setState ({loading: true})
    const gasAmount = await this.state.deployedMovieReview.methods.checkIn(userId, movieId, checkInTime).estimateGas({from: this.state.account}) //we are changing the state so .call () is not enough ...we need to specify account and gas will be 
    this.state.deployedMovieReview.methods.checkIn(userId, movieId, checkInTime).send({from: this.state.account, gas: gasAmount}) //actual sending the real transaction
    .once('receipt', (receipt)=> {
      this.setState({loading: false});
    })
  }
 
  checkOut = async (userId, movieId, checkOutTime, review) => {
    this.setState ({loading: true})
    const gasAmount = await this.state.deployedMovieReview.methods.checkOut(userId, movieId, checkOutTime, review).estimateGas({from: this.state.account}) //we are changing the state so .call () is not enough ...we need to specify account and gas will be 
    this.state.deployedMovieReview.methods.checkOut(userId, movieId, checkOutTime, review).send({from: this.state.account, gas: gasAmount}) //actual sending the real transaction
    .once('receipt', (receipt)=> {
      this.setState({loading: false});
    })
  }

   
  render() {
    return (
      <div>
        <Addressbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main>
              { this.state.loading
                ? 
                  <div><p className="text-center">Loading ...</p></div> 
                : 
                <Router>
                  <Link to="/">Home</Link>
                  <Link to="/Home">Home</Link>
                  <Link to="/UserHome">UserHome</Link>
                  <Link to="/AdminHome">UserHome</Link>
                  <Link to="/Login">Login</Link>
                  <Link to="/Signup">Login</Link>
                  <Link to="/Location">Location</Link>
                  <Link to="/UpdateLocation">Location</Link>
                  <Link to="/Cinema">Cinema</Link>
                  <Link to="/UpdateCinemaHall">UpdateCinemaHall</Link>
                  <Link to="/Movie">Movie</Link>
                  <Link to="/UpdateMovie">UpdateMovie</Link>
                  <Link to="/BookCancelMovie">BookCancelMovie</Link>
                 
                  <Link to="/CheckInCheckOut">CheckInCheckOut</Link>
                  <Link to="/CheckOut">CheckOut</Link>
                  <Link to="/MovieReviews">MovieReviews</Link>

                  
                  <Route exact path="/" render={(props) => <Home {...props} state = {this.state}/>} />
                  <Route exact path="/Home" component={Home} />
                  <Route exact path="/UserHome" component={UserHome} />
                  <Route exact path="/AdminHome" component={AdminHome} />
                  <Route exact path="/Login" component={Login} />
                  <Route exact path="/Signup" component={Signup} />
                  <Route exact path="/Location" component={Location} />
                  <Route exact path="/UpdateLocation" component={UpdateLocation} />
                  <Route exact path="/Cinema" component={Cinema} />
                  <Route exact path="/UpdateCinemaHall" component={UpdateCinemaHall} />
                  <Route exact path="/Movie" component={Movie} />
                  <Route exact path="/UpdateMovie" component={UpdateMovie} />
                  <Route exact path="/BookCancelMovie" component={BookCancelMovie} />
                 
                  <Route exact path="/CheckInCheckOut" component={CheckInCheckOut} />
                  <Route exact path="/CheckOut" component={CheckOut} />
                  <Route exact path="/MovieReviews" component={MovieReviews} />
                </Router>
               
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
