import { apiEndpoint } from '../config'
import { Question } from '../types/Question';
import Axios from 'axios'
import { CreateQuestionRequest } from '../types/CreateQuestionRequest'


export async function getQuestions(idToken: string): Promise<Question[]> {
  console.log('Fetching questions')

  const response = await Axios.get(`${apiEndpoint}/questions`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Questions:', response.data)
  return response.data.items
}

export async function createQuestion(idToken: string, newQuestion: CreateQuestionRequest): Promise<Question> {
    console.log('Creating question')
  
    const response = await Axios.post(`${apiEndpoint}/questions`, JSON.stringify(newQuestion), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
    })
    console.log('New Question:', response.data)
    return response.data.item
  }

  export async function deleteQuestion(idToken: string, questionId: string): Promise<void> {
    console.log('Delete question')
  
    await Axios.delete(`${apiEndpoint}/questions/${questionId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
    })
  }
