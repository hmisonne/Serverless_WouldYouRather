import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from '../constants/ActionTypes'

export default function questions(state={}, action){
	switch (action.type) {
		case RECEIVE_QUESTIONS:
			return {
				...state,
				...action.questions
			}
		case ADD_QUESTION:
			const {question} = action
			return {
				...state,
				[question.id] : question,
			}
		case ANSWER_QUESTION:
			const {authedUser, qid, answer} = action
			return {
				...state,
				[qid] : { 
					...state[qid],
					[answer]:  {
						...state[qid][answer],
						votes: state[qid][answer].votes.concat([authedUser])
					}
				}
			}
		default:
			return state
	}
	
}

