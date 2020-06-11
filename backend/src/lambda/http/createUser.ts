import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createUser } from '../../businessLogic/users'
import { CreateUserRequest } from '../../requests/CreateUserRequest'
import { createLogger } from '../../utils/logger'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('createQuestion')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)
  const newUser: CreateUserRequest = JSON.parse(event.body) 
  const users = await createUser(newUser)

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