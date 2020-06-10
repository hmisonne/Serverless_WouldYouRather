import { UserInfo } from '../models/UserInfo'
import { UserAccess } from '../dataLayer/userAccess'
import { CreateUserRequest } from '../requests/CreateUserRequest'

const userAccess = new UserAccess()


export async function createUser(newUser: CreateUserRequest, userId: string): Promise<UserInfo>{
    return await userAccess.createUser({
        userId,
        name: newUser.name,
    })
}