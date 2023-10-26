type Status = 'new' | 'doing' | 'done'

export type GetTodoType = {
  id: string
  order: number
  status: Status
  title: string
  description: string
  deadline: string
  createdAt: string
  updatedAt: string
}
export type GetTodosType = Array<GetTodoType>
