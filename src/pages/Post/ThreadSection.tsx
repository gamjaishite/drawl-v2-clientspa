import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form.tsx'
import {Input} from '@/components/ui/input.tsx'
import {Button} from '@/components/ui/button.tsx'
import {Textarea} from '@/components/ui/textarea.tsx'
import {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import {useMutation} from '@tanstack/react-query'

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
      const res = await fetch(`${import.meta.env.VITE_REST_SERVICE_BASE_URL}/discuss-thread`)
      const resData = await res.json()

      if (!response.ok) {
        throw new Error(resData.message)
      }

      return resData.data
    } catch (e) {
      console.log(e)
      throw new Error('Something went wrong, please try again later')
    }
  }

  const createThread = async ({thread}: {thread: string}) => {
    const res = await fetch(`${import.meta.env.VITE_REST_SERVICE_BASE_URL}/discuss-thread`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cookies.suka_nyabun}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        thread,
        discussPostId: props.postId,
      }),
    })
    const resData = await res.json()

    if (!response.ok) {
      throw new Error(resData.message)
    }

    return resData.data
  }

  const {mutate} = useMutation({
    mutationFn: createThread,
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      thread: values.thread,
    })
  }

  return (
    <div className='flex flex-col gap-6 my-6'>
      <h4>Reply (20)</h4>
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

    </div>
  )
}
export default ThreadSection