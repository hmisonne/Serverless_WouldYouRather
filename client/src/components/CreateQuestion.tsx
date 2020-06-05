import * as React from 'react'
import Auth from '../auth/Auth'
import { createQuestion } from '../api/questions-api'
import {
    Button,
    Checkbox,
    Divider,
    Grid,
    Header,
    Icon,
    Input,
    Image,
    Loader,
    Form
  } from 'semantic-ui-react'

interface TodosProps {
    auth: Auth
}

interface TodosState {
    OptionOne: string
    OptionTwo: string
}

export class CreateQuestion extends React.PureComponent<TodosProps, TodosState> {
    state: TodosState = {
        OptionOne: '',
        OptionTwo: ''
      }
    handleOptionOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ OptionOne: event.target.value })
      }
    handleOptionTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ OptionTwo: event.target.value })
    }
    onQuestionCreate = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        try {
          const newQuestion = await createQuestion(this.props.auth.getIdToken(), {
            optionOneText: this.state.OptionOne,
            optionTwoText: this.state.OptionTwo,
          })
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
        return (
            <Form onSubmit= {this.onQuestionCreate} >
                <Form.Field>
                    <label>Option One</label>
                    <input 
                        onChange={this.handleOptionTwoChange}
                        placeholder='Do this' />
                </Form.Field>
                <Form.Field>
                    <label>Option Two</label>
                    <input 
                        onChange={this.handleOptionOneChange}
                        placeholder='Do that' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}
