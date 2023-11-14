import {TableCatalog} from '@/components/table/TableCatalog'
import {useCookies} from 'react-cookie'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useEffect, useState} from 'react'

const VerifyCatalog = () => {
  const [cookies] = useCookies()
  const [isRefetch, setIsRefetch] = useState(false)

  return (
    <>
      <main>Berikut adalah tabel untuk mem-verify catalog:</main>
      <TableCatalog />
    </>
  )
}

export default VerifyCatalog
