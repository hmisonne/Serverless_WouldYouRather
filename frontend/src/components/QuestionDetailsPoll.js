import React, { Component } from 'react'
import PropTypes from 'prop-types'

class QuestionDetailsPoll extends Component {
	static propTypes = {
		question: PropTypes.object.isRequired,
		submitAnswer: PropTypes.func.isRequired,
	}
	state = {
		selectedOption: 'optionOne'
	}
	handleVote = (e) => {
		e.preventDefault()
		this.props.submitAnswer(this.state.selectedOption)
	}
	handleOptionChange = (e) => {
		const {value} = e.target
		this.setState(()=>({
			selectedOption: value
		}))
	}
	render(){
		const {question} = this.props

		return(
				<form onSubmit={this.handleVote}>
			        <div className="radio">
			          <label>
			            <input type="radio"
				            value='optionOne' 
				            checked={this.state.selectedOption === 'optionOne'} 
				            onChange={this.handleOptionChange}/>
			            	{question.optionOne.text}
			          </label>
			        </div>
			        <div className="radio">
			          <label>
			            <input 
				            type="radio" 
				            value='optionTwo'
				            checked={this.state.selectedOption === 'optionTwo'} 
				            onChange={this.handleOptionChange}/>
				            {question.optionTwo.text}
			          </label>
			        </div>
			       <button className="btn btn-primary">Vote</button>
			      </form>
		)
	}
}



export default QuestionDetailsPoll