import { UserInfo } from '../models/UserInfo'
import { UserAccess } from '../dataLayer/userAccess'
import { CreateUserRequest } from '../requests/CreateUserRequest'

const userAccess = new UserAccess()

export async function getAllUsers(): Promise<UserInfo[]>{
    return await userAccess.getAllUsers()
}

export async function createUser(newUser: CreateUserRequest): Promise<UserInfo>{
    return await userAccess.createUser({
        userId: newUser.userId,
        name: newUser.name,
    })
}
