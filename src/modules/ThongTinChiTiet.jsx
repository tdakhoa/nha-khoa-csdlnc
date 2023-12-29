import React from "react";
import { useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Tab, Tabs, styled } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";

import { Button, TextField, Typography } from "../components";
import ToggleDrawer from "./components/Drawer";
import KeHoachDieuTriTable from "./components/KeHoachDieuTriTable";
import DonThuocTable from "./components/DonThuocTable";
import DanhSachThanhToanTable from "./components/DanhSachThanhToanTable";
import { useRouter } from "next/router";
import axios from "axios";

const ThongTinChiTiet = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(fetchData);
    const [render, setRender] = useState(false);
    const [value, setValue] = useState(0);
    const router = useRouter();

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const handleClose = () => {
        setOpen(false);
        fetchData.forEach((item) => (item.value = ""));
        fetchData1.forEach((item) => (item.value = ""));
        setData(fetchData);
    };

    const handleOpen = () => {
        setData(value == 0 ? fetchData : fetchData1);
        setOpen(true);
    };

    const handleChange = (e, i) => {
        if (value == 0) fetchData[i].value = e.currentTarget.value;
        else fetchData1[i].value = e.currentTarget.value;
        setData(value == 0 ? fetchData : fetchData1);
        setRender(!render);
    };

    const onSubmit = async () => {
        let dataValue =
            value == 0
                ? {
                      MaKHDT: data[0].value,
                      MoTa: data[1].value,
                      NgayDieuTri: data[2].value,
                      GhiChu: data[3].value,
                      TrangThai: data[4].value,
                      MaBN: data[5].value,
                      KhamChinh: data[6].value,
                      TroKham: data[7].value
                  }
                : {
                      MaDonThuoc: data[0].value,
                      MaThuoc: data[1].value,
                      NgayLap: data[2].value,
                      LieuLuong: data[3].value,
                      MaBN: data[4].value,
                      NguoiLap: data[5].value
                  };
        console.log(router.query.slug);
        try {
            const addUrl =
                value === 0 ? `http://localhost:5000/ThemKeHoachDieuTriBenhNhan` : `http://localhost:5000/ThemDonThuoc`;
            const post = await axios.post(addUrl, dataValue);
            const fetchUrl =
                value === 0
                    ? `http://localhost:5000/XemKeHoachDieuTriBenhNhan/${router.query.slug}`
                    : `http://localhost:5000/DonThuoc/${router.query.slug}`;
            const get = await axios.get(fetchUrl);

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
                    <DialogTitle>{value == 0 ? "Thêm kế hoạch điều trị" : "Thêm đơn thuốc"}</DialogTitle>
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
                        <Button bgcolor="secondary" onClick={onSubmit} sx={{ width: "5rem" }}>
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
    { label: "Mã KHDT", value: "" },
    { label: "Mô Tả", value: "" },
    { label: "Ngày điều trị", value: "" },
    { label: "Ghi chú", value: "" },
    { label: "Trạng thái", value: "" },
    { label: "Mã bệnh nhân", value: "" },
    { label: "Bác sĩ chính", value: "" },
    { label: "Trợ khám", value: "" }
];

const fetchData1 = [
    { label: "Mã đơn thuốc", value: "" },
    { label: "Mã thuốc", value: "" },
    { label: "Ngày lập", value: "" },
    { label: "Liều lượng", value: "" },
    { label: "Mã bệnh nhân", value: "" },
    { label: "Người lập", value: "" }
];

const InputContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
    marginLeft: "0",
    padding: "12px 16px",
    [theme.breakpoints.down("sm")]: {
        paddingLeft: 0
    }
}));
