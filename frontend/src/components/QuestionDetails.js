import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionDetailsPoll from './QuestionDetailsPoll'
import QuestionDetailsResult from './QuestionDetailsResult'
import { handleAnswerQuestion } from '../actions/questions'
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types'

class QuestionDetail extends Component {
	static propTypes = {
		userReply: PropTypes.string,
		question: PropTypes.object.isRequired,
		author: PropTypes.object.isRequired,
	}

	submitAnswer = (answer) => {
		const { dispatch, question } = this.props
		const qid = question.id
		dispatch(handleAnswerQuestion(qid, answer))
	}
	
	render(){
		const {question, author, userReply} = this.props
		if (question === undefined) {
	      return <div>404: Invalid Question ID</div>
	    }
		return(
			<div className='question'>
			<Card>
			<Card.Header>{author.name} asks:</Card.Header>

			  <Card.Body>
		  			<img
		          src={author.avatarURL}
		          alt={`Avatar of ${author.name}`}
		          className='avatar'
		        />
			  	<Card.Title>Would you rather?</Card.Title>
				{userReply === null 
					? <QuestionDetailsPoll 
						question={question} 
						submitAnswer = {this.submitAnswer}/>
					: <QuestionDetailsResult
						question={question}
						userReply={userReply}/>
				}
			</Card.Body>
			</Card>
			</div>
		)
	}
}

function mapStateToProps ({authedUser, questions, users}, props) {
  const { id } = props.match.params
  let question
  let author
  if (questions[id] !== undefined){
  	question = questions[id]
  	author = users[question.author]
  }

  const userReply = users[authedUser].answers[id] 
  ? users[authedUser].answers[id]
  : null

  return {
    question,
    author,
    userReply
  }
}

export default connect(mapStateToProps)(QuestionDetail)