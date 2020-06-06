import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { updateQuestion } from '../../businessLogic/questions'
import { VoteRequest } from '../../requests/VoteRequest'
import { createLogger } from '../../utils/logger'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('createQuestion')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)
  const questionId = event.pathParameters.questionId
  const userId = event.pathParameters.userId
  const newVote: VoteRequest = JSON.parse(event.body) 
  const result = await updateQuestion(questionId, userId, newVote)

  return {
    statusCode: 200,
    body: JSON.stringify({
        result
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)