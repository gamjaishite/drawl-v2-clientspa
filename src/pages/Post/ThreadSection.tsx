import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import ThreadCard from '@/components/card/ThreadCard.tsx'
import { ThreadData } from '@/types'
import { useAuth } from '@/hooks'
import { Link } from 'react-router-dom'

const ThreadSection = (props: { postId: string }) => {
  const [cookies] = useCookies()
  const auth = useAuth()
  const formSchema = z.object({
    thread: z
      .string({
        invalid_type_error: 'Thread is not in a valid type',
        required_error: 'Thread is required',
      })
      .trim()
      .min(1, {
        message: 'Thread is required',
      })
      .max(3000, {
        message: 'Thread maximum 3000 chars.',
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      thread: '',
    },
  })
  form.watch('thread')

  const [countChars, setCountChars] = useState(form.getValues('thread').length)

  const getThreads = async ({ pageParam = 1 }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REST_SERVICE_BASE_URL
        }/discuss-thread?page=${pageParam}&perPage=${10}&postId=${props.postId}`,
      )
      const resData = await res.json()

      if (!res.ok) {
        throw new Error(resData.message)
      }

      return { ...resData.data, prevOffset: pageParam }
    } catch (e) {
      console.log(e)
      if (e instanceof Error) {
        throw new Error(e.message)
      } else {
        throw new Error('Something went wrong')
      }
    }
  }

  const { data, fetchNextPage, hasNextPage, refetch, isLoading } = useInfiniteQuery({
    queryKey: ['threads'],
    queryFn: getThreads,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.items.length === lastPage.perPage) {
        return lastPage.prevOffset + 1
      }
    },
  })

  const threads = data && data?.pages.reduce((acc, page) => {
    return [...acc, ...page.items]
  }, [])

  const createThread = async (thread: string) => {
    return await fetch(`${import.meta.env.VITE_REST_SERVICE_BASE_URL}/discuss-thread`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cookies.suka_nyabun}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        thread: thread,
        discussPostId: props.postId,
      }),
    })
  }

  const { mutate } = useMutation({
    mutationFn: createThread,
    onSuccess: () => refetch(),
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values.thread)
    form.reset()
    setCountChars(0)
  }

  return (
    <div className="flex flex-col gap-6 my-6">
      <h4>Reply ({data && data.pages && data.pages[0].totalItem})</h4>
      {auth.isLoggedIn ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="thread"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="This is not true 😔"
                      className="min-h-[200px]"
                      {...field}
                      onChange={(e) => {
                        setCountChars(e.target.value.length)
                        field.onChange(e)
                      }}
                    />
                  </FormControl>
                  <div className="flex justify-end">
                    <FormMessage className="flex-1" />
                    <span
                      className={`${countChars > 3000 ? 'text-destructive' : 'text-zinc-400'
                        } text-sm font-medium`}
                    >
                      {countChars}/3000 chars.
                    </span>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Reply</Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className='w-full flex items-center justify-center p-4 rounded-md border'>
          <span>Please {' '}
            <Link to='/auth/login'>
              Log In
            </Link> to Reply</span>
        </div>
      )}
      <InfiniteScroll
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<div>Loading...</div>}
        dataLength={threads ? threads.length : 0}
        className="flex flex-col gap-6"
      >
        {threads &&
          threads.map((thread: ThreadData, index: number) => (
            <ThreadCard
              key={index}
              threadId={thread.uuid}
              thread={thread.content}
              username={thread.username}
              avatar={thread.avatar}
              verified={thread.verified}
              userId={thread.userId}
              createdAt={thread.createdAt}
              role={thread.role}
              refetch={refetch}
            />
          ))}
        {(!threads || threads.length === 0) && isLoading && (
          <div className='w-full flex items-center justify-center p-4'>
            Loading...
          </div>
        )}
      </InfiniteScroll>
    </div>
  )
}
export default ThreadSection
