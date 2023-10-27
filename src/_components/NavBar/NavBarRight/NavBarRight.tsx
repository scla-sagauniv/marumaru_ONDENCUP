import { Link } from 'lucide-react'
import router from 'next/router'

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

export const NavBarRight = () => {
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
          <Link href={'/account'}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <Button
          onClick={() => {
            router.push('/api/auth/logout')
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
