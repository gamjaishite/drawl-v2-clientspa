import { useAuth } from "@/hooks";
import { ArrowLeft, Home, Moon, Settings, Sun, User } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { useTheme } from "@/components/theme-provider";

type MainLayoutProps = {
  title?: string;
  children: React.ReactNode;
};

const DarkModeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center space-x-2 px-4">
      <Sun />
      <Switch
        id="airplane-mode"
        checked={theme === "dark"}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light");
        }}
      />
      <Moon />
    </div>
  );
};

const BasicSidebar = () => {
  const auth = useAuth();

  return (
    <div className="flex md:flex-col justify-between md:justify-normal gap-2">
      <a href="/" className="text-foreground">
        <Button
          variant={"ghost"}
          size={"lg"}
          className="justify-start space-x-2 px-4 text-xl w-full"
        >
          <Home />
          <span className="hidden md:block">Home</span>
        </Button>
      </a>
      <a href={`/user/${auth.user?.name}`} className="text-foreground">
        <Button
          variant={"ghost"}
          size={"lg"}
          className="justify-start space-x-2 px-4 text-xl w-full"
        >
          <User />
          <span className="hidden md:block">Profile</span>
        </Button>
      </a>
      <a href={`/settings`} className="text-foreground">
        <Button
          variant={"ghost"}
          size={"lg"}
          className="justify-start space-x-2 px-4 text-xl w-full"
        >
          <Settings />
          <span className="hidden md:block">Settings</span>
        </Button>
      </a>
    </div>
  );
};

const AdminSidebar = () => {
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant={"ghost"}
        size={"lg"}
        className="justify-start space-x-2 px-4 text-xl w-full"
      >
        Dashboard
      </Button>
      <Button
        variant={"ghost"}
        size={"lg"}
        className="justify-start space-x-2 px-4 text-xl w-full"
      >
        Profile
      </Button>
      <Button
        variant={"ghost"}
        size={"lg"}
        className="justify-start space-x-2 px-4 text-xl w-full"
      >
        Settings
      </Button>
      <Button
        variant={"ghost"}
        size={"lg"}
        className="justify-start space-x-2 px-4 text-xl w-full"
      >
        Users
      </Button>
    </div>
  );
};

const GuestSidebar = () => {
  return <div className="flex flex-col gap-4"></div>;
};

const Sidebar: Record<string, () => JSX.Element> = {
  BASIC: BasicSidebar,
  ADMIN: AdminSidebar,
  GUEST: GuestSidebar,
};

const MainLayout = ({ title = "", children }: MainLayoutProps) => {
  const auth = useAuth();
  const CurrentSidebar = Sidebar[auth.user ? auth.user.role : "GUEST"];

  return (
    <div className="relative flex flex-col-reverse md:flex-row">
      <aside className="bg-background/30 backdrop-blur-xl md:h-screen fixed md:sticky bottom-0 md:top-0 z-30 w-full md:w-[300px] border-r pl-5 md:pl-16 pr-5 md:pr-10 py-2 md:py-8 flex-col justify-between ">
        <h4 className="px-4 mb-4 hidden md:block">DQ</h4>
        <CurrentSidebar />
      </aside>
      <div className="w-full px-0 md:px-24">
        <header className="sticky top-0 z-40 py-4 px-5 md:px-10 flex flex-row justify-between bg-background/30 backdrop-blur-lg">
          <div className="flex flex-row items-center gap-4">
            <ArrowLeft />
            <h4>{title}</h4>
          </div>
          <DarkModeToggle />
        </header>
        <main className="py-4 px-5 md:px-10">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
