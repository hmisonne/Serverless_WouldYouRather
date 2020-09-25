import * as React from 'react'
import { History } from 'history'
import {
  Header,
  Form,
  Progress,
} from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { getQuestion, submitVote } from '../api/questions-api'
import { Question } from '../types/Question'

interface QuestionsProps {
  auth: Auth
  history: History
  location?: any
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
  currResponse?: any
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
        question,
        currResponse: this.props.location.state.currResponse
      })
    } catch (e) {
      alert(`Failed to fetch question: ${e.message}`)
    }
  }

  handleChange = (e: any, { value }:any) => this.setState({ value })
  
  onSubmit = async (e: any) =>  {
    const {questionId, userId} = this.props.match.params
    const vote = {
      optionSelected: this.state.value,
    }
    try {
      await submitVote(this.props.auth.getIdToken(),userId, questionId, vote)
      this.props.history.push(`/`)
    } catch (e) {
      alert(`Failed to submit vote: ${e.message}`)
    }
  }
    
  render() {
    const {currResponse } = this.state
    return (
      <div>
        <Header as="h1">Would You Rather</Header>

        {currResponse ?
          this.renderViewPollDetails()
          : this.renderReplyToPoll()}

      </div>
    )
  }

  renderReplyToPoll() {
    const { value } = this.state
    let optionOneText, optionTwoText
    this.state.question && ({optionOneText, optionTwoText } = this.state.question)
    let questionOptions = [{
      name: 'optionOneVote',
      label: optionOneText,
    },{
      name: 'optionTwoVote',
      label: optionTwoText,
    }]
    return (
      <div>
        <Form>
          <Form.Group widths='equal'>
            {questionOptions.map(option => 
              <Form.Radio
                label={option.label}
                value={option.name}
                checked={value === option.name}
                onChange={this.handleChange}
              />
              )}
              <Form.Button onClick={this.onSubmit}>Vote</Form.Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  renderViewPollDetails() {
    let optionOneResult = 0
    let optionTwoResult = 0
    let optionOneText = ''
    let optionTwoText = ''
    let currResponse = ''
    this.state.question && this.state.question.optionOneVote && (
      optionOneResult = this.state.question.optionOneVote.length
      )
    this.state.question && this.state.question.optionTwoVote && (
      optionTwoResult = this.state.question.optionTwoVote.length
      )
    this.state.question && this.state.question.optionOneText && (
      optionOneText = this.state.question.optionOneText
      )
    this.state.question && this.state.question.optionTwoText && (
      optionTwoText = this.state.question.optionTwoText
      )
    this.state.currResponse && (
      currResponse = this.state.currResponse
      )
    

    const totalVotes = optionOneResult + optionTwoResult
    const results = [{
      value: optionOneResult,
      label: optionOneText
    },
    {
      value: optionTwoResult,
      label: optionTwoText
    }
  ]
    return(
      <div>
        {results.map(result => 
          <Progress 
            value={result.value} 
            total={totalVotes} 
            progress='percent'
            color='blue' 
            label={result.label}
            precision={1}/>
          )}
        <div>Your vote: {
        (currResponse === 'optionOneVote')? 
          optionOneText
          : optionTwoText
        }</div>
			</div>

    )
  }
}

