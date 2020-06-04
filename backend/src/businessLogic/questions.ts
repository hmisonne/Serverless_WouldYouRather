// import * as uuid from 'uuid'

import { QuestionItem } from '../models/QuestionItem'
import { QuestionAccess } from '../dataLayer/questionsAccess'

const todoAccess = new QuestionAccess()

export async function getAllQuestions(userId: string): Promise<QuestionItem[]>{
    return todoAccess.getAllQuestions(userId)
}
