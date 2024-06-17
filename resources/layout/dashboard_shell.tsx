// import { MainNav } from '@/app/(app)/examples/dashboard/components/main-nav'

import { buttonVariants } from '#components/ui/button'
import { cn } from '#resources/lib/utils'
import { Link } from '@inertiajs/react'

// import { Search } from '@/app/(app)/examples/dashboard/components/search'
// import TeamSwitcher from '@/app/(app)/examples/dashboard/components/team-switcher'
// import { UserNav } from '@/app/(app)/examples/dashboard/components/user-nav'

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="md:hidden">
        {/* <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        /> */}
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
            {/* <MainNav className="mx-6" /> */}
            <Link href="/logout" className={cn(buttonVariants({ variant: 'outline' }))}>
              Logout
            </Link>
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search /> */}
              {/* <UserNav /> */}
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}
