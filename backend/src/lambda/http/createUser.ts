import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createUser } from '../../businessLogic/users'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('createUser')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)
  const userId = getUserId(event)
  const user = await createUser(userId)

  return {
    statusCode: 200,
    body: JSON.stringify({
      user
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)