import { useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, styled } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";
import axios from "axios";

import { Button, TextField, Typography } from "../components";
import ToggleDrawer from "./components/Drawer";
import LichLamViecTable from "./components/LichLamViecTable";

const QuanLyThuoc = () => {
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
            mathuoc: data[0].value,
            tenthuoc: data[1].value,
            gia: data[2].value,
            donvi: data[3].value
        };
        axios
            .post(`http://localhost:5000/ThemThuoc`, { ...value })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {});
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
                            Lịch làm việc
                        </Typography>
                    </Box>

                    <Button
                        bgcolor="secondary"
                        borderradius="10px"
                        endIcon={<CreateOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />}
                        onClick={handleOpen}>
                        <Typography size="p">Thêm lịch làm việc</Typography>
                    </Button>
                </HeaderBox>

                <LichLamViecTable />
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thêm lịch làm việc</DialogTitle>
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
                    <Button bgcolor="gray" onClick={handleClose} sx={{ width: "5rem" }}>
                        Thoát
                    </Button>
                    <Button bgcolor="secondary" onClick={onSubmit} sx={{ width: "5rem" }}>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </Root>
    );
};

export default QuanLyThuoc;

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
    { label: "Mã lịch làm việc", value: "" },
    { label: "Mã nha sĩ", value: "" },
    { label: "Ngày làm việc", value: "" },
    { label: "Giờ bắt đầu", value: "" },
    { label: "Giờ kết thúc", value: "" }
];

const InputContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
    marginLeft: "0",
    padding: "12px 16px",
    [theme.breakpoints.down("sm")]: {
        paddingLeft: 0
    }
}));
