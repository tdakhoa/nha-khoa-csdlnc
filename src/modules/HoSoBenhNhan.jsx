import React from "react";
import { useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, styled } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";

import { Button, TextField, Typography } from "../components";
import ToggleDrawer from "./components/Drawer";
import BenhNhanTable from "./components/BenhNhanTable";
import axios from "axios";

const HoSoBenhNhan = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(fetchData);
    const [render, setRender] = useState(false);

    const handleClose = () => {
        setOpen(false);
        fetchData.forEach((item) => (item.value = ""));
        setData(fetchData);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (e, i) => {
        fetchData[i].value = e.currentTarget.value;
        setData(fetchData);
        setRender(!render);
    };

    const onSubmit = async () => {
        let value = {
            MaBN: data[0].value,
            HotenBN: data[1].value,
            NgaySinhBN: data[2].value,
            GioiTinhBN: data[3].value,
            SDTBN: data[4].value,
            EmailBN: data[5].value,
            DiaChiBN: data[6].value
        };

        try {
            const res = await axios.post(`http://localhost:5000/ThemTTBenhNhan`, value);
            console.log(res.data);
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
                            Hồ sơ bệnh nhân
                        </Typography>
                    </Box>

                    <Button
                        bgcolor="secondary"
                        borderradius="10px"
                        endIcon={<CreateOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />}
                        onClick={handleOpen}>
                        <Typography size="p">Thêm hồ sơ bệnh nhân</Typography>
                    </Button>
                </HeaderBox>

                <BenhNhanTable />

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
                        <Button bgcolor="secondary" onClick={onSubmit} sx={{ width: "5rem" }}>
                            Thêm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Root>
    );
};

export default HoSoBenhNhan;

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
    { label: "Mã bệnh nhân", value: "" },
    { label: "Họ tên", value: "" },
    { label: "Ngày sinh", value: "" },
    { label: "Giới tính", value: "" },
    { label: "Số điện thoại", value: "" },
    { label: "Email", value: "" },
    { label: "Địa chỉ", value: "" }
];

const InputContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
    marginLeft: "0",
    padding: "12px 16px",
    [theme.breakpoints.down("sm")]: {
        paddingLeft: 0
    }
}));
