import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createUser } from '../../businessLogic/users'
// import { CreateQuestionRequest } from '../../requests/CreateQuestionRequest'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('createUser')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)
  const userId = getUserId(event)
  // const newQuestion: CreateQuestionRequest = JSON.parse(event.body) 
  const users = await createUser(userId)

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