import { UsersAccess } from '../dataLayer/usersAccess'
import { VoteRequest } from '../requests/VoteRequest'

const userAccess = new UsersAccess()


export async function updateUserVote(questionId: string, userId: string, newVote: VoteRequest): Promise<void>{
    return await userAccess.updateUserVote(
        userId,
        questionId,
        newVote.optionSelected
    )
}
