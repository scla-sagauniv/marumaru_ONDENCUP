import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { TodoOnAppType } from '@/services/schema/todo'

import { TodoItem } from '../TodoItem'

type SortableTodoItemProps = {
  todo: TodoOnAppType
}

export const SortableTodoItem = ({ todo }: SortableTodoItemProps) => {
  const id = todo.id
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id })

  return (
    <>
      <div
        className=''
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          zIndex: isDragging ? 1 : 0,
        }}
        {...attributes}
        {...listeners}
      >
        <TodoItem todo={todo} />
      </div>
    </>
  )
}
