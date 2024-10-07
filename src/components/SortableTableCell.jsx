import React from 'react';
import { TableCell } from '@mui/material';

const SortableTableCell = ({ column, label, sortColumn, sortDirection, onSort, align = 'left' }) => (
    <TableCell onClick={() => onSort(column)} style={{ cursor: 'pointer' }} align={align}>
        {label} {sortColumn === column && (sortDirection === 'asc' ? '↑' : '↓')}
    </TableCell>
);

export default SortableTableCell;
