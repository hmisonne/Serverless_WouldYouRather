import * as React from 'react'
import { History } from 'history'
import {
  Divider,
  Grid,
  Header,
  Loader
} from 'semantic-ui-react'
import { getQuestions } from '../api/questions-api'
import Auth from '../auth/Auth'
import { Question } from '../types/Question'

interface QuestionsProps {
  auth: Auth
  history: History
}

interface QuestionsState {
  questions: Question[]
  loadingQuestions: boolean
}

export class Questions extends React.PureComponent<QuestionsProps, QuestionsState> {
  state: QuestionsState = {
    questions: [],
    loadingQuestions: true
  }

  async componentDidMount() {
    try {
      const questions = await getQuestions(this.props.auth.getIdToken())
      this.setState({
        questions,
        loadingQuestions: false
      })
    } catch (e) {
      alert(`Failed to fetch questions: ${e.message}`)
    }
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
    return (
      <Grid padded>
        {this.state.questions.map((question, pos) => {
          return (
            <Grid.Row key={question.questionId}>
              <Grid.Column width={1} verticalAlign="middle">
              </Grid.Column>
              <Grid.Column width={10} verticalAlign="middle">
                {question.optionOneText}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {question.timestamp}
              </Grid.Column>
              
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