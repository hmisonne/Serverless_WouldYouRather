import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getAllResponses } from '../../businessLogic/responses'
import { createLogger } from '../../utils/logger'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('getUsers')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)
  const questionId = event.pathParameters.questionId
  const users = await getAllResponses(questionId)

  return {
    statusCode: 200,
    body: JSON.stringify({
        users
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)