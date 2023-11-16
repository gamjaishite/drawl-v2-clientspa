import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'

import {Button} from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {useAuth} from '@/hooks'
import {toast} from 'react-toastify'

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email is not in a valid type',
    })
    .trim()
    .min(1, {
      message: 'Email is required',
    })
    .email({
      message: 'Invalid email',
    }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password is not in a valid type',
    })
    .trim()
    .min(1, {
      message: 'Password is required',
    })
    .max(255, {
      message: 'Password is too long, maximum 255 characters',
    }),
})

const LoginForm = () => {
  const auth = useAuth()

  // form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await auth.login(values)
    console.log(result)
    if (!result.success) {
      toast.error(result.message)
    } else {
      toast.success(result.message)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <h2>
          Login to <a href="/">DQ</a>
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span>
              Doesn't have account?{' '}
              <a
                href={`${import.meta.env.VITE_PHP_SERVICE_BASE_URL}/signup?redirect_to=${
                  import.meta.env.VITE_SPA_CLIENT_BASE_URL
                }/auth/login`}
              >
                Create One
              </a>
            </span>
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default LoginForm
