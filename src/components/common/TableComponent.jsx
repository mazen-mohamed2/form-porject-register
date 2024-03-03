import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;
  // return (
  //   <input
  //     value={filterValue || ''}
  //     onChange={e => {
  //       setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
  //     }}
  //     placeholder={`Search ${count} records...`}
  //   />
  // );
}

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DataExport");
    XLSX.writeFile(wb, "data_export.xlsx");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get('http://192.168.1.46:8000/api/dashboard/forms', {
          headers: {
            'Authorization': `Bearer ${token}`} // Use the token from localStorage
          });
        setData(response.data?.data?.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Birthdate',
        accessor: 'birthdate',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'Street',
        accessor: 'street',
      },
      {
        Header: 'State',
        accessor: 'state',
      },
      {
        Header: 'Country',
        accessor: 'country',
      },
      {
        Header: 'Zipcode',
        accessor: 'zipcode',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
    ],
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
       <div className="flex justify-between items-center mb-4">
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Export to Excel
        </button>
      </div>
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table {...getTableProps()} className="w-full text-sm text-gray-700">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          {headerGroups.map((headerGroup, u) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={u}>
              {headerGroup.headers.map((column, i) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={i} className="py-3 px-6">
                  {column.render('Header')}
                  <span className="inline-block ml-2">
                    {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                  </span>
                  <div className="mt-1">{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white">
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i} className="border-b bg-white">
                {row.cells.map((cell, i) => {
                  return <td {...cell.getCellProps()} key={i} className="py-4 px-6">{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className="flex justify-between items-center mt-4">
      <div className="flex gap-2">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage} className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {'>>'}
        </button>
      </div>
      <span className="text-sm text-gray-700">
        Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length}</strong>
      </span>
      <div className="flex gap-2">
        <span className="text-sm text-gray-700">Go to page:</span>
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          className="px-3 py-1 border rounded-md text-sm"
          style={{ width: '100px' }}
        />
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          className="px-3 py-1 border rounded-md text-sm"
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  </>
  
  
  );
};

DefaultColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.any,
    preFilteredRows: PropTypes.array,
    setFilter: PropTypes.func.isRequired,
  }).isRequired,
};

export default TableComponent;
