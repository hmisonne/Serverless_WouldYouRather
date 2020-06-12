import { UsersAccess } from '../dataLayer/usersAccess'
import { VoteRequest } from '../requests/VoteRequest'
import { UserItem } from '../models/UserItem'

const userAccess = new UsersAccess()


export async function updateUserVote(questionId: string, userId: string, newVote: VoteRequest): Promise<void>{
    return await userAccess.updateUserVote(
        userId,
        questionId,
        newVote.optionSelected
    )
}

export async function getResponsesByUser(userId: string): Promise<UserItem[]>{
    return await userAccess.getResponsesByUser(userId)
}

export async function createUser(userId: string): Promise<UserItem>{
    return await userAccess.createUser({
        userId,
        answers: {}
    })
}