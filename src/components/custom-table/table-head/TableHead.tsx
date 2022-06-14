import { HeaderGroup } from 'react-table'

import styles from './TableHead.module.css'

interface TableHeadProps<D extends object> {
  headerGroups: Array<HeaderGroup<D>>
}

const TableHead = <D extends object>({
  headerGroups,
}: TableHeadProps<D>): JSX.Element => {
  return (
    <thead className={styles.tableHead}>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th
              {...column.getHeaderProps()}
              scope='col'
              className={!column.canFilter ? styles.flexContainer : ''}
            >
              {(function () {
                const title = (
                  <span {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                )

                if (column.canFilter) {
                  return (
                    <>
                      <div className={styles.title}>{title}</div>
                      <div>{column.render('Filter')}</div>
                    </>
                  )
                }

                return <div className={styles.title}>{title}</div>
              })()}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}

export default TableHead
