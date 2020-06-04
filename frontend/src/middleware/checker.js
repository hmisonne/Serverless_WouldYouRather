import { ANSWER_QUESTION } from '../constants/ActionTypes'



const checker = (store) => (next) => (action) => {
	
	if (action.type === ANSWER_QUESTION) {
		if (store.getState().users[action.authedUser].answers[action.qid] !== undefined){
			return alert("Nope, you already answered")
		}
	} 
	return next(action)
		
}

export default checker