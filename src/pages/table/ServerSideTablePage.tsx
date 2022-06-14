import { observer } from 'mobx-react-lite'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Column } from 'react-table'
import CustomCard from '../../components/custom-card/CustomCard'
import ServerSideTable, {
  FetchDataProps,
} from '../../components/custom-table/server-side-table'
import { CommonServerSideTableStore } from '../../stores/common/common-server-side-table'
import { makeData, Person } from './makeData'

const serverData = makeData(100)

const ServerSideTablePage = observer(() => {
  const [tableState] = useState(new CommonServerSideTableStore<Person>())

  const fetchIdRef = useRef(0)

  const columns: Column<Person>[] = useMemo(
    () => [
      {
        Header: 'First Name',
        disableFilters: true,
        disableSortBy: true,
        id: 'firstName',
        accessor: (d) => d.firstName,
      },
      {
        Header: 'Last Name',
        disableFilters: true,
        disableSortBy: true,
        id: 'lastName',
        accessor: (d) => d.lastName,
      },
      {
        Header: 'Age',
        disableFilters: true,
        disableSortBy: true,
        id: 'age',
        accessor: (d) => d.age,
      },
      {
        Header: 'Visit',
        disableFilters: true,
        disableSortBy: true,
        id: 'visits',
        accessor: (d) => d.visits,
      },
      {
        Header: 'Progress',
        disableFilters: true,
        disableSortBy: true,
        id: 'progress',
        accessor: (d) => d.progress,
      },
      {
        Header: 'Status',
        disableFilters: true,
        disableSortBy: true,
        id: 'status',
        accessor: (d) => d.status,
      },
    ],
    []
  )

  const fetchData = useCallback(
    async <T extends object>({
      pageSize,
      pageIndex,
      filters,
      sortBy,
    }: FetchDataProps<T>) => {
      const fetchId = ++fetchIdRef.current

      tableState.handleFetchInit()

      setTimeout(() => {
        try {
          if (fetchId === fetchIdRef.current) {
            const startRow = pageSize * pageIndex
            const endRow = startRow + pageSize

            tableState.handleFetchSucceed({
              data: serverData.slice(startRow, endRow),
              pageCount: Math.ceil(serverData.length / pageSize),
              rowCount: serverData.length,
            })
          }
        } catch (error) {
          // For now, do nothin
        }
      }, 1000)
    },
    [tableState]
  )

  return (
    <div className='row justify-content-center'>
      <div className='col-sm-10'>
        <CustomCard>
          <div>Server Side Table</div>
          <div>
            <ServerSideTable
              columns={columns}
              data={tableState.data}
              fetchData={fetchData}
              loading={tableState.loading}
              pageCount={tableState.pageCount}
              rowCount={tableState.rowCount}
              errMessage={tableState.errMessage}
            />
          </div>
        </CustomCard>
      </div>
    </div>
  )
})

export default ServerSideTablePage
