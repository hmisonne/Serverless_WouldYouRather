import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { updateQuestionUrl } from '../../businessLogic/questions'
import { getUserId } from '../utils'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'


const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

const bucketName = process.env.ATTACHEMENTS_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION


export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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

function getUploadUrl(questionId: string) {
  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: questionId,
    Expires: urlExpiration
  })
}

handler.use(
  cors({
    credentials: true
  })
)