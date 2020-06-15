import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getQuestion } from '../../businessLogic/questions'
import { createLogger } from '../../utils/logger'
// import { getUserId } from '../utils'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('getQuestions')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)
//   const userId = getUserId(event)
  const questionId = event.pathParameters.questionId
  const userId = event.pathParameters.userId
  const items = await getQuestion(userId, questionId)

  if (items.length === 0){
    logger.info('Incorrect ID: ', questionId)
    return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Question cannot be found with the questionId provided'
        })
      }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      item: items[0]
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)