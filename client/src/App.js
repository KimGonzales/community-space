import React, { Component } from 'react';
import './App.css';
import AllDiscussions from './components/AllDiscussions';
import Home from './components/Home';
import About from './components/About';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DiscussionInput from './components/Discussions/DiscussionInput';
import CommentsContainer from './containers/CommentsContainer';
import Login from './components/Sessions/Login';
import Logout from './components/Sessions/Logout';
import $ from 'jquery';

class App extends Component {

  state = {
    signedIn: null
  }

  componentWillMount() {
    $.ajax({
      method: "GET",
      url: "/api/auth/is_signed_in.json"
    })
    .done(function(data){
      this.setState({ signedIn: data.signed_in });
    }.bind(this));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Community Space</h1>
          <Navbar />
        </header>
        <div className="App-body">
          <Route exact path="/" render={(props) => <Home {...props} signedIn={this.state.signedIn} />} />
          <Route exact path="/about" render={(props) => <About {...props} signedIn={this.state.signedIn} />} />
          <Route exact path="/discussions" render={(props) => <AllDiscussions {...props} signedIn={this.state.signedIn} />} />
          <Route exact path="/discussions/new" render={(props) => <DiscussionInput {...props} signedIn={this.state.signedIn} />} />
          <Route exact path="/discussions/:discussion_id/comments" render={(props) => <CommentsContainer {...props} signedIn={this.state.signedIn} />} />
          <Route exact path="/login" render={(props) => <Login {...props} signedIn={this.state.signedIn} />} />
        </div>
      </div>
    );
  }
}

export default App;