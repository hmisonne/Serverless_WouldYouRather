import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getAllUsers } from '../../businessLogic/users'
import { createLogger } from '../../utils/logger'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('getUsers')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)
  
  const users = await getAllUsers()

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