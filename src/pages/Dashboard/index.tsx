import { PostCard } from '@/components/card/PostCard'
import AddPostDialog from '@/pages/Dashboard/AddPostDialog.tsx'
import { useCookies } from 'react-cookie'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PostData } from '@/types'

const Dashboard = () => {
  const [cookies] = useCookies()
  const [isRefetch, setIsRefetch] = useState(false)

  const getPosts = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `${import.meta.env.VITE_REST_SERVICE_BASE_URL
      }/discuss-post?page=${pageParam}&perPage=${4}`,
    )
    const resData = await res.json()

    return { ...resData.data, prevOffset: pageParam }
  }

  const { data, fetchNextPage, hasNextPage, refetch, isLoading } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.items.length === lastPage.perPage) {
        return lastPage.prevOffset + 1
      }
    },
  })

  const posts = data && data?.pages.reduce((acc, page) => {
    return [...acc, ...page.items]
  }, [])

  useEffect(() => {
    if (isRefetch) {
      refetch()
      setIsRefetch(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetch])

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 w-full">
        {cookies.suka_nyabun && (
          <div className="fixed bottom-20 right-8">
            <AddPostDialog setIsRefetch={setIsRefetch} />
          </div>
        )}
        <InfiniteScroll
          next={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<div>Loading...</div>}
          dataLength={posts ? posts.length : 0}
          className="flex flex-col gap-6 max-w-4xl w-full lg:w-[32rem] xl:w-[56rem]"
        >
          {posts &&
            posts.map((post: PostData, index: number) => (
              <Link key={index} to={`/post/${post.uuid}`} className="font-normal w-full">
                <PostCard
                  key={index}
                  userId={post.userId}
                  postId={post.uuid}
                  postContent={post.content}
                  catalogTitle={post.catalogTitle}
                  catalogPoster={post.catalogPoster}
                  catalogDescription={post.catalogDescription}
                  username={post.username}
                  avatar={post.avatar}
                  verified={post.verified}
                  createdAt={post.createdAt}
                  role={post.role}
                  refetch={refetch}
                />
              </Link>
            ))}
        </InfiniteScroll>
        {(!posts || posts.length === 0) && (isLoading ? (
          <div className='w-full flex items-center justify-center p-4'>
            Loading...
          </div>
        ) : (
          <div className='w-full flex items-center justify-center p-4'>
            <span>No Posts Found. 💤</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default Dashboard
