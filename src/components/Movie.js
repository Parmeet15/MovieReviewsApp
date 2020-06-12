import React, { Component } from 'react';
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";
import "./css/Location.css";

let selectedCinemaHallId = 0;
let defaultCinemaHallId = 0;
let cinemahalls = [];


const handleCinemaHallChange = (cinemahall) => {
     selectedCinemaHallId= cinemahall;
     defaultCinemaHallId = selectedCinemaHallId;
     console.log(selectedCinemaHallId);
}

class Movie extends Component {
  constructor(props){
    super(props)
    console.log("inside movie constructor");
    console.log(this.props)
    if(this.props.location.cinemaHalls)
    {
      cinemahalls = this.props.location.cinemaHalls
    }
  }
  render() {
    {
      console.log("inside movie");
      console.log(this.props);
      console.log(cinemahalls)
    }
    return (
      <div id="content" style={{
        backgroundColor: '#E0E0E0',
        width: '1530px',
        height: '650px'
      }}>
      <img src={Left} width="400" height="650"></img>
      <div className="Movie" style={{
        backgroundColor: 'white',
        width: '400px',
        height: '450px',
        position: 'absolute', left: '50%', top: '30%',
        transform: 'translate(-50%, -30%)' 
      }}>
        <p><h2><center><b><font face="biome">Add Movie Name</font></b></center></h2></p>
        <form onSubmit = 
          {async (event) => {
            event.preventDefault();
            console.log("Inside function on submit");
            
            
            var cinemahallId = 0;
           
            if(!selectedCinemaHallId){
                cinemahallId = defaultCinemaHallId
            }
            else{
                cinemahallId = selectedCinemaHallId;
            }
            const movieName = this.movieName.value;          
            let startDate = this.startDate.value;

            startDate = (new Date(startDate)).getTime();

            const unixstartDate = startDate/1000;
           
            let endDate = this.endDate.value;
            endDate = (new Date(endDate)).getTime();
            const unixendDate = endDate/1000;
            const startTime = this.startTime.value;
            const totalTime = this.totalTime.value;
            console.log(cinemahallId);
            console.log(movieName);
            console.log(startDate);
            console.log(unixstartDate);
            console.log(endDate);
            console.log(startTime);
            console.log(totalTime);

            console.log(this.props);
            
            await this.props.location.addMovie(movieName, cinemahallId, unixstartDate, unixendDate, startTime, totalTime)
          }
            
          }>
        <div className="form-group mr-sm-2">
          Location
         
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
            <input 
            id="movieName"
            type="text"
            ref={(input)=>{this.movieName=input}}
            className="form-control"
            placeholder="Movie Name"
            required/>

            <input 
            id="startDate"
            type="text"
            ref={(input)=>{this.startDate=input}}
            className="form-control"
            placeholder="Start Date"
            required/>

            <input 
            id="startTime"
            type="text"
            ref={(input)=>{this.startTime=input}}
            className="form-control"
            placeholder="Start Time"
            required/>  

            <input 
            id="endDate"
            type="text"
            ref={(input)=>{this.endDate=input}}
            className="form-control"
            placeholder="End Date"
            required/>

            <input 
            id="totalTime"
            type="text"
            ref={(input)=>{this.totalTime=input}}
            className="form-control"
            placeholder="Total Time"
            required/>                         

        </div>
       <center>
        <button type="submit" className="btn btn-primary">Add Movie</button>
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

export default Movie;
