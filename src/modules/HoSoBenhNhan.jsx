import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Box, styled } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";

import { Button, Typography } from "../components";
import ToggleDrawer from "./components/Drawer";
import BenhNhanTable from "./components/BenhNhanTable";

const HoSoBenhNhan = () => {
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
                    <Box sx={{ display: "flex" }}>
                        <Link href="/new-post">
                            <Button
                                bgcolor="secondary"
                                borderradius="10px"
                                endIcon={<CreateOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />}>
                                <Typography size="p">Thêm hồ sơ bệnh nhân</Typography>
                            </Button>
                        </Link>
                    </Box>
                </HeaderBox>

                <BenhNhanTable />
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
