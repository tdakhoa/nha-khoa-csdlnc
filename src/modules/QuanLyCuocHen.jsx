import React from "react";
import { useState } from "react";
import moment from "moment";
import Link from "next/link";
import {
  Box,
  Tab,
  Tabs,
  styled,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  FormControl,
} from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";

import { Button, Typography, TextField } from "../components";
import ToggleDrawer from "./components/Drawer";
import QLCHTable from "./components/QLCHTable";
import YCHTable from "./components/YCHTable";
import { DatePicker } from "@mui/x-date-pickers";

const QuanLyCuocHen = () => {
  const [value, setValue] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(fetchData);
  const [render, setRender] = useState(false);
  const [name, setName] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleChangeForm = (e, i) => {
    fetchData[i].value = e.currentTarget.value;
    setData(fetchData);
    setRender(!render);
  };
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
            <div
              style={{
                display: "flex",
                alignItems: "end",
                gap: "1rem",
                width: "45vw",
              }}
            >
              <Typography
                size={{ lg: "p", md: "p" }}
                style={{ alignSelf: "center" }}
                weight="extraBold"
                color="secondary"
                format={{ lg: "left", md: "center" }}
              >
                Từ
              </Typography>
              <DatePicker
                inputFormat="DD-MM-YYYY"
                value={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <Typography
                style={{ alignSelf: "center" }}
                size={{ lg: "p", md: "p" }}
                weight="extraBold"
                color="secondary"
                format={{ lg: "left", md: "center" }}
              >
                Đến
              </Typography>
              <DatePicker
                inputFormat="DD-MM-YYYY"
                value={endDate}
                onChange={(date) => setEndDate(date)}
              />
              <TextField
                label={"Tên Nha Sĩ"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button
              bgcolor="secondary"
              borderradius="10px"
              endIcon={
                <CreateOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />
              }
              onClick={handleOpen}
            >
              <Typography size="p">Đặt lịch hẹn mới</Typography>
            </Button>
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

          {value == 0 ? (
            <QLCHTable startDate={startDate} endDate={endDate} name={name} />
          ) : (
            <YCHTable />
          )}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Thêm lịch hẹn</DialogTitle>
            <DialogContent>
              <InputContainer container spacing={3}>
                {data.map((item, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <TextField
                      label={item.label}
                      value={item.value}
                      onChange={(e) => handleChangeForm(e, i)}
                    />
                  </Grid>
                ))}
              </InputContainer>
            </DialogContent>
            <DialogActions>
              <Button
                bgcolor="gray"
                onClick={handleClose}
                sx={{ width: "5rem" }}
              >
                Thoát
              </Button>
              <Button
                bgcolor="secondary"
                onClick={handleClose}
                sx={{ width: "5rem" }}
              >
                Thêm
              </Button>
            </DialogActions>
          </Dialog>
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

const fetchData = [
  { label: "Email BN", value: "" },
  { label: "Dia Chi BN", value: "" },
  { label: "Giới tính", value: "" },
  { label: "Ho Ten BN", value: "" },
  { label: "Ngay sinh", value: "" },
  { label: "Ngay", value: "" },
  { label: "Gio", value: "" },
  { label: "Kham Chinh", value: "" },
  { label: "Tro kham", value: "" },
];

const InputContainer = styled(Grid)(({ theme }) => ({
  width: "100%",
  marginLeft: "0",
  padding: "12px 16px",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 0,
  },
}));
