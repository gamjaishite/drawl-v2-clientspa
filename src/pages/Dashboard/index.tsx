import {PostCard} from '@/components/card/PostCard'
import {useAuth} from '@/hooks'

const Dashboard = () => {
  const auth = useAuth()
  return (
    <>
      <div className='flex flex-col gap-6'>
        <p>{auth.user ? auth.user.username : 'no user'}</p>
        <PostCard />
        <PostCard />
      </div>
    </>
  )
}

export default Dashboard
