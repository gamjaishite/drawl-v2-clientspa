import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Link } from 'react-router-dom'
import { MoreHorizontal, Trash, Verified } from 'lucide-react'
import { useAuth } from '@/hooks'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { useCookies } from 'react-cookie'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const ThreadCard = (props: {
  threadId: string
  avatar?: string
  username: string
  verified: boolean
  thread: string
  userId: string
  role?: string
  createdAt: string
  refetch?: () => void
}) => {
  const auth = useAuth()
  const [cookies] = useCookies()

  const deleteThread = async (postId: string) => {
    return fetch(`${import.meta.env.VITE_REST_SERVICE_BASE_URL}/discuss-thread/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${cookies.suka_nyabun}`
      },
      credentials: 'include'
    })
  }

  const mutation = useMutation({
    mutationFn: deleteThread,
    onSuccess: () => {
      toast.success('Thread deleted successfully')
      if (props.refetch)
        props.refetch()
    }
  })

  return (
    <div className="border rounded-md p-6 flex flex-row gap-6 relative">
      <Avatar className="w-[40px] h-[40px] flex items-center justify-center border">
        <AvatarImage
          src={
            props.avatar
              ? `${import.meta.env.VITE_REST_SERVICE_PUBLIC_URL}/${props.avatar}`
              : '/avatar.jpeg'
          }
          className="w-full h-full object-cover"
        />
        <AvatarFallback>{props.username ? props.username[0] : 'D'}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-3 w-full">
        <Link
          to={`/profile/${props.userId}`}
          className="flex items-center gap-1 max-w-max"
        >
          <span>{props.username}</span>
          {(props.verified || props.role === 'ADMIN') && (
            <Verified fill={props.role === 'ADMIN' ? '#fbbf24' : ''} />
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
      {
        props.userId === auth.user?.id && (
          <div className='absolute top-4 right-4'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Button variant='ghost' className='flex items-center gap-4 justify-center' onClick={(e) => { e.stopPropagation(); mutation.mutate(props.threadId) }}>
                    <Trash size={15} />
                    Delete
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        )
      }
    </div>
  )
}

export default ThreadCard
