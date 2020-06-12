import React, { Component } from 'react';
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";
import "./css/Location.css";

let selectedLocationId = 0;
let defaultLocationId = 0;
let locations = [];

//const [location, setLocation] = React.useState('');

const handleLocationChange = (location) => {
     //setLocation(location);
     selectedLocationId= location;
     defaultLocationId = selectedLocationId;
     console.log(selectedLocationId);
}

class Cinema extends Component {
  constructor(props){
    super(props)
    if(this.props.location.locations)
    {
      locations = this.props.location.locations
    }
  }
  render() {
    {
      console.log("inside cinema hall");
      console.log(this.props);
      console.log(locations)
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
        <p><h2><center><b><font face="biome">Add Cinema Hall</font></b></center></h2></p>
        <form onSubmit = 
          {async (event) => {
            event.preventDefault();
            console.log("Inside function on submit");
            
            
            var locationId = 0;
           
            if(!selectedLocationId){
              locationId = defaultLocationId
            }
            else{
            locationId = selectedLocationId;
            }
            const cinemaName = this.cinemaName.value;          

            console.log(locationId);
            console.log(cinemaName);
            
            await this.props.location.addCinemaHall(cinemaName, locationId)
          }
            
          }>
        <div className="form-group mr-sm-2">
          Location
         
          <select name="location"  ref = {(input)=> this.menu = input} onChange={event => handleLocationChange(event.target.value)}>
          {
            
          locations.map(function(n) { 
            
            if(!defaultLocationId)
            {
              defaultLocationId = n.id;
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
            id="cinemaName"
            type="text"
            ref={(input)=>{this.cinemaName=input}}
            className="form-control"
            placeholder="Cinema Hall Name"
            required/>
        </div>
       <center>
        <button type="submit" className="btn btn-primary">Add Cinema</button>
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

export default Cinema;
