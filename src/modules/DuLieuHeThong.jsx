import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Tab, Tabs, styled } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";

import { Button, TextField, Typography } from "../components";
import ToggleDrawer from "./components/Drawer";
import NhaSiTable from "./components/NhaSiTable";
import NhanVienTable from "./components/NhanVienTable";
import axios from "axios";

const DuLieuHeThong = () => {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [render, setRender] = useState(false);

    const [data, setData] = useState(fetchData);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClose = () => {
        setOpen(false);
        fetchData.forEach((item) => (item.value = ""));
        setData(fetchData);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChangeFields = (e, i) => {
        fetchData[i].value = e.currentTarget.value;
        setData(fetchData);
        setRender(!render);
    };

    const onSubmit = async () => {
        let dataValue = {
            MaND: data[0].value,
            TenND: data[1].value,
            NgaySinhND: data[2].value,
            GioiTinhND: data[3].value,
            MatKhau: data[4].value,
            PhongKham: data[5].value
        };

        try {
            const addUrl =
                value === 0 ? "http://localhost:5000/ADD_THE_DOCTOR" : "http://localhost:5000/ADD_THE_EMPLOYEE";
            await axios.post(addUrl, dataValue);
            const fetchUrl =
                value === 0 ? "http://localhost:5000/ALL_THE_DOCTORS" : "http://localhost:5000/ALL_THE_EMPLOYEES";
            const fetchRes = await axios.get(fetchUrl);
            const newData = fetchRes.data;
            console.log("Newly fetched data:", newData);

            handleClose();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Root>
            <ToggleDrawer />
            <Box component="main" sx={{ width: "100%", px: { xs: 2, md: 4 }, py: 3, pb: 12 }}>
                <HeaderBox>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <Typography
                            size={{ lg: "h3", md: "h4" }}
                            weight="extraBold"
                            color="secondary"
                            format={{ lg: "left", md: "center" }}>
                            Dữ liệu hệ thống
                        </Typography>
                    </Box>

                    <Button
                        bgcolor="secondary"
                        borderradius="10px"
                        endIcon={<CreateOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />}
                        onClick={handleOpen}>
                        <Typography size="p">{value == 0 ? "Thêm nha sĩ" : "Thêm nhân viên"}</Typography>
                    </Button>
                </HeaderBox>

                <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Nha sĩ" />
                            <Tab label="Nhân viên" />
                        </Tabs>
                    </Box>

                    {value == 0 ? <NhaSiTable /> : <NhanVienTable />}
                </Box>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Thêm hồ sơ</DialogTitle>
                    <DialogContent>
                        <InputContainer container spacing={3}>
                            {data.map((item, i) => (
                                <Grid item xs={12} sm={6} key={i}>
                                    <TextField
                                        label={i == 0 ? (value == 0 ? "Mã nha sĩ" : "Mã nhân viên") : item.label}
                                        value={item.value}
                                        onChange={(e) => handleChangeFields(e, i)}
                                    />
                                </Grid>
                            ))}
                        </InputContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button bgcolor="gray" onClick={handleClose} sx={{ width: "5rem" }}>
                            Thoát
                        </Button>
                        <Button bgcolor="secondary" onClick={onSubmit} sx={{ width: "5rem" }}>
                            Thêm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Root>
    );
};

export default DuLieuHeThong;

const Root = styled(Box)(({ theme }) => ({
    display: "flex"
}));

const HeaderBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
        alignItems: "center",
        flexDirection: "column"
    }
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
    { label: "Mã", value: "" },
    { label: "Họ tên", value: "" },
    { label: "Ngày sinh", value: "" },
    { label: "Giới tính", value: "" },
    { label: "Mật khẩu", value: "" },
    { label: "Mã phòng khám", value: "" }
];
