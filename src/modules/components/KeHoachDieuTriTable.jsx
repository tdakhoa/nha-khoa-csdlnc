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
    const [data, setData] = React.useState(fetchData);
    const [render, setRender] = React.useState(false);
    const [plans, setPlans] = React.useState([]);
    const router = useRouter();

    React.useEffect(() => {
        if (router.query.slug) {
            axios
                .get(`http://localhost:5000/XemKeHoachDieuTriBenhNhan/${router.query.slug}`)
                .then((res) => {
                    console.log(res);
                    setPlans(Array.isArray(res.data) ? res.data : []);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [router.query.slug]);

    const handleOpen = (plan) => {
        setOpen(true);
        let temp = fetchData.map((e, i) => {
            return { ...e, value: Object.values(plan)[i] };
        });
        setData(temp);
    };

    const deletePlan = async (id) => {
        try {
            await axios.post(`http://localhost:5000/XoaChiTietKeHoachDieuTri/${id}`);
            const res = await axios.get(`http://localhost:5000/XemKeHoachDieuTriBenhNhan/${router.query.slug}`);
            setPlans(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.log(err);
        }
    };

    const updatePlan = async () => {
        let value = {
            MaKHDT: data[0].value,
            MoTa: data[1].value,
            NgayDieuTri: data[2].value,
            GhiChu: data[3].value,
            TrangThai: data[4].value,
            MaBN: data[5].value,
            KhamChinh: data[6].value,
            TroKham: data[7].value
        };

        try {
            await axios.post(`http://localhost:5000/CapNhatKeHoachDieuTriBenhNhan`, value);
            const allPlanRes = await axios.get(`http://localhost:5000/XemKeHoachDieuTriBenhNhan/${router.query.slug}`);
            setPlans(Array.isArray(allPlanRes.data) ? allPlanRes.data : []);
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
                            {plans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow sx={{ whiteSpace: "nowrap" }} key={row.MaKHDT}>
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
                                                {row.MaKHDT}
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
                                                    {row.MoTa}
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
                                                {moment(row.NgayDieuTri).format("DD-MM-YYYY")}
                                            </Typography>
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
                                                    {row.GhiChu}
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
                                                    {row.TrangThai}
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
                                                {row.MaBN}
                                            </Typography>
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
                                                {row.KhamChinh}
                                            </Typography>
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
                                                {row.TroKham}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ActionCell
                                                edit={() => handleOpen(row)}
                                                delete={() => deletePlan(row.MaKHDT)}
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
                    count={plans.length}
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
                    <Button bgcolor="secondary" onClick={() => updatePlan()} sx={{ width: "7rem" }}>
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
        label: "Mã điều trị"
    },
    {
        id: "category",
        numeric: true,
        disablePadding: false,
        label: "Mô tả"
    },
    {
        id: "gender",
        numeric: true,
        disablePadding: false,
        label: "Ngày điều trị"
    },
    {
        id: "password",
        numeric: true,
        disablePadding: false,
        label: "Ghi chú"
    },
    {
        id: "status",
        numeric: true,
        disablePadding: false,
        label: "Trạng thái"
    },
    {
        id: "patient",
        numeric: true,
        disablePadding: false,
        label: "Mã bệnh nhân"
    },
    {
        id: "writer",
        numeric: true,
        disablePadding: false,
        label: "Nha sĩ chính"
    },
    {
        id: "date",
        numeric: true,
        disablePadding: false,
        label: "Trợ khám"
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
    { label: "Mã điều trị", value: "" },
    { label: "Mô tả", value: "" },
    { label: "Ngày điều trị", value: "" },
    { label: "Ghi chú", value: "" },
    { label: "Trạng thái", value: "" },
    { label: "Mã bệnh nhân", value: "" },
    { label: "Nha sĩ chính", value: "" },
    { label: "Trợ khám", value: "" }
];
