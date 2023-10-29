import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { Avatar, AvatarImage, AvatarFallback } from '@/_components/ui/avatar'
import { Button } from '@/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/_components/ui/dropdown-menu'
import { selectUser } from '@/lib/state/slices'
import { trpc } from '@/utils/trpc'

export const NavBarRight = () => {
  const queryClient = useQueryClient()
  queryClient.invalidateQueries()
  const user = useSelector(selectUser)
  const signOutMutation = trpc.auth.signOut.useMutation()

  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Avatar>
            <AvatarImage
              src={`https://d1qml5tdie7qey.cloudfront.net/${user.avatarUrl}`}
              alt='avatar'
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/user/account/${user.id}`}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link href={`/user/account/${user.id}`}>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <Button
          onClick={async () => {
            await signOutMutation.mutateAsync()
            router.reload()
          }}
          variant={'ghost'}
        >
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇨</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
