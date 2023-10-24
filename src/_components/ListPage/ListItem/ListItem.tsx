import { useHooks } from './hooks'
export type ListItemProps = {}

export const ListItem = ({ ...props }: ListItemProps) => {
  const hook = useHooks(props)

  return (
    <>
      <p>this is react template</p>
    </>
  )
}
