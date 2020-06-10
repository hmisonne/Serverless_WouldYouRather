import * as uuid from 'uuid'

import { QuestionItem } from '../models/QuestionItem'
import { QuestionAccess } from '../dataLayer/questionsAccess'
import { CreateQuestionRequest } from '../requests/CreateQuestionRequest'
import { VoteRequest } from '../requests/VoteRequest'

const questionAccess = new QuestionAccess()

export async function getAllQuestions(userId: string): Promise<QuestionItem[]>{
    return questionAccess.getAllQuestions(userId)
}

export async function createQuestion(newQuestion: CreateQuestionRequest, userId: string): Promise<QuestionItem>{
    const timestamp = new Date().toISOString()
    const questionId = uuid.v4()
    return await questionAccess.createQuestion({
        userId,
        questionId,
        timestamp,
        optionOneText: newQuestion.optionOneText,
        optionTwoText: newQuestion.optionTwoText
    })
}

export async function deleteQuestion(questionId: string, userId: string): Promise<void>{
    await questionAccess.deleteQuestion(userId,questionId)
}

export async function updateQuestion(questionId: string, userId: string, newVote: VoteRequest): Promise<void>{
    const {optionSelected, responderId} = newVote
    questionAccess.updateQuestion(userId,questionId, optionSelected, responderId)
}

export async function getQuestion(userId: string, questionId: string): Promise<QuestionItem[]> {
    return await questionAccess.getQuestion(userId,questionId)
}