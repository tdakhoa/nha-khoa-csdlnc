import React from "react";
import { Box } from "@mui/material";

import { Typography } from "../components";
import ToggleDrawer from "./components/Drawer";

const Home = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <ToggleDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Typography size="p">Home</Typography>
            </Box>
        </Box>
    );
};

export default Home;
