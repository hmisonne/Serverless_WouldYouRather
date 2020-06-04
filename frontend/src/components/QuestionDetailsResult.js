import React from 'react'
import QuestionDetailsResultCard from './QuestionDetailsResultCard'
import PropTypes from 'prop-types'

const QuestionDetailsResult = props => {
	const {question, userReply} = props
	let styleCard
	if (userReply === 'optionOne'){
		styleCard = {
		'optionOne':"#94f2bd",
		'optionTwo': ""}
	}
	else {
		styleCard = {
		'optionOne':"",
		'optionTwo': "#94f2bd"}
	}

	const optionOneVotes = question.optionOne.votes.length;
	const optionTwoVotes = question.optionTwo.votes.length;
	const totalVotes = optionOneVotes + optionTwoVotes
	const optionOneResult = Math.round(optionOneVotes / (totalVotes)*100)
	const optionTwoResult = Math.abs(optionOneResult - 100)
	return(
		<div>
			<QuestionDetailsResultCard 
				optionVotes={optionOneVotes}
				optionResult={optionOneResult}
				totalVotes={totalVotes}
				selection={userReply === "optionOne"}
				questionText={question.optionOne.text}
				styleCard={styleCard.optionOne}/>
			<QuestionDetailsResultCard 
				optionVotes={optionTwoVotes}
				optionResult={optionTwoResult}
				totalVotes={totalVotes}
				selection={userReply === "optionTwo"}
				questionText={question.optionTwo.text}
				styleCard={styleCard.optionTwo}/>
		</div>

	)

}



export default QuestionDetailsResult

QuestionDetailsResult.propTypes = {
	question: PropTypes.object.isRequired,
	userReply: PropTypes.string.isRequired,
}