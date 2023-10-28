// <TodoModal><TodoItem/></TodoModal>

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog'
import { Label } from '@radix-ui/react-label'

import { DialogHeader } from '@/_components/ui/dialog'
import { Input } from '@/_components/ui/input'

export type TodoModalProps = {
  children: React.ReactNode
}

export const TodoModal = ({ children }: TodoModalProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and
              remove your data from our servers.
            </DialogDescription>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input id='name' defaultValue='Pedro Duarte' className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Username
                </Label>
                <Input id='username' defaultValue='@peduarte' className='col-span-3' />
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
