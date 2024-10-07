import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SortableTableCell from './SortableTableCell';

const ReportTable = ({ data, sortColumn, sortDirection, onSort }) => {
    return (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <SortableTableCell column="month" label="Month" sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} />
                        <SortableTableCell column="revenue" label="Revenue" sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} align="right" />
                        <SortableTableCell column="expenses" label="Expenses" sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} align="right" />
                        <SortableTableCell column="profit" label="Profit" sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} align="right" />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.month}>
                            <TableCell>{row.month}</TableCell>
                            <TableCell align="right">${row.revenue.toLocaleString()}</TableCell>
                            <TableCell align="right">${row.expenses.toLocaleString()}</TableCell>
                            <TableCell align="right">${row.profit.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReportTable;
