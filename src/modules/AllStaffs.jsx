import React from "react";
import { Box, styled } from "@mui/material";

import { Button, Typography } from "../components";
import ToggleDrawer from "./components/Drawer";
import { CreateOutlined } from "@mui/icons-material";
import StaffTable from "./components/StaffTable";

const NewPost = () => {
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
                        QUẢN LÝ NHÂN SỰ
                    </Typography>
                    <Button
                        bgcolor="secondary"
                        borderradius="10px"
                        endIcon={<CreateOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />}>
                        <Typography size="p">Thêm nhân sự</Typography>
                    </Button>
                </HeaderBox>

                <StaffTable />
            </Box>
        </Root>
    );
};

export default NewPost;

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
