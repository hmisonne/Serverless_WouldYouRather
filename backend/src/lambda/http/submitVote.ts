import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { updateQuestionVote } from '../../businessLogic/questions'
import { updateUserVote } from '../../businessLogic/users'
import { VoteRequest } from '../../requests/VoteRequest'
import { createLogger } from '../../utils/logger'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('updateQuestion')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)
  const questionId = event.pathParameters.questionId
  const userId = event.pathParameters.userId
  const newVote: VoteRequest = JSON.parse(event.body) 
  await updateQuestionVote(questionId, userId, newVote)
  await updateUserVote(questionId, newVote)
  
  return {
    statusCode: 200,
    body: 'Vote submitted'
  }
})

handler.use(
  cors({
    credentials: true
  })
)