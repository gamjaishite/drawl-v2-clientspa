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
import {VerificationRequestData} from '@/types'
import ReactPaginate from 'react-paginate'

export function TableUser() {
  // Fetch REST API
  const [verificationRequests, setVerificationRequests] = useState<
    VerificationRequestData[]
  >([])
  const [loading, setLoading] = useState(false)
  const [cookies] = useCookies()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const fetchUserData = async (page?: number) => {
    try {
      setLoading(true)

      const res = await fetch(
        `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/verification-request?page=${
          page ?? 1
        }`,
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
      setVerificationRequests(resData.data.data ?? [])
      setTotalPage(parseInt(resData.data.totalPage) ?? 1)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAccept = async (userId: string) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_REST_SERVICE_BASE_URL
        }/verification-request/${userId}/status`,
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

  const handleReject = async (userId: string) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_REST_SERVICE_BASE_URL
        }/verification-request/${userId}/status`,
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
            <TableHead className="min-w-[100px]">ID User</TableHead>
            <TableHead className="min-w-[100px]">Created At</TableHead>
            <TableHead>Accept/Deny</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {verificationRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.id}</TableCell>
              <TableCell className="font-medium">
                <a href={`/profile/${request.userId}`}>{request.userId}</a>
              </TableCell>
              <TableCell className="font-medium">{request.createdAt}</TableCell>
              <TableCell>
                <div className="w-fit">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleAccept(request.userId)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleReject(request.userId)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel={currentPage === totalPage ? '' : 'next >'}
        onPageChange={(selectedItem) => {
          fetchUserData(selectedItem.selected)
          setCurrentPage(selectedItem.selected)
        }}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel={currentPage === 1 ? '' : '< prev'}
        className="flex justify-center items-center gap-4 mt-4"
      />
    </div>
  )
}
