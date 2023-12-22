import * as React from "react";
import {
    Box,
    styled,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    DialogActions,
    TableContainer,
    Table,
    TableBody,
    TablePagination
} from "@mui/material";
import { CreateOutlined, DeleteOutlined } from "@mui/icons-material";

import { Button, TextField, Typography } from "../../components";
import { useRouter } from "next/router";
import axios from "axios";

function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow sx={{ backgroundColor: "var(--palette-02)", color: "white", whiteSpace: "nowrap" }}>
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
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState(fetchData);
    const [render, setRender] = React.useState(false);
    const [medicines, setMedicines] = React.useState([]);
    const router = useRouter();

    React.useEffect(() => {
        axios
            .get(`http://localhost:5000/XemDonThuoc`)
            .then((res) => {
                console.log(res);
                setMedicines(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (e, i) => {
        fetchData[i].value = e.currentTarget.value;
        setData(fetchData);
        setRender(!render);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
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
                            {medicines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow sx={{ whiteSpace: "nowrap" }} key={row.title}>
                                        <TableCell align="center">
                                            <Typography size="p">{row.title}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography size="p">{row.category}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography size="p">{row.gender}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography size="p">{row.writer}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography size="p">{row.date}</Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            <ActionCell onClick={handleOpen} />
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
                    count={medicines.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography weight="bold" size="large">
                            Cập nhật đơn thuốc
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <InputContainer container spacing={3}>
                        {data.map((item, i) => (
                            <Grid item xs={12} sm={i == 2 ? 12 : 6} key={i}>
                                <TextField label={item.label} value={item.value} onChange={(e) => handleChange(e, i)} />
                            </Grid>
                        ))}
                    </InputContainer>
                </DialogContent>
                <DialogActions>
                    <Button bgcolor="gray" onClick={handleClose} sx={{ width: "7rem" }}>
                        Thoát
                    </Button>
                    <Button bgcolor="secondary" onClick={handleClose} sx={{ width: "7rem" }}>
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>
        </EnhancedTableBox>
    );
}

const ActionCell = ({ onClick }) => {
    return (
        <Box sx={StyledActionCell}>
            <IconButton>
                <CreateOutlined onClick={onClick} />
            </IconButton>
            <IconButton>
                <DeleteOutlined />
            </IconButton>
        </Box>
    );
};

const headCells = [
    {
        id: "title",
        numeric: false,
        disablePadding: true,
        label: "ID thuốc"
    },
    {
        id: "category",
        numeric: true,
        disablePadding: false,
        label: "Tên thuốc"
    },
    {
        id: "gender",
        numeric: true,
        disablePadding: false,
        label: "Đơn vị tính"
    },
    {
        id: "writer",
        numeric: true,
        disablePadding: false,
        label: "Số lượng"
    },
    {
        id: "date",
        numeric: true,
        disablePadding: false,
        label: "Giá tiền"
    }
];

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

const InputContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
    marginLeft: "0",
    padding: "12px 16px",
    [theme.breakpoints.down("sm")]: {
        paddingLeft: 0
    }
}));

const fetchData = [
    { label: "ID thuốc", value: "" },
    { label: "Đơn vị tính", value: "" },
    { label: "Tên thuốc", value: "" },
    { label: "Số lượng", value: "" },
    { label: "Giá tiền", value: "" }
];
