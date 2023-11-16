import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {useState, useEffect} from 'react'
import {Check, X} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {useCookies} from 'react-cookie'
import {toast} from 'react-toastify'
import {CatalogRequestData} from '@/types'
import ReactPaginate from 'react-paginate'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

export function TableCatalog() {
  // Fetch REST API
  const [catalogRequests, setCatalogRequests] = useState<CatalogRequestData[]>([])
  const [loading, setLoading] = useState(false)
  const [cookies] = useCookies()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const fetchUserData = async (page?: number) => {
    try {
      setLoading(true)

      const res = await fetch(
        `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/catalog-request?page=${page ?? 1}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.suka_nyabun}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      )

      const resData = await res.json()
      if (!res.ok) {
        toast.error(resData.message)
        return
      }
      setCatalogRequests(resData.data.data ?? [])
      setTotalPage(parseInt(resData.data.totalPage) ?? 1)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleAccept = async (uuid: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/catalog-request/${uuid}/status`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${cookies.suka_nyabun}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            status: 'ACCEPTED',
          }),
        },
      )

      const resData = await res.json()
      if (!res.ok) {
        toast.error(resData.message)
        return
      }
      toast.success(resData.message)
      fetchUserData(currentPage)
    } catch (err) {
      console.log(err)
    }
  }

  const handleReject = async (uuid: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/catalog-request/${uuid}/status`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${cookies.suka_nyabun}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            status: 'REJECTED',
          }),
        },
      )

      const resData = await res.json()
      if (!res.ok) {
        toast.error(resData.message)
        return
      }
      toast.success(resData.message)
      fetchUserData(currentPage)
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="min-h-[70vh] flex flex-col justify-between">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[100px]">ID</TableHead>
            <TableHead className="min-w-[100px]">UUID</TableHead>
            <TableHead className="min-w-[100px]">Title</TableHead>
            <TableHead className="min-w-[100px]">Description</TableHead>
            <TableHead className="min-w-[100px]">Poster</TableHead>
            <TableHead className="min-w-[100px]">Trailer</TableHead>
            <TableHead className="min-w-[100px]">Category</TableHead>
            <TableHead>Accept/Deny</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {catalogRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.id}</TableCell>
              <TableCell className="font-medium">{request.uuid}</TableCell>
              <TableCell className="font-medium">{request.title}</TableCell>
              <TableCell className="font-medium line-clamp-3 text-ellipsis">
                {request.description}
              </TableCell>
              <TableCell className="font-medium">
                <a
                  href={`${import.meta.env.VITE_PHP_SERVICE_POSTER_BASE_URL}/${
                    request.poster
                  }`}
                >
                  {request.poster}
                </a>
              </TableCell>
              <TableCell className="font-medium">
                <a
                  href={`${import.meta.env.VITE_PHP_SERVICE_TRAILER_BASE_URL}/${
                    request.trailer
                  }`}
                >
                  {request.trailer}
                </a>
              </TableCell>
              <TableCell className="font-medium">{request.category}</TableCell>
              <TableCell>
                <div className="w-fit">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Check className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[calc(100vw-4rem)] sm:max-w-[425px] rounded-lg">
                      <DialogHeader>
                        <DialogTitle className="text-start">
                          Accept Request {request.title}?
                        </DialogTitle>
                      </DialogHeader>
                      <p className="text-start">
                        Are you sure you want to accept catalog request with title{' '}
                        {request.title}?
                      </p>
                      <DialogFooter>
                        <Button type="submit" onClick={() => handleAccept(request.uuid)}>
                          Yes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[calc(100vw-4rem)] sm:max-w-[425px] rounded-lg">
                      <DialogHeader>
                        <DialogTitle className="text-start">
                          Reject {request.title}?
                        </DialogTitle>
                      </DialogHeader>
                      <p className="text-start">
                        Are you sure you want to reject verification request with title{' '}
                        {request.title}?
                      </p>
                      <DialogFooter>
                        <Button type="submit" onClick={() => handleReject(request.uuid)}>
                          Yes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPage > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={currentPage === totalPage ? '' : 'next >'}
          onPageChange={(selectedItem) => {
            console.log(selectedItem)
            fetchUserData(selectedItem.selected + 1)
            setCurrentPage(selectedItem.selected + 1)
          }}
          pageRangeDisplayed={5}
          forcePage={currentPage - 1}
          pageCount={totalPage}
          previousLabel={currentPage === 1 ? '' : '< prev'}
          className="flex justify-center items-center gap-4 mt-4"
          activeClassName="bg-foreground px-1 rounded-md font-bold"
        />
      )}
    </div>
  )
}
