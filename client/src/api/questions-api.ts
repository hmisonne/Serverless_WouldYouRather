import { apiEndpoint } from '../config'
import { Question } from '../types/Question';
import Axios from 'axios'
import { CreateQuestionRequest } from '../types/CreateQuestionRequest'
import { SubmitVoteRequest } from '../types/SubmitVoteRequest'

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

export async function getQuestion(idToken: string, userId: string, questionId: string): Promise<Question> {
  console.log('Fetching question')

  const response = await Axios.get(`${apiEndpoint}/users/${userId}/questions/${questionId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function submitVote(idToken: string, userId: string, questionId: string, vote: SubmitVoteRequest): Promise<void> {
  console.log('Submit vote')

  await Axios.patch(
    `${apiEndpoint}/users/${userId}/questions/${questionId}`, 
    JSON.stringify(vote), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })

}

export async function getUploadUrl(
  idToken: string,
  questionId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/questions/${questionId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}