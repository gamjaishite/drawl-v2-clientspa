import { PostCard } from '@/components/card/PostCard.tsx'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useQuery } from '@tanstack/react-query'
import ThreadSection from '@/pages/Post/ThreadSection.tsx'
import { FourOhFour } from '../Error'

const Post = () => {
  const params = useParams()
  const [cookies] = useCookies()
  const getPost = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/discuss-post/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.suka_nyabun}`,
        },
        credentials: 'include',
      },
    )
    const resData = await res.json()
    if (!res.ok) {
      throw new Error(resData.message)
    }
    return { ...resData }
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['post'],
    queryFn: getPost,
  })

  const post = data && data.data

  return (
    <div>
      {post ? (
        <>
          <PostCard
            userId={post.userId}
            postId={params.id!}
            postContent={post.content}
            catalogTitle={post.catalogTitle}
            catalogDescription={post.catalogDescription}
            verified={post.verified}
            avatar={post.avatar}
            username={post.username}
            catalogPoster={post.catalogPoster}
            createdAt={post.createdAt}
            role={post.role}
            refetch={refetch}
            redirect='/'
          />
          <ThreadSection postId={params.id ?? ''} />
        </>
      ) : isLoading ? (
        <div className='w-full flex items-center justify-center p-4'>
          Loading...
        </div>
      ) : (
        <div className='w-full flex items-center justify-center p-4'>
          <FourOhFour />
        </div>
      )}
    </div>
  )
}
export default Post
