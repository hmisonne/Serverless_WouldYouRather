import { apiEndpoint } from '../config'
import { Question } from '../types/Question';
import Axios from 'axios'


export async function getQuestions(idToken: string): Promise<Question[]> {
  console.log('Fetching todos')

  const response = await Axios.get(`${apiEndpoint}/questions`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Questions:', response.data)
  return response.data.items
}
