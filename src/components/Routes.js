mport React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

//import About from "./About/About";   
//import Contact from "./Contact/Contact";
//import Products from "./Product/Products";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Signup" component={Signup} />
                    <Route path="/Login" component={Login} />
                </Switch>
            </Router>
        )
    }
}