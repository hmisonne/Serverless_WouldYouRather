import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types'
import {formatDate} from '../utils/helpers'

class Question extends Component {
	static propTypes = {
		question: PropTypes.object.isRequired,
		author: PropTypes.object.isRequired,
	}
	toPoll = (e, id) => {
		e.preventDefault()
		this.props.history.push(`/questions/${id}`)
	}
	render(){
		const {question, author} = this.props
		const formattedDate = formatDate(question.timestamp)
		return(
			<Card>
			  <Card.Header>{formattedDate} - {author.name} asks:</Card.Header>
			  <Card.Body>
				  <img
			          src={author.avatarURL}
			          alt={`Avatar of ${author.name}`}
			          className='avatar'
			        />
			    <Card.Title>Would you rather?</Card.Title>

			    <Card.Text>
			       {question.optionOne.text} Or {question.optionTwo.text}
			    </Card.Text>
			    <button className="btn btn-primary" onClick={(e) => this.toPoll(e, question.id)}>View Poll</button>
			  </Card.Body>
			</Card>
		)
	}
}



export default withRouter(Question)