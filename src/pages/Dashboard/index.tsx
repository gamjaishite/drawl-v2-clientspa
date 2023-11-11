import { PostCard } from '@/components/card/PostCard'
import { useAuth } from '@/hooks'
import AddPostDialog from '@/pages/Dashboard/AddPostDialog.tsx'

const Dashboard = () => {
  const auth = useAuth()
  return (
    <>
      <div className='flex flex-col gap-6 max-w-2xl w-full'>
        <div className='fixed bottom-8 right-8'>
          <AddPostDialog />
        </div>
        <p>{auth.user ? auth.user.username : 'no user'}</p>
        <PostCard />
        <PostCard />
      </div>
    </>
  )
}

export default Dashboard
