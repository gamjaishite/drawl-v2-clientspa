import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import {Button} from '@/components/ui/button.tsx'

import {Pencil, X} from 'lucide-react'
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form.tsx'
import {z} from 'zod'
import {useAuth} from '@/hooks'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Textarea} from '@/components/ui/textarea.tsx'
import {useEffect, useState} from 'react'
import ConfirmDialog from '@/pages/Dashboard/ConfirmDialog.tsx'
import SearchCatalogDialog from '@/pages/Dashboard/SearchCatalogDialog.tsx'
import {useCookies} from 'react-cookie'


const AddPostDialog = () => {
  const auth = useAuth()
  const [openConfirm, setOpenConfirm] = useState(false)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<{uuid: string; title: string; poster: string}>()
  const [catalogError, setCatalogError] = useState<string>()
  const [cookies] = useCookies()

  const addPostSchema = z.object({
    content: z.string({
      required_error: 'Content is required',
      invalid_type_error: 'Content is not in a valid type',
    }).trim().min(1, {
      message: 'Content is required',
    }).max(auth.user?.verified ? 2000 : 500, {
      message: 'Content maximum 500 characters',
    }),
  })


  const form = useForm<z.infer<typeof addPostSchema>>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      content: '',
    },
  })
  form.watch('content')

  const [countChars, setCountChars] = useState(form.getValues('content').length)

  useEffect(() => {
    setCountChars(form.getValues('content').length)
  }, [form.getValues('content').length])

  const onSubmit = async (values: z.infer<typeof addPostSchema>) => {
    if (!selected) {
      setCatalogError('Please select one catalog')
      return
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_REST_SERVICE_BASE_URL}/discuss-post`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cookies.suka_nyabun}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          catalogId: selected.uuid,
          content: values.content,
        }),
        credentials: 'include',
      })
      const resData = await res.json()

      if (!res.ok) {
        // do something
        console.log(resData.message)
      }

      setOpen(false)
    } catch (e) {
      console.log(e)
    }
  }


  const checkContent = () => {
    (selected || form.getValues('content') !== '') ? setOpenConfirm(true) : setOpen(false)
  }

  useEffect(() => {
    if (selected) {
      setCatalogError(undefined)
    }
  }, [selected])

  return (
    <>
      <ConfirmDialog open={openConfirm} setOpen={setOpenConfirm} setCreateOpen={setOpen} />
      <Dialog open={open} onOpenChange={() => {
        if (!open) {
          form.reset()
          setSelected(undefined)
        }
      }}>
        <DialogTrigger asChild>
          <Button variant='default' className='rounded-full w-12 h-12' onClick={() => setOpen(true)}><Pencil /></Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md' onPointerDownOutside={checkContent}>
          <DialogHeader>
            <DialogTitle>New Post</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col gap-4'>
            {/*<SearchCatalogCombobox setCatalogIId={setCatalogId} />*/}
            {selected ? (
              <div>
                <div className='flex gap-4 items-center border rounded-md'>
                  <img src={`${import.meta.env.VITE_PHP_SERVICE_POSTER_BASE_URL}/${selected.poster}`}
                       className='h-[80px] w-[60px] rounded-l-md bg-cover' />
                  <span className='flex-1'>{selected.title}</span>
                  <X className='cursor-pointer m-2' onClick={() => setSelected(undefined)} />
                </div>
              </div>
            ) : (
              <div>
                <SearchCatalogDialog setSelected={setSelected} />
                {catalogError && (
                  <span className='text-sm font-medium text-destructive'>{catalogError}</span>
                )}
              </div>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField name='content' render={({field}) => (
                  <FormItem className='flex flex-col gap-1'>
                    <FormControl>
                      <Textarea placeholder='This drama is good as f***'
                                className='min-h-[300px] border-none resize-none'
                                {...field} />
                    </FormControl>
                    <div className='flex justify-end'>
                      <FormMessage className='flex-1' />
                      <span
                        className={`${countChars > (auth.user?.verified ? 2000 : 500) ? 'text-destructive' : 'text-zinc-400'} text-sm font-medium`}>{countChars}/{auth.user?.verified ? 2000 : 500} chars.</span>
                    </div>
                  </FormItem>
                )} />
                <div className='flex gap-4 items-center justify-end max-'>
                  <Button type='button' onClick={checkContent} variant='ghost'>Close</Button>
                  <Button type='submit'>Submit</Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddPostDialog