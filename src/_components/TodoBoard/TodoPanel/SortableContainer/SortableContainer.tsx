import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'

import { Card, CardHeader, CardTitle, CardContent } from '@/_components/ui/card'
import { GetTodosType } from '@/services/server/GetTodos/api'

import { SortableTodoItem } from '../SortableTodoItem'

export type SortableContainerProps = {
  id: string
  label: string
  items: GetTodosType
}

const SortableContainer = ({ id, label, items }: SortableContainerProps) => {
  const { setNodeRef } = useDroppable({
    id,
  })
  return (
    <>
      <Card className='p-6 bg-zinc-700 text-slate-100 border-none'>
        <SortableContext id='done' items={items} strategy={rectSortingStrategy}>
          <div ref={setNodeRef}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent>
              {items.map((todo) => (
                <SortableTodoItem todo={todo} key={todo.id} />
              ))}
            </CardContent>
          </div>
        </SortableContext>
      </Card>
    </>
  )
}

export { SortableContainer }
