import { ResponseItem } from '../models/ResponseItem'
import { ResponseAccess } from '../dataLayer/responsesAccess'
import { VoteRequest } from '../requests/VoteRequest'

const responseAccess = new ResponseAccess()

export async function getAllResponses(questionId: string): Promise<ResponseItem[]>{
    return await responseAccess.getAllResponses(questionId)
}

export async function createResponse(questionId: string, newVote: VoteRequest): Promise<ResponseItem>{
    return await responseAccess.createResponse({
        questionId,
        responderId: newVote.responderId,
        optionSelected: newVote.optionSelected,
    })
}