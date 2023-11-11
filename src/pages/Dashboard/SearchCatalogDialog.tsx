import {
  Dialog, DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import {Input} from '@/components/ui/input.tsx'
import {Search} from 'lucide-react'
import {Button} from '@/components/ui/button.tsx'
import {useCookies} from 'react-cookie'
import {useEffect, useState} from 'react'
import {useInfiniteQuery} from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'


const useDebounce = (value: string, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState<string>()
  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(id)
    }
  }, [value, delay])

  return debounceValue
}


const SearchCatalogDialog = (props: {
  setSelected: (x: {uuid: string; title: string; poster: string}) => void;
}) => {

  const [cookies] = useCookies(['suka_nyabun'])
  const [input, setInput] = useState('')
  const search = useDebounce(input)

  const getCatalogs = async ({pageParam = 1}) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_REST_SERVICE_BASE_URL}/catalog?title=${search ?? ''}&page=${pageParam}&amount=${4}`, {
        headers: {
          'Authorization': `Bearer ${cookies.suka_nyabun}`,
        },
        credentials: 'include',
      })
      const data = await res.json()
      return {...data.data, prevOffset: pageParam}
    } catch (e) {
      console.log(e)
      return {items: [], page: 0, totalPage: 0, prevOffset: pageParam}
    }
  }

  const {data, fetchNextPage, hasNextPage, refetch} = useInfiniteQuery({
    queryKey: ['catalogs'],
    queryFn: getCatalogs,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPage) {
        return lastPage.prevOffset + 1
      }
    },
  })

  const catalogs = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.items]
  }, [])

  useEffect(() => {
    refetch()
  }, [search])


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' className='w-full'>Add Catalog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Catalog</DialogTitle>
        </DialogHeader>
        <div className='flex gap-3 items-center'>
          <Search />
          <Input type='text' placeholder='Search catalog title...' value={input}
                 onChange={(e) => {
                   setInput(e.target.value)
                 }} />
        </div>
        <div id='catalogList' className='max-h-[300px] overflow-auto'>
          <InfiniteScroll next={() => fetchNextPage()} hasMore={hasNextPage} loader={<div>Loading...</div>}
                          dataLength={catalogs ? catalogs.length : 0} scrollableTarget='catalogList'
                          className='flex flex-col gap-4'>
            {catalogs && catalogs.map((catalog: any, index: number) => (
              <div key={index}
                   className='flex flex-row cursor-pointer items-center gap-2 p-2 rounded-md mx-2 hover:bg-accent'
                   onClick={() => props.setSelected({
                     uuid: catalog.uuid,
                     title: catalog.title,
                     poster: catalog.poster,
                   })}>
                <img src={`${import.meta.env.VITE_PHP_SERVICE_POSTER_BASE_URL}/${catalog.poster}`}
                     className='h-[80px] w-[60px] rounded-md bg-cover' />
                <p>{catalog.title}</p>
              </div>
            ))}
          </InfiniteScroll>
          {(!catalogs || catalogs.length === 0) && (
            <div>
              No catalogs found.
            </div>
          )}
        </div>
        <DialogClose asChild>
          <Button>Cancel</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
export default SearchCatalogDialog