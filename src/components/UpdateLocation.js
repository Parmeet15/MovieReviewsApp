import React, { Component } from 'react';
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";
import "./css/Location.css";
import {  withRouter, Router} from 'react-router';
import {Redirect} from 'react-router-dom';

let props = false;
let locations = []

class UpdateLocation extends Component {
  constructor(props){
    super(props)
    console.log("Inside update LOcation constructor")
    console.log(this.props) 

    if(this.props.location.locations)
    {
      locations = this.props.location.locations
    }
  }

  setValue = () => {
    console.log("inside setvalue")
    props = true;
    console.log(props)
  }

  
  
  render() {
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
        
        <p><h2><center><b><font face="biome">View/Delete Location</font></b></center></h2></p>
       
        <p>&nbsp;</p>
        <h3>Locations</h3>
        <table className="table">
        <thead id="itemList">
          <tr>
            <th scope="col">Location ID</th>
            <th scope="col">Location Name</th>
            <th scope="col">Active</th>
            <th scope="col"></th>
          </tr> 
        </thead>
        <tbody id="itemList">
            {
            
            locations.map((location, key)=>{
                return(
                    <tr key={key}>
                    <th scope="row">{location.id.toString()}</th>   
                    <td>{location.name}</td> 
                    <td>{location.active.toString()}</td> 
                    <td>
                      {
                        location.active
                          ?
                          <button 
                            name = {location.id}
                            onClick={async (event)=>{
                              await this.props.location.deleteLocation(event.target.name);
                              console.log("after delete function")
                              this.setValue()
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
            }) }
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

export default withRouter(UpdateLocation);