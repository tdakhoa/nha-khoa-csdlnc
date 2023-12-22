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
    IconButton,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import { CreateOutlined, DeleteOutlined, LockOutlined } from "@mui/icons-material";
import axios from "axios";
import moment from "moment";

import { Button, TextField, Typography } from "../../components";

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
    const [employee, setEmployee] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [render, setRender] = React.useState(false);

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

    const handleOpen = (doctor) => {
        setOpen(true);
        let temp = fetchData.map((e, i) => {
            return { ...e, value: Object.values(doctor)[i] };
        });
        setData(temp);
    };

    const deleteEmployee = async (id) => {
        try {
            await axios.post(`http://localhost:5000/UPDATE_THE_EMPLOYEE/${id}`);
            const res = await axios.get(`http://localhost:5000/ALL_THE_EMPLOYEE`);
            setEmployee(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.log(err);
        }
    };

    const updateEmployee = async (id) => {
        let value = {
            MaND: data[0].value,
            TenND: data[1].value,
            NgaySinhND: data[2].value,
            GioiTinhND: data[3].value,
            MatKhau: data[4].value,
            LoaiNguoiDung: data[5].value,
            PhongKham: data[6].value
        };

        try {
            await axios.post(`http://localhost:5000/UPDATE_THE_EMPLOYEE/${id}`, value);
            const allEmployeeRes = await axios.get(`http://localhost:5000/ALL_THE_EMPLOYEE`);
            setEmployee(Array.isArray(allEmployeeRes.data) ? allEmployeeRes.data : []);
        } catch (err) {
            console.log(err);
        } finally {
            setOpen(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e, i) => {
        let temp = data;
        temp[i].value = e.currentTarget.value;
        setData(temp);
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
                            {employee.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow sx={{ whiteSpace: "nowrap" }} key={row.title}>
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
                                            <ActionCell
                                                edit={() => handleOpen(row)}
                                                delete={() => deleteEmployee(row.MaND)}
                                            />
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

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                        <Typography weight="bold" size="large">
                            Cập nhật hồ sơ
                        </Typography>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <InputContainer container spacing={3}>
                        {data.map((item, i) => (
                            <>
                                {i == 4 || i == 5 ? (
                                    <div></div>
                                ) : i == 2 ? (
                                    <Grid item xs={12} sm={6} key={i}>
                                        <TextField
                                            label={item.label}
                                            value={moment(item.value).format("DD-MM-YYYY")}
                                            onChange={(e) => handleChange(e, i)}
                                        />
                                    </Grid>
                                ) : (
                                    <Grid item xs={12} sm={6} key={i}>
                                        <TextField
                                            label={item.label}
                                            value={item.value}
                                            onChange={(e) => handleChange(e, i)}
                                        />
                                    </Grid>
                                )}
                            </>
                        ))}
                    </InputContainer>
                </DialogContent>
                <DialogActions>
                    <Button bgcolor="gray" onClick={handleClose} sx={{ width: "7rem" }}>
                        Thoát
                    </Button>
                    <Button bgcolor="secondary" onClick={() => updateEmployee(data[0].value)} sx={{ width: "7rem" }}>
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>
        </EnhancedTableBox>
    );
}

const ActionCell = (props) => {
    return (
        <Box sx={StyledActionCell}>
            <IconButton>
                <LockOutlined />
            </IconButton>
            <IconButton>
                <CreateOutlined onClick={props.edit} />
            </IconButton>
            <IconButton>
                <DeleteOutlined onClick={props.delete} />
            </IconButton>
        </Box>
    );
};

const headCells = [
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
    { label: "Mã nhân viên", value: "" },
    { label: "Họ tên", value: "" },
    { label: "Ngày sinh", value: "" },
    { label: "Giới tính", value: "" },
    { label: "Mật khẩu", value: "" },
    { label: "Loại người dùng", value: "" },
    { label: "Mã phòng khám", value: "" }
];
