type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <main className="w-full h-full flex flex-1 justify-center items-center">
    <div className="w-96">{children}</div>
  </main>
);

export default AuthLayout;
