import { NavigationMenu } from '@/_components/ui/navigation-menu'

import Logos from '../Logos/Logos'

import { NavBarRight } from './NavBarRight'
export const NavBar = () => {
  return (
    <NavigationMenu className='flex max-w-full max-h-[15%] flex-1 items-center justify-between py-10 px-20'>
      <Logos />
      <NavBarRight />
    </NavigationMenu>
  )
}
