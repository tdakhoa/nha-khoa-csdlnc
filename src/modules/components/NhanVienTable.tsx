import * as React from "react";
import {
    Box,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    IconButton
} from "@mui/material";
import { CreateOutlined, DeleteOutlined, LockOutlined } from "@mui/icons-material";
import axios from "axios";
import moment from "moment";

import { Typography } from "../../components";

function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow
                sx={{
                    backgroundColor: "var(--palette-02)",
                    color: "white",
                    whiteSpace: "nowrap"
                }}>
                {headCells.map((headCell) => (
                    <TableCell key={headCell.id} align="center">
                        <Typography weight="bold" color="white">
                            {headCell.label}
                        </Typography>
                    </TableCell>
                ))}
                <TableCell>
                    <Typography weight="bold" color="white">
                        Hành động
                    </Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [employee, setEmployee] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        axios
            .get(`http://localhost:5000/ALL_THE_EMPLOYEE`)
            .then((res) => {
                console.log(res);
                setEmployee(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <EnhancedTableBox>
            <Box>
                <TableContainer
                    sx={{
                        "&::-webkit-scrollbar": {
                            height: "0.3rem"
                        }
                    }}>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                        <EnhancedTableHead />
                        <TableBody>
                            {employee
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index) => {
                                    return (
                                        <TableRow sx={{ whiteSpace: "nowrap" }} key={row.MaND}>
                                            <TableCell align="center">
                                                <Typography size="p">{row.MaND}</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "end"
                                                    }}>
                                                    <Typography
                                                        size="p"
                                                        sx={{
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: "2",
                                                            WebkitBoxOrient: "vertical",
                                                            whiteSpace: "nowrap",
                                                            maxWidth: "14rem"
                                                        }}>
                                                        {row.TenND}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography size="p">
                                                    {moment(row.NgaySinhND).format("DD-MM-YYYY")}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography size="p">{row.GioiTinhND}</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography size="p">{row.PhongKham}</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ActionCell />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    sx={{
                        "&::-webkit-scrollbar": {
                            height: "0.3rem"
                        }
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={employee.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </EnhancedTableBox>
    );
}

const ActionCell = () => {
    return (
        <Box sx={StyledActionCell}>
            <IconButton>
                <LockOutlined />
            </IconButton>
            <IconButton>
                <CreateOutlined />
            </IconButton>
            <IconButton>
                <DeleteOutlined />
            </IconButton>
        </Box>
    );
};

const headCells: readonly HeadCell[] = [
    {
        id: "title",
        numeric: false,
        disablePadding: true,
        label: "Mã nhân viên"
    },
    {
        id: "category",
        numeric: true,
        disablePadding: false,
        label: "Họ tên"
    },
    {
        id: "writer",
        numeric: true,
        disablePadding: false,
        label: "Ngày sinh"
    },
    {
        id: "date",
        numeric: true,
        disablePadding: false,
        label: "Giới tính"
    },
    {
        id: "password",
        numeric: true,
        disablePadding: false,
        label: "Mã phòng khám"
    }
];

interface Data {
    category: string;
    date: string;
    writer: string;
    title: string;
    password: string;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const StyledActionCell = {
    display: "flex"
};

const EnhancedTableBox = styled(Box)(({ theme }) => ({
    width: "100%",
    marginTop: "20px",
    border: "1px solid #f2eae1",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "all 0.3s ease-in-out"
}));
