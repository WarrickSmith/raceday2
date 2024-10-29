import AppLogo from './app-logo'
import ModeToggle from './mode-toggle'
import NavLinks from './nav-links'
import { Button } from '@/components/ui/button'
import { PowerIcon } from 'lucide-react'

export default function SideNav() {
  return (
    <div className="flex flex-col h-full p-3">
      <div className="flex flex-row items-center justify-between">
        <AppLogo />
        <div className="md:hidden">
          <NavLinks />
        </div>
      </div>

      <div className="hidden md:flex flex-col grow space-y-2 mt-2">
        <NavLinks />
        <div className="h-auto w-full grow rounded-md"></div>

        <div className="flex md:flex-col">
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
