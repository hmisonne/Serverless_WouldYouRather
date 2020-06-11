
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import * as AWS from 'aws-sdk'


export class UsersAccess {
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly userTable = process.env.USERS_TABLE){}


    async updateUserVote(userId: string, questionId: string, optionSelected: string ): Promise<void> {
    await this.docClient.update({
        TableName: this.userTable,
        Key:{
            userId,
        },
        ExpressionAttributeNames: {
            "#answers": "answers",
            "#questionId": questionId
        },
        UpdateExpression: "set #answers = if_not_exists(#answers.#questionId, :newVote)",
        ExpressionAttributeValues: {
            ":newVote": {questionId: optionSelected},
        },
        ReturnValues: "UPDATED_NEW"
    }).promise()

    }
}