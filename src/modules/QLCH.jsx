import React from "react";
import Link from "next/link";
import { Box, styled } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";

import { Button, Typography } from "../components";
import ToggleDrawer from "./components/Drawer";
import QLCHTable from "./components/QLCHTable";

const QuanLyCuocHen = () => {
    return (
        <Root>
            <ToggleDrawer />
            <Box component="main" sx={{ width: "100%", px: { xs: 2, md: 4 }, py: 3, pb: 12 }}>
                <HeaderBox>
                    <Typography
                        size={{ lg: "h2", md: "h3" }}
                        weight="extraBold"
                        color="secondary"
                        format={{ lg: "left", md: "center" }}>
                        Quản lý cuộc hẹn
                    </Typography>
                    <Link href="/new-post">
                        <Button
                            bgcolor="secondary"
                            borderradius="10px"
                            endIcon={<CreateOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />}>
                            <Typography size="p">Đặt lịch hẹn mới</Typography>
                        </Button>
                    </Link>
                </HeaderBox>

                <QLCHTable />
            </Box>
        </Root>
    );
};

export default QuanLyCuocHen;

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
