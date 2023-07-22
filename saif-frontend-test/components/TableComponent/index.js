import React, { useState } from 'react'
import { styles } from './style'
import { Box, Button, TableRow } from '@mui/material'
import moment from 'moment'

const CustomTableComponent = ({ columns, rows, setOpen, setSelectedCall }) => {
  const handleAction = (row) => {
    setOpen(true)
    setSelectedCall(row)
  }
  const renderCell = (column, row) => {
    if (column.renderCell) {
      if (column.field === 'action') {
        return <Button onClick={() => handleAction(row)}>{column.renderCell(row)}</Button>
      }
      else {
        return column.renderCell(row)
      }
    }
    if (column.isDate) {
        return moment(row[column.field]).format('DD-MM-YYYY')
    }
    return row[column.field]
  }

  return (
    <Box sx={styles.tableContainer}>
      <table style={styles.customTable}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.field}
                style={
                  column.headerAlign === 'center'
                    ? { ...styles.centerColumn, ...styles.tableHeaderCell }
                    : styles.tableHeaderCell
                }
              >
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} sx={styles.tableRow}>
              {columns.map((column) => (
                <td
                  style={
                    column.align === 'center'
                      ? { ...styles.centerColumn, ...styles.tableDataCell }
                      : styles.tableDataCell
                  }
                  key={column.field}
                >
                  {renderCell(column, row)}
                </td>
              ))}
            </TableRow>
          ))}
        </tbody>
      </table>
    </Box>
  )
}

export default CustomTableComponent