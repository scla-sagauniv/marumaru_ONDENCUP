import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useState } from 'react'

import { GetTodoType, GetTodosType } from '@/services/server/GetTodos'

import { SortableContainer } from './SortableContainer'
import { TodoItem } from './TodoItem'

type TodoBoardProps = {
  todos: GetTodosType
}

interface TodoContainers {
  new: GetTodosType
  doing: GetTodosType
  done: GetTodosType
}

export function TodoPanel({ todos }: TodoBoardProps) {
  const newTodos = todos.filter((todo) => todo.status === 'new')
  const doingTodos = todos.filter((todo) => todo.status === 'doing')
  const doneTodos = todos.filter((todo) => todo.status === 'done')

  const [items, setItems] = useState<TodoContainers>({
    new: newTodos,
    doing: doingTodos,
    done: doneTodos,
  })

  //リストのリソースid（リストの値）
  const [activeId, setActiveId] = useState<string | undefined>(undefined)

  // ドラッグの開始、移動、終了などにどのような入力を許可するかを決めるprops
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // 5px ドラッグした時にソート機能を有効にする
    },
  })

  const sensors = useSensors(
    mouseSensor,
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // どのコンテナに居るのか取得する関数
  const findContainer = (id: string) => {
    console.log('👍id is ' + id)

    if (id in items) {
      console.log('👍id in items')

      return id as unknown as keyof TodoContainers
    }

    const containerKeys = Object.keys(items)

    for (const key of containerKeys) {
      const container = items[key as keyof TodoContainers]
      const foundItem = container.find((item) => item.id === id)
      if (foundItem) {
        return key as keyof TodoContainers
      }
    }
  }

  const findTodoItem = (id: string) => {
    const containerKeys = Object.keys(items)
    for (const key of containerKeys) {
      const container = items[key as keyof typeof items]
      const foundItem = container.find((item) => item.id === id)
      if (foundItem) {
        return foundItem
      }
    }
  }

  // ドラッグ開始時に発火する関数
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    //ドラッグしたリソースのid
    const id = active.id
    setActiveId(id as string)
  }

  //ドラッグ可能なアイテムがドロップ可能なコンテナの上に移動時に発火する関数
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    //ドラッグしたリソースのid
    const id = active.id
    //ドロップした場所にあったリソースのid
    const overId = over?.id

    console.log('❤active.id is ' + active.id)
    console.log('❤over is ', over)

    console.log('💋over.id is ' + over?.id)

    if (!overId) return

    // ドラッグ、ドロップ時のコンテナ取得
    // new,doing,doneのいずれかを持つ
    const activeContainer = findContainer(id as string)
    const overContainer = findContainer(over?.id as string)

    console.log('activeContainer is ' + activeContainer)
    console.log('overContainer is ' + overContainer)

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      // コンテナが同じ場合
      console.log('finn')
      return
    }

    // コンテナが異なる場合
    setItems((prev) => {
      // 移動元のコンテナの要素配列を取得
      const activeItems = prev[activeContainer]
      // 移動先のコンテナの要素配列を取得
      const overItems = prev[overContainer]

      console.log('👍activeItems' + activeItems)
      console.log('👍overItems' + overItems)

      // 配列のインデックス取得
      const activeIndex = activeItems.findIndex((item: GetTodoType) => item.id === id)
      const overIndex = overItems.findIndex((item: GetTodoType) => item.id === overId)

      let newIndex
      if (overId in prev[overContainer]) {
        // 下以外の要素にドロップした場合
        newIndex = overItems.length + 1
      } else {
        // containerの最後の要素にドロップした場合
        const isBelowLastItem = over && overIndex === overItems.length - 1

        const modifier = isBelowLastItem ? 1 : 0

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }

      // 移動元の配列と移動先の配列の状態を反映したprevをreturnしてsetItemsに渡す
      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item: GetTodoType) => item.id !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      }
    })
  }

  // ドラッグ終了時に発火する関数
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    //ドラッグしたリソースのid
    const id = active.id
    //ドロップした場所にあったリソースのid
    const overId = over?.id

    if (!overId) return

    // ドラッグ、ドロップ時のコンテナ取得
    // yet,doing,doneのいずれかを持つ
    const activeContainer = findContainer(id as string)
    const overContainer = findContainer(over?.id as string)

    // 配列のインデックス取得
    // ！マークは、nullやundefinedを除外するための非nullアサーション演算子
    const activeIndex = items[activeContainer!].findIndex(
      (item: GetTodoType) => item.id === id,
    )
    const overIndex = items[overContainer!].findIndex(
      (item: GetTodoType) => item.id === overId,
    )

    console.log('👍activeIndex' + activeIndex)
    console.log('👍overIndex' + overIndex)

    // ドロップ時にリストの要素をとっかえひっかえのアレコレ
    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer!]: arrayMove(items[overContainer!], activeIndex, overIndex),
      }))
    }
    setActiveId(undefined)
  }

  return (
    <div className='grid grid-cols-3 gap-4 h-full '>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContainer id='new' label='🐣New' items={items.new} />
        <SortableContainer id='doing' label='🏗️Doing' items={items.doing} />
        <SortableContainer id='done' label='💯Done' items={items.done} />
        {/* DragOverlay */}
        <DragOverlay>
          {activeId ? <TodoItem id={activeId} findTodoItem={findTodoItem} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
