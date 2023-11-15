import {Avatar} from '@/components/ui/avatar'
import {AvatarFallback, AvatarImage} from '@radix-ui/react-avatar'
import {Verified} from 'lucide-react'
import {Link} from 'react-router-dom'

export const PostCard = (props: {
  userId?: string
  postContent?: string
  catalogPoster?: string
  catalogTitle?: string
  catalogDescription?: string
  verified?: boolean
  username?: string
  avatar?: string
  createdAt?: string
  role?: string
}) => {
  return (
    <div className="border rounded-md p-6 flex flex-row gap-6 w-full">
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
        <div className="border rounded-lg flex flex-row w-full ">
          <img
            src={`${import.meta.env.VITE_PHP_SERVICE_POSTER_BASE_URL}/${
              props.catalogPoster
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
    </div>
  )
}
