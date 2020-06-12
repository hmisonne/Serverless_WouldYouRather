import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getResponsesByUser } from '../../businessLogic/users'
import { createLogger } from '../../utils/logger'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { createUser } from '../../businessLogic/users'

const logger = createLogger('getReponsesByUser')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)
  const userId = getUserId(event)
  const result = await getResponsesByUser(userId)

  if (result.length === 0) {
    logger.info('No user registered in the database')
    const userId = getUserId(event)
    const user = await createUser(userId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        user
      })
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      user: result
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)