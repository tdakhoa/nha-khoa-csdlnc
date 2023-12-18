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
import axios from "axios";

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
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState(fetchData);
    const [render, setRender] = React.useState(false);
    const [drug, setDrug] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        axios
            .get(`http://localhost:5000/XemThuoc`)
            .then((res) => {
                console.log(res);
                setDrug(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (drug: any) => {
        setOpen(true);
        let temp: any = fetchData.map((e: any, i) => {
            return { ...e, value: Object.values(drug)[i] };
        });
        setData(temp);
    };

    const deleteDrug = async (id: string) => {
        console.log(id);
        axios
            .post(`http://localhost:5000/XoaThuoc/${id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
        axios
            .get(`http://localhost:5000/XemThuoc`)
            .then((res) => {
                console.log(res);
                setDrug(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
    };

    const handleChange = (e: any, i: any) => {
        fetchData[i].value = e.currentTarget.value;
        setData(fetchData);
        setRender(!render);
    };

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
                            {drug.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index) => {
                                return (
                                    <TableRow sx={{ whiteSpace: "nowrap" }} key={row.MaThuoc}>
                                        <TableCell align="center">
                                            <Typography size="p">{row.MaThuoc}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "end"
                                                }}>
                                                <Typography
                                                    sx={{
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: "2",
                                                        WebkitBoxOrient: "vertical",
                                                        whiteSpace: "nowrap",
                                                        maxWidth: "25rem"
                                                    }}
                                                    size="p">
                                                    {row.TenThuoc}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography size="p">{row.DonGia}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography size="p">{row.DonViTinh}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ActionCell
                                                edit={() => handleOpen(row)}
                                                delete={() => deleteDrug(row.MaThuoc)}
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
                    count={drug.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cập nhật thuốc</DialogTitle>
                <DialogContent>
                    <InputContainer container spacing={3}>
                        {data.map((item, i) => (
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
                    <Button bgcolor="secondary" onClick={handleClose} sx={{ width: "7rem" }}>
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>
        </EnhancedTableBox>
    );
}

const ActionCell = (props: any) => {
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

const headCells: readonly HeadCell[] = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "ID thuốc"
    },
    {
        id: "name",
        numeric: true,
        disablePadding: false,
        label: "Tên thuốc"
    },
    {
        id: "price",
        numeric: true,
        disablePadding: false,
        label: "Đơn giá"
    },
    {
        id: "amount",
        numeric: true,
        disablePadding: false,
        label: "Đơn vị tính"
    }
];

interface Data {
    id: string;
    name: string;
    price: string;
    amount: string;
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
    { label: "Tên thuốc", value: "" },
    { label: "Đơn giá", value: "" },
    { label: "Đơn vị tính", value: "" }
];
