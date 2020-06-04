import questions from './questions'

let questionsSample = {
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
let answer= "optionTwo"

describe('questions reducer', () => {
	it('should handle initial state', () => {
		expect(
			questions(undefined, {})
		).toEqual({})
	})

	it('should handle RECEIVE_QUESTIONS', () => {
		expect(
			questions({}, {
				type: 'RECEIVE_QUESTIONS',
				questions: questionsSample
			})
			).toEqual(questionsSample)
	})

	it('should handle ADD_QUESTION', () => {
		expect(
			questions({}, {
				type: 'ADD_QUESTION',
				question: questionsSample["8xf0y6ziyjabvozdd253nd"]
			})
			).toEqual(questionsSample)
	})
	it('should handle ANSWER_QUESTION', () => {
		expect(
			questions(questionsSample, {
				type: 'ANSWER_QUESTION',
				authedUser, 
				qid, 
				answer
			})
			).toEqual(
			{
			  "8xf0y6ziyjabvozdd253nd": {
			    id: '8xf0y6ziyjabvozdd253nd',
			    author: 'sarahedo',
			    timestamp: 1467166872634,
			    optionOne: {
			      votes: ['sarahedo'],
			      text: 'have horrible short term memory',
			    },
			    optionTwo: {
			      votes: ['tylermcginnis'],
			      text: 'have horrible long term memory'
			    }
			  },
			})
	})
})
