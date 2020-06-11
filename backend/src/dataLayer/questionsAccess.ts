import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { QuestionItem } from '../models/QuestionItem'
import * as AWS from 'aws-sdk'
// const AWSXRay = require('aws-xray-sdk')
// const XAWS = AWSXRay.captureAWS(AWS)

export class QuestionAccess {
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly questionTable = process.env.QUESTIONS_TABLE){}

    async getAllQuestions(): Promise<QuestionItem[]> {

        const result = await this.docClient.scan({
            TableName: this.questionTable
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

    async updateQuestionVote(creatorId: string, userId: string, questionId: string, optionSelected: string): Promise<void> {
         await this.docClient.update({
            TableName: this.questionTable,
            Key:{
                userId: creatorId,
                questionId
            },
            ExpressionAttributeNames: {
                "#optionSelected": optionSelected
            },
            UpdateExpression: "set #optionSelected = list_append(if_not_exists(#optionSelected, :empty_list), :respondent)",
            ExpressionAttributeValues: {
                ":respondent": [userId],
                ':empty_list': []
            },
            ReturnValues: "UPDATED_NEW"
        }).promise()

    }

    async getQuestion(userId: string, questionId: string): Promise<QuestionItem[]>{
        const result = await this.docClient.query({
            TableName: this.questionTable,
            KeyConditionExpression: 'userId = :userId AND questionId = :questionId',
            ExpressionAttributeValues: {
                ':userId': userId,
                ':questionId': questionId
            }
        }).promise()

        const items = result.Items

        return items as QuestionItem[]
    }

    async updateQuestionUrl(updateQuestion: any): Promise<void>{
        await this.docClient.update({
            TableName: this.questionTable,
            Key: {
                userId: updateQuestion.userId,
                questionId: updateQuestion.questionId
            },
            ExpressionAttributeNames: {
                "#attachmentUrl": "attachmentUrl"
            },
            UpdateExpression: "set #attachmentUrl = :attachmentUrl",
            ExpressionAttributeValues: {
                ":attachmentUrl": updateQuestion.attachmentUrl
            },
            ReturnValues: "UPDATED_NEW"
        }).promise()
    }
    
}