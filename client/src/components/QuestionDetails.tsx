import * as React from 'react'
import { History } from 'history'
import {
  Divider,
  Grid,
  Header,
  Loader,
  Button,
  Icon
} from 'semantic-ui-react'

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

export class QuestionDetails extends React.PureComponent<QuestionsProps, QuestionsState> {
  state: QuestionsState = {
    questions: [],
    loadingQuestions: true
  }

  render() {
    return (
      <div>
        <Header as="h1">Would You Rather</Header>
      </div>
    )
  }
}
