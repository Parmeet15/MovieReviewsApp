import React, { Component } from 'react';
import Left from "./images/left.jpg";
import Right from "./images/right.jpg";
import "./css/Location.css";
import {  withRouter, Router} from 'react-router';
import {Redirect} from 'react-router-dom';

let props = false;
let reviews = [];
let movies = [];
let unixstartDate = 0;

class MovieReviews extends Component {
  constructor(props){
    super(props)
    console.log("Inside update LOcation constructor")
    console.log(this.props) 

    if(this.props.location.reviews)
    {
      reviews = this.props.location.reviews
    }
    if(this.props.location.movies)
      {
          movies = this.props.location.movies
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
        
        <p><h2><center><b><font face="biome">View Reviews</font></b></center></h2></p>
       
        <p>&nbsp;</p>
        <h3>Movie Reviews</h3>
        <table className="table">
        <thead id="itemList">
          <tr>
            <th scope="col">Review ID</th>
            <th scope="col">Movie</th>
            <th scope="col">Rating</th>
            <th scope="col">Review</th>
           
          </tr> 
        </thead>
        <tbody id="itemList">
            {
            
            reviews.map((review, key)=>{

                return(
                    <tr key={key}>

                    <th scope="row">{review.reviewId.toString()}</th>  
                    <td>{movies[review.movieId - 1].name}</td>  
                    <td>{review.rating}</td> 
                    <td>{review.review}</td> 
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

export default withRouter(MovieReviews);