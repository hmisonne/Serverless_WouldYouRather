import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { ResponseItem } from '../models/ResponseItem'
import * as AWS from 'aws-sdk'


export class ResponseAccess {
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly responseTable = process.env.RESPONSES_TABLE){}

    
    async createResponse(newResponse: ResponseItem): Promise<ResponseItem> {
        await this.docClient.put({
            TableName: this.responseTable,
            Item: newResponse,
          }).promise()
          

        return newResponse
        
    }
    
    async getAllResponses(questionId: string): Promise<ResponseItem[]> {
        const response = await this.docClient.query({
            TableName: this.responseTable,
            KeyConditionExpression: 'questionId = :questionId',
            ExpressionAttributeValues: {
                ':questionId': questionId
            }
        }).promise()
        const items = response.Items
        return items as ResponseItem[]
    }
}
