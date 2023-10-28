import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { TodoFormType } from '../../TodoBoard'
import { TodoItem } from '../TodoItem'
import { TodoModal } from '../TodoModal'

type SortableTodoItemProps = {
  todo: TodoFormType
}

export const SortableTodoItem = ({ todo }: SortableTodoItemProps) => {
  const id = todo.id
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id })

  return (
    <>
      <TodoModal>
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
      </TodoModal>
    </>
  )
}
