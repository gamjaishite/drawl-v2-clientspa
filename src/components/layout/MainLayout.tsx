import { useAuth } from "@/hooks";
import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "../ui/button";

type MainLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const MainLayout = ({ title, children }: MainLayoutProps) => {
  const auth = useAuth();

  return (
    <div className="relative flex flex-row">
      <aside className="hidden md:flex h-screen sticky top-0 md:w-[300px] border-r pl-5 md:pl-20 pr-5 md:pr-10 py-8 flex-col justify-between">
        <h4>DQ</h4>
        {!auth.isLoggedIn && (
          <div>
            <Button className="w-full hidden md:block">Log In</Button>
            <Button size={"icon"} className="flex md:hidden justify-center">
              <LogOut />
            </Button>
          </div>
        )}
      </aside>
      <div className="w-full px-0 md:px-24">
        <header className="sticky top-0 z-40 py-4 px-5 md:px-10 flex flex-row items-center gap-4 bg-background/30 backdrop-blur-lg">
          <ArrowLeft />
          <h4>{title}</h4>
        </header>
        <main className="py-4 px-5 md:px-10">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
