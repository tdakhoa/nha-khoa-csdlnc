import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Box, Tab, Tabs, styled } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";

import { Button, Typography } from "../components";
import ToggleDrawer from "./components/Drawer";
import NhaSiTable from "./components/NhaSiTable";
import NhanVienTable from "./components/NhanVienTable";

const DuLieuHeThong = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                    <Box sx={{ display: "flex" }}>
                        <Link href="/new-post">
                            <Button
                                bgcolor="secondary"
                                borderradius="10px"
                                endIcon={<CreateOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />}>
                                <Typography size="p">{value == 0 ? "Thêm nha sĩ" : "Thêm nhân viên"}</Typography>
                            </Button>
                        </Link>
                    </Box>
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
