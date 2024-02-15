import { Avatar } from '@/components/ui/avatar'
import { useAuth } from '@/hooks'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { MoreHorizontal, Trash, Verified } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { useCookies } from 'react-cookie'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'

export const PostCard = (props: {
  refetch?: () => void;
  userId?: string
  postId: string
  postContent?: string
  catalogPoster?: string
  catalogTitle?: string
  catalogDescription?: string
  verified?: boolean
  username?: string
  avatar?: string
  createdAt?: string
  role?: string
  redirect?: string
}) => {
  const auth = useAuth()
  const [cookies] = useCookies()

  const deletePost = async (postId: string) => {
    return fetch(`${import.meta.env.VITE_REST_SERVICE_BASE_URL}/discuss-post/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${cookies.suka_nyabun}`
      },
      credentials: 'include'
    })
  }

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success('Post deleted successfully')
      if (props.refetch)
        props.refetch()
    }
  })

  return (
    <>
      {mutation && mutation.isSuccess && props.redirect && (
        <Navigate to={props.redirect} />
      )}

      < div className="border rounded-md p-6 flex flex-row gap-6 w-full relative" >
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
            {props.role === 'ADMIN' && <Verified fill={'#fbbf24'} />}
            {props.role !== 'ADMIN' && props.verified && <Verified />}
          </Link>
          <span className='small text-zinc-400'>{props.createdAt && new Date(props.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          })}</span>
          <div className="border rounded-lg flex flex-row w-full ">
            <img
              src={`${import.meta.env.VITE_PHP_SERVICE_POSTER_BASE_URL}/${props.catalogPoster
                }`}
              alt=""
              className="w-[80px] h-[100px] rounded-md object-cover"
            />
            <div className="px-4 py-3 flex-1 flex flex-col justify-center gap-2">
              <p className="small">{props.catalogTitle}</p>
              <p className="subtle text-slate-500 max-h-[40px] line-clamp-2">
                {props.catalogDescription ?? ''}
              </p>
            </div>
          </div>
          <p>{props.postContent}</p>
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
                    <Button variant='ghost' className='flex items-center gap-4 justify-center' onClick={(e) => { e.stopPropagation(); mutation.mutate(props.postId) }}>
                      <Trash size={15} />
                      Delete
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
          )
        }
      </div >
    </>
  )
}
