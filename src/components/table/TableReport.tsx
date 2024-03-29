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
import {ReportUserData} from '@/types'
import {useCookies} from 'react-cookie'
import {toast} from 'react-toastify'
import ReactPaginate from 'react-paginate'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {useAuth} from '@/hooks'

export function TableReport() {
  // Fetch REST API
  const {user} = useAuth()
  const [reports, setReports] = useState<ReportUserData[]>([])
  const [loading, setLoading] = useState(false)
  const [cookies] = useCookies()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const fetchUserData = async (page?: number) => {
    try {
      setLoading(true)

      const res = await fetch(
        `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/report-user?page=${page ?? 1}`,
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
      setReports(resData.data.data ?? [])
      setTotalPage(parseInt(resData.data.totalPage) ?? 1)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user && user.role === 'ADMIN') {
      fetchUserData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleAccept = async (reportedId: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/report-user/block/${reportedId}`,
        {
          method: 'POST',
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
      toast.success(resData.message)
      fetchUserData(currentPage)
    } catch (err) {
      console.log(err)
    }
  }

  const handleReject = async (uuid: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/report-user/${uuid}`,
        {
          method: 'DELETE',
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
            <TableHead className="min-w-[100px]">UUID</TableHead>
            <TableHead className="min-w-[100px]">Reporter ID</TableHead>
            <TableHead className="min-w-[100px]">Reported ID</TableHead>
            <TableHead className="min-w-[100px]">Report Desc.</TableHead>
            <TableHead>Accept/Deny</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.uuid}</TableCell>
              <TableCell className="font-medium">
                <a href={`/profile/${report.reporterId}`}>{report.reporterId}</a>
              </TableCell>
              <TableCell className="font-medium">
                <a href={`/profile/${report.reportedId}`}>{report.reportedId}</a>
              </TableCell>
              <TableCell className="font-medium">{report.content}</TableCell>
              <TableCell>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Check className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[calc(100vw-4rem)] sm:max-w-[425px] rounded-lg">
                      <DialogHeader>
                        <DialogTitle className="text-start">
                          Block {report.reportedId}?
                        </DialogTitle>
                      </DialogHeader>
                      <p className="text-start">
                        Are you sure you want to block {report.reportedId}?
                      </p>
                      <DialogFooter>
                        <Button
                          type="submit"
                          onClick={() => handleAccept(report.reportedId)}
                        >
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
                          Block {report.reportedId}?
                        </DialogTitle>
                      </DialogHeader>
                      <p className="text-start">
                        Are you sure you want to reject report on {report.reportedId}?
                      </p>
                      <DialogFooter>
                        <Button type="submit" onClick={() => handleReject(report.uuid)}>
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
