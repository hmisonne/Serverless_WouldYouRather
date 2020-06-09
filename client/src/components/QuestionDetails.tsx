import * as React from 'react'
import { History } from 'history'
import {
  Header,
  Form,
} from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { getQuestion } from '../api/questions-api'

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
  optionOneText?: string
  optionTwoText?: string
}


export class QuestionDetails extends React.PureComponent<QuestionsProps, QuestionsState> {
  state: QuestionsState = {
    value: 'optionOneText',
  }
  
  async componentDidMount() {
    try {
      const question = await getQuestion(this.props.auth.getIdToken(), this.props.match.params.questionId)
      const {optionOneText, optionTwoText} = question
      this.setState({
        optionOneText,
        optionTwoText
      })
    } catch (e) {
      alert(`Failed to fetch question: ${e.message}`)
    }
  }

  handleChange = (e: any, { value }:any) => this.setState({ value })

  render() {
    const { value } = this.state
    const {optionOneText, optionTwoText} = this.state
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
              <Form.Button>Vote</Form.Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}