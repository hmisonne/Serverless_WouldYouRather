export interface QuestionItem {
    userId: string
    questionId: string
    timestamp: string
    optionOneText: string
    optionTwoText: string
    optionOneVote?: string[]
    optionTwoVote?: string[]
  }
  