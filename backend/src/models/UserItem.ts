export interface UserItem {
  userId: string 
  answers: {
    [propName: string] : string
  } 
  name?: string
  questions?: string[]
}
  