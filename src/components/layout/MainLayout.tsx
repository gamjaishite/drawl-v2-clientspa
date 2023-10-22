import { useAuth } from "@/hooks";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const auth = useAuth();

  return (
    <>
      <header className="px-24 py-4 border-b">
        Hello, {auth.user ? auth.user.name : "Undefined"}
      </header>
      {children}
      <footer className="px-24 py-8 border-t text-center text-muted-foreground">
        Made with 🌸 by drawl
      </footer>
    </>
  );
};

export default MainLayout;
