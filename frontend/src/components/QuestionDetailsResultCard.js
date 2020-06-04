import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types'

const QuestionDetailsResultCard = props => {
	const {
		optionResult, 
		selection, 
		optionVotes, 
		totalVotes, 
		questionText, 
		styleCard} = props
	return (
			<Card.Text style={{backgroundColor: styleCard}}>
			{selection && <span>Your Vote: </span>} {questionText} 
			    
				<ProgressBar now={optionResult} label={`${optionResult}%`} />
				
			       {optionVotes} out of {totalVotes}
			    </Card.Text>
		)
	
}			    

export default QuestionDetailsResultCard

QuestionDetailsResultCard.propTypes = {
	optionResult: PropTypes.number.isRequired, 
	selection: PropTypes.bool.isRequired, 
	optionVotes: PropTypes.number.isRequired, 
	totalVotes: PropTypes.number.isRequired,
	questionText: PropTypes.string.isRequired,
	styleCard: PropTypes.string.isRequired,
}	    