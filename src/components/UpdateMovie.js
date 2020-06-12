// Admin View Delete Movies
import React, { Component } from 'react';
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";
import "./css/Location.css";

let selectedCinemaHallId = 0;
let defaultCinemaHallId = 0;
let movies = [];

const handleCinemaHallChange = (cinemahall) => {
    //setLocation(location);
    selectedCinemaHallId= cinemahall;
    defaultCinemaHallId = selectedCinemaHallId;
    console.log(selectedCinemaHallId);
}
class UpdateMovie extends Component{
  constructor(props){
      super(props)
      if(this.props.location.movies)
      {
          movies = this.props.location.movies
      }
  } 
  render() 
  {
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
        <p><h2><center><b><font face="biome">Add Movie</font></b></center></h2></p>
             
        <p>&nbsp;</p>
        <h3>Movies</h3>
        <table className="table">
        <thead id="itemList">
          <tr>
            <th scope="col">Movie ID</th>
            <th scope="col">Cinema Hall ID</th>
            <th scope="col">Movie Name</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Active</th>
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
                console.log(defaultCinemaHallId)
                
                return(
                    <tr key={key}>
                    <th scope="row">{movie.id.toString()}</th>                     
                    <td>{movie.cinemaHallId}</td> 
                    <td>{movie.name}</td> 
                    <td>{startdate}</td>
                    <td>{enddate}</td>
                    <td>{movie.startTime}</td>
                    <td>{movie.totalTime}</td>
                    <td>{movie.active.toString()}</td> 
                    <td>
                      {
                        movie.active
                          ?
                          <button 
                            name = {movie.id}
                            onClick={async (event)=>{
                              await this.props.location.removeMovie(event.target.name);
                            }}
                          >
                            Delete
                          </button>
                          : 
                          null
                        }
                    </td>
                  </tr>
                )
              
                      
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

export default UpdateMovie;