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
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    DialogActions
} from "@mui/material";
import { CreateOutlined, DeleteOutlined, LockOutlined, VisibilityOutlined } from "@mui/icons-material";
import Link from "next/link";
import axios from "axios";

import { Button, TextField, Typography } from "../../components";
import moment from "moment";
import { useRouter } from "next/router";

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
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [render, setRender] = React.useState(false);
    const [patients, setPatients] = React.useState([]);
    const router = useRouter();

    React.useEffect(() => {
        axios
            .get(`http://localhost:5000/XemDsBenhNhan`)
            .then((res) => {
                console.log(res);
                setPatients(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
    }, []);

    const handleOpen = (patient) => {
        setOpen(true);
        let patientData = patient;
        delete patientData.Tuoi;
        delete patientData.TongTienPhaiTra;
        delete patientData.TongTienThanhToan;
        delete patientData.TongQuan;
        let temp = fetchData.map((e, i) => {
            return { ...e, value: Object.values(patientData)[i] };
        });
        setData(temp);
    };

    const deletePatient = async (id) => {
        console.log(id);
        axios
            .post(`http://localhost:5000/SuaTTBenhNhan/${id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
        axios
            .get(`http://localhost:5000/XemDsBenhNhan`)
            .then((res) => {
                console.log(res);
                setPatients(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
    };

    const updatePatient = async (id) => {
        console.log(id);
        axios
            .post(`http://localhost:5000/SuaTTBenhNhan/${id}`, data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
        axios
            .get(`http://localhost:5000/XemDsBenhNhan`)
            .then((res) => {
                console.log(res);
                setPatients(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
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
                            {patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow sx={{ whiteSpace: "nowrap" }} key={row.MaBN}>
                                        <TableCell align="center">
                                            <Typography size="p">{row.MaBN}</Typography>
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
                                                        maxWidth: "12rem"
                                                    }}>
                                                    {row.HotenBN}
                                                </Typography>
                                            </Box>
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
                                                        maxWidth: "5rem"
                                                    }}>
                                                    {row.GioiTinhBN}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography
                                                size="p"
                                                sx={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: "2",
                                                    WebkitBoxOrient: "vertical",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: "8rem"
                                                }}>
                                                {moment(row.NgaySinhBN).format("DD-MM-YYYY")}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography size="p">{row.SDTBN}</Typography>
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
                                                    {row.EmailBN}
                                                </Typography>
                                            </Box>
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
                                                    {row.DiaChiBN}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ActionCell
                                                edit={() => handleOpen(row)}
                                                detail={() =>
                                                    router.push(`/ho-so-benh-nhan/thong-tin-chi-tiet/${row.MaBN}`)
                                                }
                                                delete={() => deletePatient(row.MaBN)}
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
                    count={patients.length}
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
                        {data.slice(0, 7).map((item, i) => (
                            <Grid item xs={12} sm={6} key={i}>
                                <TextField label={item.label} value={item.value} onChange={(e) => handleChange(e, i)} />
                            </Grid>
                        ))}
                    </InputContainer>
                </DialogContent>
                <DialogActions>
                    <Button bgcolor="gray" onClick={handleClose} sx={{ width: "7rem" }}>
                        Thoát
                    </Button>
                    <Button bgcolor="secondary" onClick={updatePatient} sx={{ width: "7rem" }}>
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
                <VisibilityOutlined onClick={props.detail} />
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
        label: "Mã bệnh nhân"
    },
    {
        id: "category",
        numeric: true,
        disablePadding: false,
        label: "Họ tên"
    },
    {
        id: "gender",
        numeric: true,
        disablePadding: false,
        label: "Ngày sinh"
    },
    {
        id: "writer",
        numeric: true,
        disablePadding: false,
        label: "Giới tính"
    },
    {
        id: "date",
        numeric: true,
        disablePadding: false,
        label: "Số điện thoại"
    },
    {
        id: "email",
        numeric: true,
        disablePadding: false,
        label: "Email"
    },
    {
        id: "address",
        numeric: true,
        disablePadding: false,
        label: "Địa chỉ"
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
    { label: "Mã bệnh nhân", value: "" },
    { label: "Họ tên", value: "" },
    { label: "Ngày sinh", value: "" },
    { label: "Giới tính", value: "" },
    { label: "Số điện thoại", value: "" },
    { label: "Email", value: "" },
    { label: "Địa chỉ", value: "" }
];
