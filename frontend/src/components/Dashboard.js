import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import PropTypes from 'prop-types'

class Dashboard extends Component {
	static propTypes = {
	    unansweredQuestions: PropTypes.array.isRequired,
	    answeredQuestions: PropTypes.array.isRequired,
		users: PropTypes.object.isRequired,
	}

	state = {
		showUnanswered: true,
	}

	onToggle = () => {
		this.setState((prevState) => ({
			showUnanswered: !prevState.showUnanswered
		}))
	}

	render(){
		const {unansweredQuestions, answeredQuestions, users} = this.props
		const {showUnanswered}= this.state
		let visibleQuestions
		showUnanswered 
		? visibleQuestions = unansweredQuestions
		: visibleQuestions = answeredQuestions
		return(
			<div>
				<div className='center'>
					<h4>Dashboard</h4>
					<button 
						className="btn btn-primary"
						onClick = {this.onToggle}
						disabled={showUnanswered}>Unanswered</button>
					<button 
						className="btn btn-primary"
						onClick = {this.onToggle}
						disabled={!showUnanswered}>Answered</button>
				</div>

				<ul>
					{visibleQuestions.map((question) => (
						<li key={question.id}>
							<Question 
								question = {question}
								author = {users[question.author]} /> 
						</li>
					))}
				</ul>
			</div>
		)
	}
}
	


function mapStateToProps ({ questions, authedUser, users }) {
	// Sort questions based on authedUser response status

	const user = users[authedUser]
	let answeredQuestionIds = []
	if (user !== undefined) {answeredQuestionIds = user.answers} 

	let unansweredQuestions = []
	let answeredQuestions = []

	for (const key in questions) {
		if (answeredQuestionIds[key] === undefined){
			unansweredQuestions.push(questions[key])
		} else
		{
			answeredQuestions.push(questions[key])
		}
	}


	return {
		users,
		unansweredQuestions: unansweredQuestions
			.sort((b, a) => a.timestamp - b.timestamp),
		answeredQuestions: answeredQuestions
			.sort((b, a) => a.timestamp - b.timestamp)
	}
}
export default connect(mapStateToProps)(Dashboard)