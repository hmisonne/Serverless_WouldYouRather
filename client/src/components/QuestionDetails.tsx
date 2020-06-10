import * as React from 'react'
import { History } from 'history'
import {
  Header,
  Form,
} from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { getQuestion, submitVote } from '../api/questions-api'
import { Question } from '../types/Question'

interface QuestionsProps {
  auth: Auth
  history: History
  match: {
    params: {
      questionId: string
      userId: string
    }
  }
}

interface QuestionsState {
  value: string
  question?: Question
}


export class QuestionDetails extends React.PureComponent<QuestionsProps, QuestionsState> {
  state: QuestionsState = {
    value: 'optionOneVote',
  }
  
  async componentDidMount() {
    const {questionId, userId} = this.props.match.params
    try {
      const question = await getQuestion(this.props.auth.getIdToken(), userId, questionId)
      this.setState({
        question
      })
    } catch (e) {
      alert(`Failed to fetch question: ${e.message}`)
    }
  }

  handleChange = (e: any, { value }:any) => this.setState({ value })
  
  onSubmit = async (e: any) =>  {
    const {questionId, userId} = this.props.match.params
    const vote = {
      responderId: userId,
      optionSelected: this.state.value,
    }
    try {
      await submitVote(this.props.auth.getIdToken(),userId, questionId, vote)
    } catch (e) {
      alert(`Failed to submit vote: ${e.message}`)
    }
  }
    
  render() {
    const { value } = this.state
    let optionOneText, optionTwoText
    this.state.question && ({optionOneText, optionTwoText } = this.state.question)
    return (
      <div>
        <Header as="h1">Would You Rather</Header>
        <Form>
          <Form.Group widths='equal'>

            <Form.Radio
              label={optionOneText}
              value='optionOneVote'
              checked={value === 'optionOneVote'}
              onChange={this.handleChange}
              />
              <Form.Radio
              label={optionTwoText}
              value='optionTwoVote'
              checked={value === 'optionTwoVote'}
              onChange={this.handleChange}
              />
              <Form.Button onClick={this.onSubmit}>Vote</Form.Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}