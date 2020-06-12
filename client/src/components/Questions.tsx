import * as React from 'react'
import dateFormat from 'dateformat'
import { History } from 'history'
import {
  Divider,
  Grid,
  Header,
  Loader,
  Button,
  Icon,
  Image
} from 'semantic-ui-react'
import { getQuestions } from '../api/questions-api'
import { getAnswersByUser } from '../api/users-api'
import Auth from '../auth/Auth'
import { Question } from '../types/Question'
import { deleteQuestion} from '../api/questions-api'

interface QuestionsProps {
  auth: Auth
  history: History
}

interface QuestionsState {
  questions: Question[]
  answers: any
  loadingQuestions: boolean
}

export class Questions extends React.PureComponent<QuestionsProps, QuestionsState> {
  state: QuestionsState = {
    questions: [],
    answers: {},
    loadingQuestions: true
  }

  async componentDidMount() {
    try {
      const questions = await getQuestions(this.props.auth.getIdToken())
      const result = await getAnswersByUser(this.props.auth.getIdToken())
      this.setState({
        questions,
        answers: result[0].answers,
        loadingQuestions: false
      })
    } catch (e) {
      alert(`Failed to fetch questions: ${e.message}`)
    }
  }

  onQuestionDelete = async(questionId: string) => {
    try{
        await deleteQuestion(this.props.auth.getIdToken(), questionId)
        this.setState({
          questions: this.state.questions.filter(question => question.questionId !== questionId
            )})
    } catch(e) {
        alert('Question Deletion failed')
    }
  
  }

  goToQuestionDetails = (question: Question, currResponse: any) => {
      const {userId, questionId} = question
      this.props.history.push(`/users/${userId}/questions/${questionId}`, {currResponse})
  }

  goToUploadImage = (questionId: string) => {
    this.props.history.push(`/questions/${questionId}/edit`)
  }

  render() {
    return (
      <div>
        <Header as="h1">Would You Rather</Header>

        {this.renderQuestions()}
      </div>
    )
  }


  renderQuestions() {
    if (this.state.loadingQuestions) {
      return this.renderLoading()
    }

    return this.renderQuestionsList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Questions
        </Loader>
      </Grid.Row>
    )
  }

  renderQuestionsList() {
    const {questions, answers} = this.state
    return (
      <Grid padded>
        {questions.map((question) => {
          return (
            <Grid.Row key={question.questionId}>
              <Grid.Column width={1} verticalAlign="middle">
              </Grid.Column>
              <Grid.Column width={10} verticalAlign="middle">
                {question.optionOneText} or {question.optionTwoText} ?
              </Grid.Column>
              <Grid.Column width={10} verticalAlign="middle">
                {answers[question.questionId] && 'ANSWERED'}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onQuestionDelete(question.questionId)}
                >
                  <Icon name="delete" />
                </Button>
                <Button
                  icon
                  color="blue"
                  onClick={() => this.goToQuestionDetails(question, answers[question.questionId])}
                >
                  <Icon name="check square" />
                </Button>
                <Button
                  icon
                  color="blue"
                  onClick={() => this.goToUploadImage(question.questionId)}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              {question.attachmentUrl && (
                <Image src= {question.attachmentUrl} size="small" wrapped/>
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }
}

/* <Grid.Column width={3} floated="right">
{question.timestamp.slice(0,10)}
</Grid.Column> */

