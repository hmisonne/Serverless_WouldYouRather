import * as actions from './questions'

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['sarahedo'],
      text: 'have horrible short term memory',
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory'
    }
  },
}
let authedUser = "tylermcginnis"
let qid = "8xf0y6ziyjabvozdd253nd"
let answer= "optionOne"

describe('question actions', () => {
	it('receiveQuestions should create RECEIVE_QUESTIONS action', () => {
		expect(actions.receiveQuestions(questions)).toEqual({
			type: 'RECEIVE_QUESTIONS',
			questions: questions
		})
	})
	it('addQuestion should create ADD_QUESTION action', ()=>{
		expect(actions.addQuestion(questions["8xf0y6ziyjabvozdd253nd"])).toEqual({
			type: 'ADD_QUESTION',
			question: questions["8xf0y6ziyjabvozdd253nd"]
		})
	})
	it('answerQuestion should create ADD_QUESTION action', ()=>{
		expect(actions.answerQuestion(authedUser, qid, answer)).toEqual({
			type: 'ANSWER_QUESTION',
			authedUser, 
			qid, 
			answer
		})
	})
})