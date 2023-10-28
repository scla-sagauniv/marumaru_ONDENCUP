import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { ReactNode } from 'react'

import { Card, CardHeader, CardTitle, CardContent } from '@/_components/ui/card'
import { GetTodosType } from '@/services/server/GetTodos/api'

import { SortableTodoItem } from '../SortableTodoItem'

export type SortableContainerProps = {
  id: string
  label: string
  items: GetTodosType
  children?: ReactNode
}

const SortableContainer = ({ id, label, items, children }: SortableContainerProps) => {
  const { setNodeRef } = useDroppable({
    id,
  })
  return (
    <>
      <Card className='p-4 bg-zinc-700 text-slate-100 border-none'>
        <SortableContext id='done' items={items} strategy={rectSortingStrategy}>
          <div ref={setNodeRef}>
            <CardHeader className='w-full h-[100px] flex flex-row items-center gap-3 p-4'>
              <CardTitle>{label}</CardTitle>
              {children}
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
