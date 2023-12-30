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
    TextField as MuiTextField,
    DialogActions
} from "@mui/material";
import { CreateOutlined, DeleteOutlined, FormatListBulleted, VisibilityOutlined } from "@mui/icons-material";
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
    const [openTQ, setOpenTQ] = React.useState(false);
    const [TQState, setTQState] = React.useState(false);
    const [TongQuan, setTongQuan] = React.useState([]);
    const [ChiDinh, setChiDinh] = React.useState([]);
    const [MaThuocCu, setMaThuocCu] = React.useState("");
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
        let temp = fetchData.map((e, i) => {
            return { ...e, value: Object.values(patient)[i] };
        });
        setData(temp);
    };

    const handleOpenTQ = async (TongQuan) => {
        try {
            const res = await axios.get(`http://localhost:5000/XemChongChiDinh/${TongQuan.MaBN}`);
            setChiDinh(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Error updating patient:", err);
        } finally {
            setTongQuan(TongQuan);
            setOpenTQ(true);
            setMaThuocCu(ChiDinh[0]?.MaThuoc || "");
        }
    };

    const handleCloseTQ = () => {
        setTongQuan("");
        setOpenTQ(false);
        setTQState(false);
    };

    const handleChangeTQ = (e) => {
        setTQState(true);
        setTongQuan({ ...TongQuan, TongQuan: e.currentTarget.value });
    };

    const handleChangeCD = (e) => {
        setTQState(true);
        setChiDinh([{ MaThuocCu: MaThuocCu, MaThuocMoi: e.currentTarget.value, MaThuoc: e.currentTarget.value }]);
    };

    const handleUpdate = async () => {
        let value = {
            TongQuan: TongQuan.TongQuan
        };

        let CDValue = {
            MaThuoc: MaThuocCu,
            MaThuocMoi: ChiDinh[0].MaThuoc
        };

        try {
            await axios.post(`http://localhost:5000/SuaTinhTrangSucKhoeCuaBenhNhan/${TongQuan.MaBN}`, value);
            await axios.post(`http://localhost:5000/SuaChongChiDinh/${TongQuan.MaBN}`, CDValue);
            const res = await axios.get(`http://localhost:5000/XemDsBenhNhan`);
            const CD = await axios.get(`http://localhost:5000/XemChongChiDinh/${TongQuan.MaBN}`);
            setPatients(Array.isArray(res.data) ? res.data : []);
            setChiDinh(Array.isArray(CD.data) ? CD.data : []);
        } catch (err) {
            console.error("Error updating patient:", err);
        } finally {
            setOpen(false);
            setMaThuocCu(ChiDinh[0]?.MaThuoc || "");
        }

        handleCloseTQ();
    };

    const deletePatient = async (id) => {
        try {
            await axios.post(`http://localhost:5000/XoaBenhNhan/${id}`);
            const res = await axios.get(`http://localhost:5000/XemDsBenhNhan`);
            setPatients(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.log(err);
        }
    };

    const updatePatient = async (id) => {
        let value = {
            MaBN: data[0].value,
            HotenBN: data[1].value,
            NgaySinhBN: data[2].value,
            GioiTinhBN: data[4].value,
            SDTBN: data[8].value,
            EmailBN: data[9].value,
            DiachiBN: data[10].value
        };

        try {
            await axios.post(`http://localhost:5000/SuaTTBenhNhan/${id}`, value);
            const res = await axios.get(`http://localhost:5000/XemDsBenhNhan`);
            setPatients(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Error updating patient:", err);
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
                            {patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow sx={{ whiteSpace: "nowrap" }} key={row.MaBN}>
                                        <TableCell align="center">
                                            <Typography
                                                sx={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: "2",
                                                    WebkitBoxOrient: "vertical",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: "6rem"
                                                }}
                                                size="p">
                                                {row.MaBN}
                                            </Typography>
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
                                                        maxWidth: "10rem"
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
                                                        maxWidth: "6rem"
                                                    }}>
                                                    {moment(row.NgaySinhBN).format("DD-MM-YYYY")}
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
                                                    maxWidth: "6rem"
                                                }}>
                                                {row.GioiTinhBN == 0 ? "Nam" : "Nữ"}
                                            </Typography>
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
                                                        maxWidth: "7rem"
                                                    }}>
                                                    {row.SDTBN}
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
                                                        maxWidth: "12rem"
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
                                                        maxWidth: "12rem"
                                                    }}>
                                                    {row.DiaChiBN}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ActionCell
                                                all={() => handleOpenTQ(row)}
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
                        {data.map((item, i) => (
                            <>
                                {i == 3 || i == 5 || i == 6 || i == 7 ? (
                                    <></>
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
                    <Button bgcolor="secondary" onClick={() => updatePatient(data[0].value)} sx={{ width: "7rem" }}>
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openTQ} onClose={handleCloseTQ}>
                <DialogTitle>
                    <Typography weight="bold" size="large">
                        Sức khoẻ tổng quan của bệnh nhân: {TongQuan.MaBN}
                    </Typography>
                </DialogTitle>
                <Box sx={{ padding: "1rem", width: "100%" }}>
                    <MuiTextField
                        id={ChiDinh[0]?.MaBN || "0"}
                        fullWidth
                        multiline
                        rows={5}
                        value={TongQuan.TongQuan}
                        onChange={handleChangeTQ}
                    />
                </Box>

                <Typography weight="bold" size="large" sx={{ marginLeft: "1.5rem" }}>
                    Mã thuốc chống chỉ định của bệnh nhân:
                </Typography>

                <Box sx={{ padding: "1rem", width: "100%" }}>
                    <MuiTextField
                        id={ChiDinh[0]?.MaThuoc || "1"}
                        fullWidth
                        multiline
                        rows={5}
                        value={ChiDinh.map((item) => item.MaThuoc).join(", ") || ""}
                        onChange={handleChangeCD}
                    />
                </Box>
                <DialogActions>
                    <Button bgcolor="gray" onClick={handleCloseTQ} sx={{ width: "7rem" }}>
                        Thoát
                    </Button>
                    <Button bgcolor="secondary" disabled={!TQState} onClick={handleUpdate} sx={{ width: "7rem" }}>
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
                <CreateOutlined onClick={props.edit} />
            </IconButton>
            <IconButton>
                <VisibilityOutlined onClick={props.all} />
            </IconButton>
            <IconButton>
                <FormatListBulleted onClick={props.detail} />
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
    { label: "Tuổi", value: "" },
    { label: "Giới tính", value: "" },
    { label: "Tổng tiền phải trả", value: "" },
    { label: "Tổng tiền thanh toán", value: "" },
    { label: "Tổng quan", value: "" },
    { label: "Số điện thoại", value: "" },
    { label: "Email", value: "" },
    { label: "Địa chỉ", value: "" }
];
