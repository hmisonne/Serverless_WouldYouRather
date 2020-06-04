import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';
import Home from './components/Home'
import CreateEdit from './components/CreateEdit'
import PostDetail from './components/PostDetail'
import Nav from './components/Nav'

class App extends Component {

    render() {
        return (
            <Router>
              <Fragment>
                <div className='container'>
                  <Nav />
                  <div className="App">
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/:category' component={Home}/>
                    <Route exact path='/post/new/create' component={CreateEdit}/>
                    <Route exact path='/:category/:id' component={PostDetail}/>
                    <Route exact path='/:category/:id/update' component={CreateEdit}/>
                  </div>
                </div>
              </Fragment>
            </Router>
        );
    }
}

export default connect()(App)