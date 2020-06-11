import { ResponseItem } from '../models/ResponseItem'
import { ResponseAccess } from '../dataLayer/responsesAccess'
import { VoteRequest } from '../requests/VoteRequest'

const responseAccess = new ResponseAccess()

export async function getAllResponses(userId: string): Promise<ResponseItem[]>{
    return await responseAccess.getAllResponses(userId)
}

export async function createResponse(userId: string, questionId: string, newVote: VoteRequest): Promise<ResponseItem>{
    return await responseAccess.createResponse({
        userId,
        questionId,
        optionSelected: newVote.optionSelected,
    })
}