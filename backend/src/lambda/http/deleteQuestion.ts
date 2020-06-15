import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { deleteQuestion, getQuestion } from '../../businessLogic/questions'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('deleteQuestion')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)
  const questionId = event.pathParameters.questionId
  const userId = getUserId(event)
  // Check if question exist and if created by current user.
  const result = await getQuestion(userId, questionId)

  if (result.length === 0 ){
    logger.info('Incorrect request for questionId: ', questionId)
    return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'questionId does not exist or user not authorized to operation'
        })
      }
  }
await deleteQuestion(questionId, userId)

  return {
    statusCode: 200,
    body: 'Question Deleted'
  }
 
})

handler.use(
  cors({
    credentials: true
  })
)