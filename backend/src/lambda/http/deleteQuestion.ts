import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { deleteQuestion } from '../../businessLogic/questions'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('deleteQuestion')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)
  const questionId = event.pathParameters.questionId
  const userId = getUserId(event)
  try {
      await deleteQuestion(questionId, userId)

  return {
    statusCode: 200,
    body: ''
  }}
  catch(e){
    logger.info('Invalid request: ', e)
    return {
        statusCode: 400,
        body: 'Failed Request'
      }
    }
  }
})

handler.use(
  cors({
    credentials: true
  })
)