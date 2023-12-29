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
import QLDTTable from "./components/QLDTTable";

const QuanLyDieuTri = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(fetchData);
  const [render, setRender] = useState(false);
  const [MaBN, setMaBN] = useState("");

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

  return (
    <Root>
      <ToggleDrawer />
      <Box
        component="main"
        sx={{ width: "100%", px: { xs: 2, md: 4 }, py: 3, pb: 12 }}
      >
        <HeaderBox>
          <Box sx={{ display: "flex", alignItems: "center", gap: "6rem" }}>
            <Typography
              size={{ lg: "h3", md: "h4" }}
              weight="extraBold"
              color="secondary"
              format={{ lg: "left", md: "center" }}
            >
              Quản lý Điều trị
            </Typography>
            <Box
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
                Mã Bệnh Nhân
              </Typography>
              <TextField
                value={MaBN}
                onChange={(e) => setMaBN(e.target.value)}
              />
            </Box>
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
              <Typography size="p">thêm kế hoạch</Typography>
            </Button>
          </Box>
        </HeaderBox>

        <Box sx={{ width: "100%" }}>
          <QLDTTable MaBN={MaBN} />
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

export default QuanLyDieuTri;

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
  { label: "Mã điều trị", value: "" },
  { label: "Ngày điều trị", value: "" },
  { label: "Mô tả", value: "" },
  { label: "Ghi Chú", value: "" },
  { label: "Trạng thái", value: "" },
  { label: "Mã bệnh nhân", value: "" },
  { label: "Khám chính", value: "" },
  { label: "Trợ khám", value: "" },
];

const InputContainer = styled(Grid)(({ theme }) => ({
  width: "100%",
  marginLeft: "0",
  padding: "12px 16px",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 0,
  },
}));
