import * as React from 'react'
import Auth from '../auth/Auth'
import { History } from 'history'
import { createQuestion } from '../api/questions-api'
import {
    Button,
    Header,
    Form
  } from 'semantic-ui-react'

interface CreateQuestionProps {
    auth: Auth
    history: History
}

interface CreateQuestionState {
  optionOne: string
  optionTwo: string
}

export class CreateQuestion extends React.PureComponent<CreateQuestionProps, CreateQuestionState> {
    state: CreateQuestionState = {
        optionOne: '',
        optionTwo: ''
      }
    
    handleOptionOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ optionOne: event.target.value })
      }
    handleOptionTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ optionTwo: event.target.value })
    }
    onQuestionCreate = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        try {
          await createQuestion(this.props.auth.getIdToken(), {
            optionOneText: this.state.optionOne,
            optionTwoText: this.state.optionTwo,
          })
          this.props.history.push(`/`)
        } catch {
          alert('Question creation failed')
        }
      }
    render() {
        return (
          <div>
            <Header as="h1">Would You Rather</Header>
    
            {this.renderCreateQuestionInput()}
          </div>
        )
    }
    renderCreateQuestionInput() {
      const {optionOne, optionTwo} = this.state
      const options = [{
        label: 'Option One',
        onChangefunction: this.handleOptionOneChange,
        placeholder: 'Do this'
      },
      {
        label: 'Option Two',
        onChangefunction: this.handleOptionTwoChange,
        placeholder: 'Do that'
      },
    ]
        return (
            <Form onSubmit= {this.onQuestionCreate} >
              {options.map(option =>
                <Form.Field>
                  <label>{option.label}</label>
                  <input 
                      onChange={option.onChangefunction}
                      placeholder={option.placeholder} />
                </Form.Field>
              )
              }
                <Button type='submit' disabled={optionOne.length <5 || optionTwo.length <5}>Submit</Button>
            </Form>
        )
    }
}
