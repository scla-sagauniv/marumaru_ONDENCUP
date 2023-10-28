import Link from 'next/link'
import { useRouter } from 'next/router'

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
import { trpc } from '@/utils/trpc'

export const NavBarRight = () => {
  const user = trpc.auth.fetchUser.useQuery().data?.user
  const signOutMutation = trpc.auth.signOut.useMutation()
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Avatar>
            <AvatarImage src={''} alt='avatar' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/user/account/${user?.id}`}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link href={`/user/account/${user?.id}`}>
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
