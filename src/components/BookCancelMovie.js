import React, { Component } from 'react';
import "./css/Home.css";
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";
import Logo from "./images/home_page.jpg";
import {Route} from 'react-router-dom';
import {  withRouter, Router} from 'react-router';
import {Redirect} from 'react-router-dom';
import "./css/Location.css";
let selectedCinemaHallId = 0;
let defaultCinemaHallId = 0;
let cinemahalls = [];
let movies =[];
let unixstartDate = 0;
let userId = 0;
//const moviePrice = window.web3.utils.toWei(5, 'Ether')

const handleCinemaHallChange = (cinemahall) => {
  selectedCinemaHallId= cinemahall;
  defaultCinemaHallId = selectedCinemaHallId;
  console.log(selectedCinemaHallId);
}


class BookCancelMovie extends Component {
  constructor(props)
  {
    super(props)
    console.log("Inside book cancel constructor")
    console.log(this.props)
    console.log("state")
    console.log(this.state) 
    userId = this.props.location.currentUserId;
    if(this.props.location.cinemaHalls)
      {
        cinemahalls = this.props.location.cinemaHalls
      }
      
   // movies = this.props.location.movies
   if(this.props.location.movies)
      {
          movies = this.props.location.movies
      }
      
    console.log("movies")
    console.log(movies)
  }
  state = {
    movieRedirect: false,
    
  }
  

  setMovieRedirect = () => {
    console.log("inside set movie redirect")
    this.setState({
      movieRedirect: true
    })
    console.log(this.state.movieRedirect)
  }




  
  renderMovieRedirect = () => {
    console.log("ïnside. render redirect");
    console.log("home redirect value")
    console.log(this.state.movieRedirect)
   
  }

  
  render() {
    {
      console.log("Inside book-cancel render");
      console.log(this.props)
      console.log(cinemahalls)
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

<select name="cinemahall"  ref = {(input)=> this.menu = input} onChange={event => handleCinemaHallChange(event.target.value)}>
          {
            
          cinemahalls.map(function(n) { 
            
            if(!defaultCinemaHallId)
            {
              defaultCinemaHallId = n.id;
            }
              var id = n.id;
              var name = n.name;
              var active = n.active;
              
              if(active)
              {
              return (<option id={id} value={id} >{name}</option>);
   } })}
        </select>
        <button type="submit" onClick={this.setMovieRedirect} className="btn btn-primary">Check Movies</button>

        <p>&nbsp;</p>
        <h3>Movies</h3>
        <table className="table">
        <thead id="itemList">
          <tr>
            <th scope="col">Movie ID</th>
            <th scope="col">Movie Name</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
        
            <th scope="col"></th>
          </tr> 
        </thead>
        <tbody id="itemList">
            {
            movies.map((movie, key)=>{
          var stdate = new Date(movie.startDate*1000);
          var endate = new Date(movie.endDate*1000);
          console.log("**********")
          console.log()
          var months = ['Jan','Feb', 'Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var startyear = stdate.getFullYear();
          var endyear = endate.getFullYear();
          var startmonth = months[stdate.getMonth()];
          var endmonth = months[endate.getMonth()];
          var enddate = endate.getDate(); 
          var enddate = enddate + ' ' + endmonth + ' ' + endyear  ;
          var startdate = stdate.getDate();  
          var startdate = startdate + ' ' + startmonth + ' ' + startyear  ;
          var userId = 
                console.log(defaultCinemaHallId)
                console.log("Start Date Check")
                console.log(this.startdate)
          console.log("movie details")
          console.log(movie.active)
          
                if(this.state.movieRedirect)
                {
                  if(movie.active)
                  {
                  
                return(
                    <tr key={key}>
                    <th scope="row">{movie.id.toString()}</th> 
                    <td>{movie.name}</td> 
                    <td>{startdate}</td>
                    <td>{enddate}</td>
                    <td>{movie.startTime}</td>
                    <td>{movie.totalTime}</td>
                 
                    <td>
                      {
                        movie.active
                          ?
                          <button 
                            name = {movie.id}
                            onClick={async (event)=>{
                              await this.props.location.bookMovieTicket(userId, movie.id, movie.cinemaHallId, unixstartDate,  movie.startTime);
                            }}
                          >
                            Book Ticket
                          </button>
                          : 
                          null
                        }
                    </td>
                  </tr>
                )
                      }
                      
                      }
              
                      
            })}
        </tbody>
        </table>
      

       
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

export default BookCancelMovie;