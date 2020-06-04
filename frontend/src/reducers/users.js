import { RECEIVE_USERS, ADD_QUESTION, ANSWER_QUESTION} from '../constants/ActionTypes'

export default function users(state={}, action){
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users
			}
		case ADD_QUESTION:
			const {question} = action
			return {
				...state,
				[question.author] : {
					...state[question.author],
					questions: state[question.author].questions.concat(question.id),
					score: state[question.author].score + 1
				}
			}
		case ANSWER_QUESTION:
			const {authedUser, qid, answer} = action
			return {
				...state,
				[authedUser]: {
					...state[authedUser],
					answers: {
						...state[authedUser].answers,
						[qid]: answer
					}
				}
			}
		default:
			return state
	}
	
}