import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import { Column } from 'react-table'
import CustomCard from '../../components/custom-card/CustomCard'
import ClientSideTable from '../../components/custom-table/client-side-table'
import { CommonClientSideTableStore } from '../../stores/common/common-client-side-table'
import { makeData, Person } from './makeData'

const ClientSideTablePage = observer(() => {
  const [tableState] = useState(new CommonClientSideTableStore<Person>())

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

  useEffect(() => {
    tableState.setData(makeData(100))
  }, [tableState])

  return (
    <div className='row justify-content-center'>
      <div className='col-sm-10'>
        <CustomCard>
          <div>Client Side Table</div>
          <div>
            <ClientSideTable columns={columns} data={tableState.plainData} />
          </div>
        </CustomCard>
      </div>
    </div>
  )
})

export default ClientSideTablePage
