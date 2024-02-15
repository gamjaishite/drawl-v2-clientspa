import { PostCard } from '@/components/card/PostCard'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ProfileError } from './ProfileError'
import { PostData, ProfileData } from '@/types'
import { ProfileHeader } from './ProfileHeader'
import { useCookies } from 'react-cookie'
import { useAuth } from '@/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'

const Profile = () => {
  let { id } = useParams()
  const { user } = useAuth()
  const [profile, setProfile] = useState<ProfileData | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [cookies] = useCookies(['suka_nyabun'])

  if (!id) {
    id = user?.id
  }

  async function getProfile(id: string, token: string) {
    const result = await fetch(
      `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/profile/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (result.ok) {
      const profile = await result.json()
      console.log(profile.data)
      setProfile(profile.data)
    } else {
      const error = await result.json()
      toast.error(error.message)
      setError(error.message)
      setProfile(undefined)
    }
  }

  useEffect(() => {
    getProfile(id ?? '', cookies.suka_nyabun ?? '')
  }, [id, cookies.suka_nyabun])

  const getPosts = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `${import.meta.env.VITE_REST_SERVICE_BASE_URL
      }/profile/${id}/post?page=${pageParam}&perPage=${10}`,
    )
    const resData = await res.json()

    if (!res.ok) {
      throw new Error(resData.message)
    }

    return { ...resData.data, prevOffset: pageParam }
  }
  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['profilePosts'],
    queryFn: getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.items.length === lastPage.perPage) {
        return lastPage.prevOffset + 1
      }
    },
  })

  const posts = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.items]
  }, [])

  if (!profile) {
    return <ProfileError error={error} />
  }

  if (profile && profile.blocked) {
    return <ProfileError error="This user is suspended" />
  }

  return (
    <>
      <ProfileHeader profile={profile} setProfile={setProfile} />
      <h4 className="my-6">Posts</h4>
      <div className="flex flex-col gap-6">
        <InfiniteScroll next={() => fetchNextPage()} hasMore={hasNextPage} loader={<div>Loading...</div>} dataLength={posts ? posts.length : 0} className='flex flex-col gap-6'>
          {posts && posts.map((post: PostData, index: number) => (
            <Link key={index} to={`/post/${post.uuid}`} className='font-normal w-full'>
              <PostCard avatar={post.avatar} refetch={refetch} postId={post.uuid} catalogDescription={post.catalogDescription} catalogPoster={post.catalogPoster} catalogTitle={post.catalogTitle} createdAt={post.createdAt} postContent={post.content} userId={post.userId} username={post.username} verified={post.verified} role={post.role} />
            </Link>
          ))}
        </InfiniteScroll>
        {(!posts || posts.length === 0) && (
          <div className="w-full flex items-center justify-center p-4">
            <span>No Posts Found. 💤</span>
          </div>
        )}
      </div>
    </>
  )
}

export default Profile
