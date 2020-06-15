import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { updateQuestionUrl, getUploadUrl } from '../../businessLogic/questions'
import { getUserId } from '../utils'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'

const logger = createLogger('uploadImage')

const bucketName = process.env.ATTACHEMENTS_S3_BUCKET


export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event: ', event)
    const questionId = event.pathParameters.questionId

    // Update dynamoDb with Url
    const uploadUrl = getUploadUrl(questionId)
    const userId = getUserId(event)
    const updatedQuestion = {
        attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${questionId}`
    }

    await updateQuestionUrl(updatedQuestion, userId, questionId)

    return {
        statusCode: 200,
        body: JSON.stringify({
            uploadUrl
        })
    }
})


handler.use(
    cors({
        credentials: true
    })
)