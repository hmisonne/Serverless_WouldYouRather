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
    }
  }
}

interface QuestionsState {
  value: string
  question?: Question
}


export class QuestionDetails extends React.PureComponent<QuestionsProps, QuestionsState> {
  state: QuestionsState = {
    value: 'optionOneText',
  }
  
  async componentDidMount() {
    try {
      const question = await getQuestion(this.props.auth.getIdToken(), this.props.match.params.questionId)
      this.setState({
        question
      })
    } catch (e) {
      alert(`Failed to fetch question: ${e.message}`)
    }
  }

  handleChange = (e: any, { value }:any) => this.setState({ value })
  
  onSubmit = async (e: any) =>  {
    const {questionId} = this.props.match.params
    let userId = ''
    this.state.question && ({userId} = this.state.question)
    const vote = {
      questionId,
      optionSelected: this.state.value,
      userId
    }
    try {
      await submitVote(this.props.auth.getIdToken(), vote)

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
              value='optionOneText'
              checked={value === 'optionOneText'}
              onChange={this.handleChange}
              />
              <Form.Radio
              label={optionTwoText}
              value='optionTwoText'
              checked={value === 'optionTwoText'}
              onChange={this.handleChange}
              />
              <Form.Button onClick={this.onSubmit}>Vote</Form.Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}