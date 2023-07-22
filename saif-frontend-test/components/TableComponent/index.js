import React, { useState } from 'react'
import { styles } from './style'
import { Box, TableRow } from '@mui/material'

const CustomTableComponent = ({ columns, rows }) => {
  const renderCell = (column, row) => {
    if (column.renderCell) {
      return column.renderCell(row)
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