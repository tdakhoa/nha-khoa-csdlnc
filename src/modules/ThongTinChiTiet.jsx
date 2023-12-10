import React from "react";
import { useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Tab, Tabs, styled } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";

import { Button, TextField, Typography } from "../components";
import ToggleDrawer from "./components/Drawer";
import KeHoachDieuTriTable from "./components/KeHoachDieuTriTable";
import DonThuocTable from "./components/DonThuocTable";
import DanhSachThanhToanTable from "./components/DanhSachThanhToanTable";

const ThongTinChiTiet = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(fetchData);
    const [render, setRender] = useState(false);
    const [value, setValue] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

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
                            {value == 0 ? "Kế hoạch điều trị" : value == 1 ? "Đơn thuốc" : "Danh sách thanh toán"}
                        </Typography>
                    </Box>

                    {value != 2 ? (
                        <Button
                            bgcolor="secondary"
                            borderradius="10px"
                            endIcon={<CreateOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />}
                            onClick={handleOpen}>
                            <Typography size="p">{value == 0 ? "Thêm kế hoạch điều trị" : "Thêm đơn thuốc"}</Typography>
                        </Button>
                    ) : (
                        <></>
                    )}
                </HeaderBox>

                <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                            <Tab label="Kế hoạch điều trị" />
                            <Tab label="Đơn thuốc" />
                            <Tab label="Danh sách thanh toán" />
                        </Tabs>
                    </Box>

                    {value == 0 ? <KeHoachDieuTriTable /> : value == 1 ? <DonThuocTable /> : <DanhSachThanhToanTable />}
                </Box>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Thêm hồ sơ</DialogTitle>
                    <DialogContent>
                        <InputContainer container spacing={3}>
                            {data.map((item, i) => (
                                <Grid item xs={12} sm={6} key={i}>
                                    <TextField
                                        label={item.label}
                                        value={item.value}
                                        onChange={(e) => handleChange(e, i)}
                                    />
                                </Grid>
                            ))}
                        </InputContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button bgcolor="gray" onClick={handleClose} sx={{ width: "5rem" }}>
                            Thoát
                        </Button>
                        <Button bgcolor="secondary" onClick={handleClose} sx={{ width: "5rem" }}>
                            Thêm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Root>
    );
};

export default ThongTinChiTiet;

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

const fetchData = [
    { label: "ID khách hàng", value: "" },
    { label: "Họ tên", value: "" },
    { label: "Giới tính", value: "" },
    { label: "Ngày sinh", value: "" },
    { label: "Số điện thoại", value: "" },
    { label: "Mật khẩu", value: "" }
];

const InputContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
    marginLeft: "0",
    padding: "12px 16px",
    [theme.breakpoints.down("sm")]: {
        paddingLeft: 0
    }
}));
