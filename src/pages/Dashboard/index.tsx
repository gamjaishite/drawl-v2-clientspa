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
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REST_SERVICE_BASE_URL
        }/discuss-post?page=${pageParam}&perPage=${4}`,
      )
      const resData = await res.json()

      return { ...resData.data, prevOffset: pageParam }
    } catch (e) {
      console.log(e)
      return { items: [], page: 0, perPage: 0, totalPage: 0, prevOffset: pageParam }
    }
  }

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPage) {
        return lastPage.prevOffset + 1
      }
    },
  })

  const posts = data?.pages.reduce((acc, page) => {
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
                  postContent={post.content}
                  catalogTitle={post.catalogTitle}
                  catalogPoster={post.catalogPoster}
                  catalogDescription={post.catalogDescription}
                  username={post.username}
                  avatar={post.avatar}
                  verified={post.verified}
                  createdAt={post.createdAt}
                />
              </Link>
            ))}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default Dashboard
