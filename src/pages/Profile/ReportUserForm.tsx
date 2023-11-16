import {Button} from '@/components/ui/button'
import {toast} from 'react-toastify'
import {Textarea} from '@/components/ui/textarea'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {useCookies} from 'react-cookie'
const formSchema = z.object({
  content: z
    .string({
      required_error: 'Content is required',
      invalid_type_error: 'Content is not in a valid type',
    })
    .trim()
    .min(1, {
      message: 'Content is required',
    })
    .max(255, {
      message: 'Content is too long, maximum 255 characters',
    }),
  reportedId: z
    .string({
      required_error: 'Reported ID is required',
      invalid_type_error: 'Reported ID is not in a valid type',
    })
    .trim()
    .min(1, {
      message: 'Reported ID is required',
    })
    .max(36, {
      message: 'Reported ID is too long, maximum 36 characters',
    }),
})

export const ReportUserForm = ({reportedId}: {reportedId: string}) => {
  const [cookies] = useCookies(['suka_nyabun'])

  const editProfileForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      reportedId: reportedId,
    },
    mode: 'onBlur',
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/report-user`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.suka_nyabun}`,
          },
          body: JSON.stringify({
            content: values.content,
            reportedId: values.reportedId,
          }),
        },
      )

      const resData = await res.json()
      if (!res.ok) {
        toast.error(resData.message)
      }
      toast.success('Reported')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Form {...editProfileForm}>
      <form onSubmit={editProfileForm.handleSubmit(onSubmit)} className="space-y-8">
        <p className="text-start subtle">
          Our team will review this profile and take appropriate action.
        </p>
        <div className="min-h-[100px] mx-4 my-4">
          <FormField
            control={editProfileForm.control}
            name="content"
            render={({field}) => (
              <FormItem className="mt-2">
                <FormLabel>Comments</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your comment here" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
