import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Link } from 'react-router-dom'
import { Verified } from 'lucide-react'

const ThreadCard = (props: {
  avatar?: string;
  username: string;
  verified: boolean;
  thread: string;
  userId: string;
  createdAt: string;
}) => {
  return (
    <div className='border rounded-md p-6 flex flex-row gap-6'>
      <Avatar className='w-[40px] h-[40px] flex items-center justify-center border'>
        <AvatarImage
          src={props.avatar ? `${import.meta.env.VITE_REST_SERVICE_PUBLIC_URL}/${props.avatar}` : '/avatar.jpeg'}
          className='w-full h-full object-cover'
        />
        <AvatarFallback>{props.username ? props.username[0] : 'D'}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col gap-3 w-full'>
        <Link to={`/profile/${props.userId}`} className='flex items-center gap-1 max-w-max'>
          <span>{props.username}</span>
          {props.verified && (
            <Verified size={22} fill='#8b5cf6' color='white' />
          )}
        </Link>
        {props.createdAt && (
          <span className='small text-zinc-400'>{new Date(props.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          })}</span>
        )}
        <p>
          {props.thread}
        </p>
      </div>
    </div>
  )
}

export default ThreadCard