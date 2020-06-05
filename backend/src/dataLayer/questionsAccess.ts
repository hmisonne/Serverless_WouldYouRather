import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { QuestionItem } from '../models/QuestionItem'
import * as AWS from 'aws-sdk'

// const AWSXRay = require('aws-xray-sdk')
// const XAWS = AWSXRay.captureAWS(AWS)

export class QuestionAccess {
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly questionTable = process.env.QUESTIONS_TABLE){}

    async getAllQuestions(userId: string): Promise<QuestionItem[]> {

        const result = await this.docClient.query({
            TableName: this.questionTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
          }).promise()
          
          const items = result.Items

          return items as QuestionItem[]
        
    }

    async createQuestion(newQuestion: QuestionItem): Promise<QuestionItem> {
        await this.docClient.put({
            TableName: this.questionTable,
            Item: newQuestion,
          }).promise()
          

        return newQuestion
        
    }
    async deleteQuestion(userId: string, questionId: string): Promise<void> {
        await this.docClient.delete({
            TableName: this.questionTable,
            Key:{
                userId,
                questionId
            },
          }).promise()
    }
   
    
}
