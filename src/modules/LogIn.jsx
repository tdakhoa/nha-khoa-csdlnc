import React, { useState } from "react";
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Snackbar,
  TextField,
  styled,
} from "@mui/material";
import { LockOutlined, MailOutlineOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import { useDispatch, useSelector } from "react-redux";

import { Button, Carousel, Typography } from "../components";
import axios from "axios";

const LogIn = () => {
  //const dispatch = useDispatch();
  const router = useRouter();
  const [tick, setTick] = useState(false);
  const [valid, setValid] = useState(null);

  const [userData, setUserData] = useState({
    ma: "",
    pw: "",
  });

  const handleTick = () => {
    setTick(!tick);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async () => {
    axios
      .post(`http://localhost:5000/DangNhap`, { ...userData })
      .then((res) => {
        console.log(res.data);
        if (res.data != -1) {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  // const { uid } = useSelector((state) => state.user);
  // if (uid) router.push("/");

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      <Overlay />
      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            zIndex: -999,
            height: "100%",
            width: "50%",
          }}
        >
          <Carousel listData={dataList} />
        </Box>
        <Box sx={{ width: "65%", textAlign: "center" }}>
          <Typography
            component="h6"
            size="18px"
            color="white"
            weight="semiBold"
          >
            Chào mừng bạn đã quay trở lại với
          </Typography>
          <Typography
            component="h1"
            size="h1"
            color="white"
            weight="extraBold"
            sx={{ fontFamily: "Playfair Display", lineHeight: "4.5rem" }}
          >
            Nha Khoa Smile
          </Typography>
          <Typography
            component="h6"
            size="18px"
            color="white"
            weight="regular"
            sx={{ marginTop: "1.5rem" }}
          >
            Hãy cùng khám phá về các dịch vụ, gặp gỡ đội ngũ chuyên gia kinh
            nghiệm và tìm hiểu về những tiến bộ mới nhất trong lĩnh vực nha khoa
          </Typography>
        </Box>
      </Box>

      <FormBox>
        <Typography
          size="h2"
          weight="extraBold"
          color="#4194CB"
          align="center"
          sx={{
            fontFamily: "Playfair Display",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Đăng nhập
        </Typography>
        <Grid container sx={{ gap: "0.5rem" }}>
          <Grid container item xs={12}>
            <IconGrid item xs={1.5}>
              <IconBox>
                <MailOutlineOutlined />
              </IconBox>
            </IconGrid>

            <Grid item xs={10.5}>
              <StyledTextField
                required
                label="Nhập mã nhân viên"
                variant="outlined"
                fullWidth
                {...register("email")}
                error={errors.email || valid ? true : false}
                value={userData.ma}
                onChange={(e) => {
                  setUserData({ ...userData, ma: e.target.value });
                }}
              />
            </Grid>
          </Grid>
          <StyledTypo variant="inherit" color="error">
            {errors.email?.message}
          </StyledTypo>

          <Grid container item xs={12}>
            <IconGrid item xs={1.5}>
              <IconBox>
                <LockOutlined />
              </IconBox>
            </IconGrid>

            <Grid item xs={10.5}>
              <StyledTextField
                required
                label="Nhập mật khẩu"
                variant="outlined"
                type="password"
                fullWidth
                {...register("password")}
                error={errors.password || valid ? true : false}
                value={userData.pw}
                onChange={(e) => {
                  setUserData({ ...userData, pw: e.target.value });
                }}
              />
            </Grid>
          </Grid>
          <StyledTypo variant="inherit" color="error">
            {errors.password?.message || valid}
          </StyledTypo>

          <Grid item xs={12}>
            <TickBox>
              <FormGroup>
                <FormControlLabel
                  control={<PWTick value={tick} onChange={handleTick} />}
                  label={
                    <Typography size="14px" sx={{ color: "black" }}>
                      Nhớ mật khẩu
                    </Typography>
                  }
                />
              </FormGroup>
            </TickBox>
          </Grid>

          <Grid item xs={12}>
            <StyledSignUpButton
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Đăng nhập
            </StyledSignUpButton>
          </Grid>

          <Grid item xs={12}>
            <ButtonBox>
              <Typography sx={{ color: "black" }}>
                Bạn chưa có tài khoản?
              </Typography>
              <Link href="/register">
                <Typography
                  component="h2"
                  weight="semiBold"
                  sx={{
                    color: "var(--palette-02)",
                    "&:hover": { color: "var(--palette-02-hover)" },
                  }}
                >
                  Đăng ký
                </Typography>
              </Link>
            </ButtonBox>
          </Grid>
        </Grid>
      </FormBox>
    </Box>
  );
};

export default LogIn;

const validationSchema = Yup.object().shape({
  //   email: Yup.string()
  //     .required("Username/Email is required")
  //     .min(6, "Username/Email must be at least 6 characters")
  //     .max(30, "Username/Email must not exceed 30 characters"),
  //   password: Yup.string()
  //     .required("Password is required")
  //     .min(6, "Password must be at least 6 characters")
  //     .max(40, "Password must not exceed 40 characters"),
});

const imgLinks = [
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const CarouselItem = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "stretch",
  backgroundColor: "red",
  "& img": {
    objectFit: "cover !important",
  },
}));

const dataList = imgLinks.map((link, i) => (
  <CarouselItem key={i}>
    <img alt="" src={link} />
  </CarouselItem>
));

const Overlay = styled(Box)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.4)",
  position: "absolute",
  top: 0,
  left: 0,
  width: "50%",
  height: "inherit",
  textAlign: "center",
  zIndex: "-998",
}));

const Logo = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "5%",
  left: "2%",
}));

const StyledSignUpButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "1rem 1.5rem",
  marginTop: "0.5rem",
  width: "100%",
  textTransform: "capitalize",
  backgroundColor: "#4194CB",
  "&:hover": {
    backgroundColor: "#4194CB",
    color: "#fff",
    borderColor: "#4194CB",
  },
}));

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "error",
})(({ theme, error }) => ({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    color: "black",
    borderRadius: "0 8px 8px 0",
    "& fieldset": {
      borderColor: "black",
    },
    "& ::placeholder": {
      color: "black",
    },
    "&:hover fieldset": {
      borderColor: "var(--palette-02)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  position: error ? "relative" : "",
  animation: error ? "shake .1s linear" : "initial",
  animationIterationCount: error ? "3" : "initial",
  "@keyframes shake": {
    "0%": { left: "-5px" },
    "100%": { right: "-5px" },
  },
}));

const StyledTypo = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
}));

const ButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0.5rem",
  gap: "0.5rem",
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  color: "#fff",
  backgroundColor: "#4194CB",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px 0 0 8px",
  height: "100%",
}));

const IconGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "8px 0 0 8px",
  height: "100%",
}));

const FormBox = styled(Box)(({ theme }) => ({
  width: "50%",
  backgroundColor: "#fff",
  padding: "6% 8%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const PWTick = styled(Checkbox)(({ theme }) => ({
  color: "rgba(0, 0, 0, 0.70)",
  "&.Mui-checked": {
    color: "rgba(0, 0, 0, 0.70)",
  },
}));

const TickBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "rgba(255, 255, 255, 0.70)",
}));
