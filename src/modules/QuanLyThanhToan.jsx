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
import QLTTTable from "./components/QLTTTable";
import YCHTable from "./components/YCHTable";

const QuanLyThanhToan = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(fetchData);
  const [render, setRender] = useState(false);
  const [MABN, setMABN] = useState("");
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
              Quản lý thanh toán
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
                Mã bệnh nhân
              </Typography>
              <TextField
                value={MABN}
                onChange={(e) => {
                  setMABN(e.target.value);
                  console.log(MABN);
                }}
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
              <Typography size="p">Thanh toán</Typography>
            </Button>
          </Box>
        </HeaderBox>

        <Box sx={{ width: "100%" }}>
          <QLTTTable MABN={MABN} />
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

export default QuanLyThanhToan;

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
  { label: "Mã Thanh toán", value: "" },
  { label: "Ngày giao dịch", value: "" },
  { label: "Tổng tiền", value: "" },
  { label: "Đã trả", value: "" },
  { label: "Tiền thối", value: "" },
  { label: "Loại thanh toán", value: "" },
];

const InputContainer = styled(Grid)(({ theme }) => ({
  width: "100%",
  marginLeft: "0",
  padding: "12px 16px",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 0,
  },
}));
