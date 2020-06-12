import { apiEndpoint } from '../config'
import Axios from 'axios'

export async function getAnswersByUser(idToken: string): Promise<any> {
  console.log('Fetching answers')

  const response = await Axios.get(`${apiEndpoint}/users`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Questions:', response.data)
  return response.data.user
}
