import {useAuth} from '@/hooks'
import {ArrowLeft, Flag, Home, Moon, Sun, Tv, User, Verified} from 'lucide-react'
import {Button} from '../ui/button'
import {Switch} from '../ui/switch'
import {useTheme} from '@/components/theme-provider'
import {toast} from 'react-toastify'

type MainLayoutProps = {
  title?: string
  children: React.ReactNode
}

const DarkModeToggle = () => {
  const {setTheme, theme} = useTheme()

  return (
    <div className="flex items-center space-x-2 px-4">
      <Sun />
      <Switch
        id="airplane-mode"
        checked={theme === 'dark'}
        onCheckedChange={(checked) => {
          setTheme(checked ? 'dark' : 'light')
        }}
      />
      <Moon />
    </div>
  )
}

const BasicSidebar = () => {
  const auth = useAuth()

  return (
    <div className="flex md:flex-col justify-around md:justify-normal gap-2">
      <a href="/" className="text-foreground">
        <Button
          variant={'ghost'}
          size={'lg'}
          className="justify-start space-x-2 px-4 text-xl w-full"
        >
          <Home />
          <span className="hidden md:block">Home</span>
        </Button>
      </a>
      <a href={`/profile/${auth.user?.id}`} className="text-foreground">
        <Button
          variant={'ghost'}
          size={'lg'}
          className="justify-start space-x-2 px-4 text-xl w-full"
        >
          <User />
          <span className="hidden md:block">Profile</span>
        </Button>
      </a>
    </div>
  )
}

const AdminSidebar = () => {
  return (
    <div className="flex md:flex-col justify-around md:justify-normal gap-2">
      <a href={`/admin/dashboard/verifycatalog`} className="text-foreground">
        <Button
          variant={'ghost'}
          size={'lg'}
          className="justify-start space-x-2 px-4 text-xl w-full"
        >
          <Tv />
          <span className="hidden md:block">Catalogs</span>
        </Button>
      </a>
      <a href={`/admin/dashboard/verifyuser`} className="text-foreground">
        <Button
          variant={'ghost'}
          size={'lg'}
          className="justify-start space-x-2 px-4 text-xl w-full"
        >
          <Verified />
          <span className="hidden md:block">Verifications</span>
        </Button>
      </a>
      <a href={`/admin/dashboard/verifyreport`} className="text-foreground">
        <Button
          variant={'ghost'}
          size={'lg'}
          className="justify-start space-x-2 px-4 text-xl w-full"
        >
          <Flag />
          <span className="hidden md:block">Reports</span>
        </Button>
      </a>
    </div>
  )
}

const GuestSidebar = () => {
  return <div className="flex flex-col gap-4"></div>
}

const Sidebar: Record<string, () => JSX.Element> = {
  BASIC: BasicSidebar,
  ADMIN: AdminSidebar,
  GUEST: GuestSidebar,
}

const MainLayout = ({title = '', children}: MainLayoutProps) => {
  const auth = useAuth()
  const CurrentSidebar = Sidebar[auth.user ? auth.user.role : 'GUEST']

  const handleLogout = () => {
    const result = auth.logout()
    console.log(result)
    if (!result.success) {
      toast.error(result.message)
    } else {
      toast.success(result.message)
    }
  }

  return (
    <div className="relative flex flex-col-reverse md:flex-row">
      <aside className="bg-background/30 backdrop-blur-xl md:h-screen fixed md:sticky bottom-0 md:top-0 z-30 w-full md:w-[300px] border-r pl-5 md:pl-16 pr-5 md:pr-10 py-2 md:py-8 flex-col justify-between ">
        <h4 className="px-4 mb-4 hidden md:block">DQ</h4>
        <CurrentSidebar />
      </aside>
      <div className="w-full px-0 lg:px-24">
        <header className="sticky top-0 z-40 py-4 px-5 md:px-10 flex flex-row flex-wrap justify-between items-center gap-4 bg-background/30 backdrop-blur-lg">
          <div className="flex flex-row items-center gap-4">
            {!title.toLowerCase().includes('home') && (
              <a href="/">
                <ArrowLeft />
              </a>
            )}
            <h4>{title}</h4>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <DarkModeToggle />
            {!auth.user ? (
              <a href="/auth/login">
                <Button>Log In</Button>
              </a>
            ) : (
              <Button onClick={handleLogout}>Log Out</Button>
            )}
          </div>
        </header>
        <main className="py-4 px-5 md:px-10 overflow-hidden mb-16 md:mb-0">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
