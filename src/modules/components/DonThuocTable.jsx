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
import moment from "moment";

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
    const [data, setData] = React.useState(donThuocData);
    const [render, setRender] = React.useState(false);
    const [medicines, setMedicines] = React.useState([]);
    const router = useRouter();

    React.useEffect(() => {
        axios
            .get(`http://localhost:5000/DonThuoc/${router.query.slug}`)
            .then((res) => {
                console.log(res);
                setMedicines(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
    }, []);

    const handleOpen = (medicine) => {
        setOpen(true);
        let temp = donThuocData.map((e, i) => {
            return { ...e, value: Object.values(medicine)[i] };
        });
        setData(temp);
    };

    const deleteMedicine = async (id) => {
        try {
            await axios.post(`http://localhost:5000/XoaDonThuoc/${id}`);
            const res = await axios.get(`http://localhost:5000/DonThuoc/${router.query.slug}`);
            setMedicines(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.log(err);
        }
    };

    const updateMedicine = async () => {
        let value = {
            MaDonThuoc: data[0].value,
            MaThuoc: data[1].value,
            NgayLap: data[2].value,
            LieuLuong: data[3].value,
            MaBN: data[4].value,
            NguoiLap: data[5].value
        };

        try {
            await axios.post(`http://localhost:5000/SuaDonThuoc`, value);
            const allPlanRes = await axios.get(`http://localhost:5000/DonThuoc/${router.query.slug}`);
            setMedicines(Array.isArray(allPlanRes.data) ? allPlanRes.data : []);
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
                            {medicines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow sx={{ whiteSpace: "nowrap" }} key={row.MaDonThuoc}>
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
                                                {row.MaDonThuoc}
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
                                                        maxWidth: "14rem"
                                                    }}>
                                                    {row.MaThuoc}
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
                                                        maxWidth: "8rem"
                                                    }}>
                                                    {moment(row.NgayLap).format("DD-MM-YYYY")}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                                                    {row.LieuLuong}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                                                    {row.MaBN}
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
                                                {row.NguoiLap}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            <ActionCell
                                                edit={() => handleOpen(row)}
                                                delete={() => deleteMedicine(row.MaDonThuoc)}
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
                    count={medicines.length}
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
                            Cập nhật kế hoạch điều trị
                        </Typography>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <InputContainer container spacing={3}>
                        {data.map((item, i) => (
                            <>
                                {i == 2 ? (
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
                    <Button bgcolor="secondary" onClick={() => updateMedicine()} sx={{ width: "7rem" }}>
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
        label: "Mã đơn thuốc"
    },
    {
        id: "category",
        numeric: true,
        disablePadding: false,
        label: "Mã thuốc"
    },
    {
        id: "gender",
        numeric: true,
        disablePadding: false,
        label: "Ngày lập"
    },
    {
        id: "amount",
        numeric: true,
        disablePadding: false,
        label: "Liều lượng"
    },
    {
        id: "patient",
        numeric: true,
        disablePadding: false,
        label: "Mã bệnh nhân"
    },
    {
        id: "doctor",
        numeric: true,
        disablePadding: false,
        label: "Người lập"
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

const donThuocData = [
    { label: "Mã đơn thuốc", value: "" },
    { label: "Mã thuốc", value: "" },
    { label: "Ngày lập", value: "" },
    { label: "Liều lượng", value: "" },
    { label: "Mã bệnh nhân", value: "" },
    { label: "Người lập", value: "" }
];
