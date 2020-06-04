import React, { Component, Fragment} from 'react';
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import { setAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard'
import NewQuestions from './NewQuestions'
import QuestionDetails from './QuestionDetails'
import Nav from './Nav'
import Login from './Login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PropTypes from 'prop-types'


class App extends Component {
	static propTypes = {
	    dispatch: PropTypes.func.isRequired,
	    loading: PropTypes.bool.isRequired,
	  }
	componentDidMount(){
		this.props.dispatch(handleInitialData())
	}
	logout = () => {
		this.props.dispatch(setAuthedUser(null))
	}
	render(){
		const {authedUserName, users} =this.props
		if (authedUserName === null){
			return(
				<Login/>
				)
		}
		return (
			<Router>
				<Fragment>
					<LoadingBar />
					    <div className="container">
					    	<Nav 
					    		authedUserName={authedUserName}
					    		logout={this.logout}/>
					    	{this.props.loading === true 
							  	? null
							  	: 
							  	<div>
									<Route exact path='/' component={Dashboard}/>
									<Route exact path='/login' component={Login}/>
									<Route path='/add' component={NewQuestions}/>
									<Route path='/questions/:id' component={QuestionDetails}/>
							        <Route exact path='/leaderboard' component={Leaderboard}/>
							        
							    </div>
						}
				    </div>
			    </Fragment>
			</Router>
		  );
	}
  
}

function mapStateToProps ({ authedUser, users }) {
	// Retrieve authed username for NavBar
	let authedUserName = null
	if (users[authedUser] !== undefined) { authedUserName=users[authedUser].name }
	

	return {
		loading: authedUser === null,
		authedUserName,
	}
}

export default connect(mapStateToProps)(App);