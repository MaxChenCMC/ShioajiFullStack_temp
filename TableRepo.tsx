import React, { useState, useEffect } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [

  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'TickType', headerName: 'A', width: 130 },
  { field: 'Name', headerName: 'B', width: 130 },
  { field: 'price', headerName: 'C', width: 90, type: 'double' },
  // { field: 'fullName', headerName: 'Full name', width: 160,
  // description: '這欄說什麼有getter所以設不可排序', sortable: false,
  // valueGetter: (params: GridValueGetterParams) =>
  // `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const rows = [
  // columns可以不顯示id，但假資料沒id的話一定報錯，但怎麼在API就產流水號？
  { id: 1, TickType: '內', Name: '華城', price: 135.5 },
  { id: 2, TickType: '外', Name: '宏碁', price: 75.9 },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 }, },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}


