import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Box, Tab, Tabs, styled } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";

import { Button, Typography } from "../components";
import ToggleDrawer from "./components/Drawer";
import QLCHTable from "./components/QLCHTable";
import YCHTable from "./components/YCHTable";
import { DatePicker } from "@mui/x-date-pickers";

const QuanLyCuocHen = () => {
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Root>
      <ToggleDrawer />
      <Box
        component="main"
        sx={{ width: "100%", px: { xs: 2, md: 4 }, py: 3, pb: 12 }}
      >
        <HeaderBox>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Typography
              size={{ lg: "h3", md: "h4" }}
              weight="extraBold"
              color="secondary"
              format={{ lg: "left", md: "center" }}
            >
              Quản lý cuộc hẹn ngày:
            </Typography>
            <DatePicker
              inputFormat="DD-MM-YYYY"
              value={date}
              onChange={(date) => setDate(date)}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Link href="/new-post">
              <Button
                bgcolor="secondary"
                borderradius="10px"
                endIcon={
                  <CreateOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />
                }
              >
                <Typography size="p">Đặt lịch hẹn mới</Typography>
              </Button>
            </Link>
          </Box>
        </HeaderBox>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Danh sách cuộc hẹn" />
              <Tab label="Yêu cầu hẹn" />
            </Tabs>
          </Box>

          {value == 0 ? <QLCHTable /> : <YCHTable />}
        </Box>
      </Box>
    </Root>
  );
};

export default QuanLyCuocHen;

const Root = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
    flexDirection: "column",
  },
}));
