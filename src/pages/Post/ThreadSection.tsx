import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form.tsx'
import {Input} from '@/components/ui/input.tsx'
import {Button} from '@/components/ui/button.tsx'
import {Textarea} from '@/components/ui/textarea.tsx'
import {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import {useInfiniteQuery, useMutation} from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import ThreadCard from '@/components/card/ThreadCard.tsx'

const ThreadSection = (props: {
  postId: string;
}) => {
  const [cookies] = useCookies()
  const formSchema = z.object({
    thread: z.string({
      invalid_type_error: 'Thread is not in a valid type',
      required_error: 'Thread is required',
    }).trim().min(1, {
      message: 'Thread is required',
    }).max(3000, {
      message: 'Thread maximum 3000 chars.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        thread: '',
      },
    },
  )
  form.watch('thread')

  const [countChars, setCountChars] = useState(form.getValues('thread').length)
  useEffect(() => {
    setCountChars(form.getValues('thread').length)
  }, [form.getValues('thread').length])

  const getThreads = async ({pageParam = 1}) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_REST_SERVICE_BASE_URL}/discuss-thread?page=${pageParam}&perPage=${4}&postId=${props.postId}`)
      const resData = await res.json()

      if (!res.ok) {
        throw new Error(resData.message)
      }

      return {...resData.data, prevOffset: pageParam}
    } catch (e) {
      console.log(e)
      throw new Error(e.message)
    }
  }

  const {data, fetchNextPage, hasNextPage, refetch} = useInfiniteQuery({
    queryKey: ['threads'],
    queryFn: getThreads,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPage) {
        return lastPage.prevOffset + 1
      }
    },
  })


  const threads = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.items]
  }, [])

  const createThread = async (thread: string) => {
    return await fetch(`${import.meta.env.VITE_REST_SERVICE_BASE_URL}/discuss-thread`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cookies.suka_nyabun}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        thread: thread,
        discussPostId: props.postId,
      }),
    })
  }

  const {mutate} = useMutation({
    mutationFn: createThread,
    onSuccess: () => refetch(),
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values.thread)
    form.reset()
  }

  return (
    <div className='flex flex-col gap-6 my-6'>
      <h4>Reply ({data && data.pages && data.pages[0].totalItem})</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='thread'
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder='This is not true 😔' className='min-h-[200px]' {...field} />
                </FormControl>
                <div className='flex justify-end'>
                  <FormMessage className='flex-1' />
                  <span
                    className={`${countChars > 3000 ? 'text-destructive' : 'text-zinc-400'} text-sm font-medium`}>{countChars}/3000 chars.</span>
                </div>
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button type='submit'>Reply</Button>
          </div>
        </form>
      </Form>
      <InfiniteScroll next={() => fetchNextPage()} hasMore={hasNextPage} loader={<div>Loading...</div>}
                      dataLength={threads ? threads.length : 0} className='flex flex-col gap-6'>
        {threads && threads.map((thread: any, index: number) => (
          <ThreadCard thread={thread.content} username={thread.username} avatar={thread.avatar}
                      verified={thread.verified} />
        ))}
      </InfiniteScroll>
    </div>
  )
}
export default ThreadSection