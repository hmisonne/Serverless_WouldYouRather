import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { updateQuestionVote, getQuestion } from '../../businessLogic/questions'
import { VoteRequest } from '../../requests/VoteRequest'
import { createLogger } from '../../utils/logger'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { updateUserVote } from '../../businessLogic/users'
const logger = createLogger('updateQuestion')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)
  const questionId = event.pathParameters.questionId
  const creatorId = event.pathParameters.userId
  const userId = getUserId(event)
  const newVote: VoteRequest = JSON.parse(event.body) 

  // Check if question exist and if created by current user.
  const result = await getQuestion(userId, questionId)

  if (result.length === 0 ){
      logger.info('Incorrect request for questionId: ', questionId)
      return {
          statusCode: 404,
          body: "Question can't be found with the userId questionId provided"
      }
  }
  await updateQuestionVote(creatorId, questionId, userId, newVote)
  await updateUserVote(questionId, userId, newVote)
  
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