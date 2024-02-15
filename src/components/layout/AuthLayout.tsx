type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = ({children}: AuthLayoutProps) => (
  <main className="w-full h-full flex flex-1 justify-center items-center">
    <div className="w-full md:w-96 py-4 px-5 md:px-10">{children}</div>
  </main>
)

export default AuthLayout
