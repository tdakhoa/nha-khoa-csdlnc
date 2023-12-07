import React, { useState } from "react";
import { Alert, Box, Button, Grid, Snackbar, TextField, styled } from "@mui/material";
import { AccountCircleOutlined, LockOutlined, MailOutlineOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import { useSelector } from "react-redux";

// import { db } from "../../firebase/firebaseConfig";
// import logo from "../../../public/logo.png";
import { Carousel, Typography } from "../components";

const Register = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        premium: false
    });
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);

    const [success, setSuccess] = useState(false);
    const handleCloseSuccess = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema) });

    const onSubmit = async () => {
        // if (username == null && email == null) {
        //     const ref = collection(db, "users");
        //     await addDoc(ref, userData);
        //     setSuccess(true);
        //     setTimeout(function () {
        //         router.push("/login");
        //     }, 500);
        // }
    };

    const handleUsername = async (e) => {
        // setUserData({ ...userData, username: e.target.value });
        // const ref = collection(db, "users");
        // const docSnap = await getDocs(ref);
        // let exist = false;
        // docSnap.forEach((doc) => {
        //     let i = doc.data();
        //     if (i.username === e.target.value) exist = true;
        // });
        // setUsername(exist ? "Username is already taken" : null);
    };

    const handleEmail = async (e) => {
        // setUserData({ ...userData, email: e.target.value });
        // const ref = collection(db, "users");
        // const docSnap = await getDocs(ref);
        // let exist = false;
        // docSnap.forEach((doc) => {
        //     let i = doc.data();
        //     if (i.email === e.target.value) exist = true;
        // });
        // setEmail(exist ? "Email is already taken" : null);
    };

    const handlePassword = (e) => {
        setUserData({ ...userData, password: e.target.value });
    };

    // const { uid } = useSelector((state) => state.user);
    // if (uid) router.push("/");

    return (
        <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
            <Overlay />
            <Box sx={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ position: "absolute", zIndex: -999, height: "100%", width: "50%" }}>
                    <Carousel listData={dataList} />
                </Box>
                <Box sx={{ width: "68%", textAlign: "center" }}>
                    <Typography component="h6" size="18px" color="white" weight="semiBold">
                        Chào mừng bạn đến với đại gia đình
                    </Typography>
                    <Typography
                        component="h1"
                        size="h1"
                        color="white"
                        weight="extraBold"
                        sx={{ fontFamily: "Playfair Display", lineHeight: "4.5rem" }}>
                        Nha Khoa Smile
                    </Typography>
                    <Typography component="h6" size="18px" color="white" weight="regular" sx={{ marginTop: "1.5rem" }}>
                        Hãy cùng khám phá về các dịch vụ, gặp gỡ đội ngũ chuyên gia kinh nghiệm và tìm hiểu về những
                        tiến bộ mới nhất trong lĩnh vực nha khoa
                    </Typography>
                </Box>
            </Box>
            <FormBox>
                <Typography
                    size="h2"
                    weight="extraBold"
                    color="#4194CB"
                    align="center"
                    sx={{ fontFamily: "Playfair Display", marginBottom: "1rem", textAlign: "center" }}>
                    Đăng ký
                </Typography>
                <Grid container sx={{ gap: "0.5rem" }}>
                    <Grid container item xs={12}>
                        <IconGrid item xs={1.5}>
                            <IconBox>
                                <AccountCircleOutlined />
                            </IconBox>
                        </IconGrid>
                        <Grid item xs={10.5}>
                            <StyledTextField
                                required
                                label="Enter your username"
                                variant="outlined"
                                fullWidth
                                {...register("username")}
                                error={errors.username || username ? true : false}
                                value={userData.username}
                                onChange={handleUsername}
                            />
                        </Grid>
                    </Grid>
                    <StyledTypo variant="inherit" color="error">
                        {errors.username?.message || username}
                    </StyledTypo>

                    <Grid container item xs={12}>
                        <IconGrid item xs={1.5}>
                            <IconBox>
                                <MailOutlineOutlined />
                            </IconBox>
                        </IconGrid>
                        <Grid item xs={10.5}>
                            <StyledTextField
                                required
                                label="Enter your email"
                                variant="outlined"
                                fullWidth
                                {...register("email")}
                                error={errors.email || email ? true : false}
                                value={userData.email}
                                onChange={handleEmail}
                            />
                        </Grid>
                    </Grid>
                    <StyledTypo variant="inherit" color="error">
                        {errors.email?.message || email}
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
                                label="Enter your password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                {...register("password", { required: true })}
                                error={errors.password ? true : false}
                                value={userData.password}
                                onChange={handlePassword}
                            />
                        </Grid>
                    </Grid>
                    <StyledTypo variant="inherit" color="error">
                        {errors.password?.message}
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
                                label="Re-enter your password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                {...register("confirmPassword")}
                                error={errors.confirmPassword ? true : false}
                            />
                        </Grid>
                    </Grid>
                    <StyledTypo variant="inherit" color="error">
                        {errors.confirmPassword?.message}
                    </StyledTypo>

                    <Grid item xs={12}>
                        <StyledSignUpButton variant="contained" onClick={handleSubmit(onSubmit)}>
                            Đăng ký
                        </StyledSignUpButton>
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonBox>
                            <Typography sx={{ color: "black" }}>Bạn đã có tài khoản?</Typography>
                            <Link href="/login">
                                <Typography
                                    component="h2"
                                    weight="semiBold"
                                    sx={{
                                        color: "var(--palette-02)",
                                        "&:hover": { color: "var(--palette-02-hover)" }
                                    }}>
                                    Đăng nhập
                                </Typography>
                            </Link>
                        </ButtonBox>
                    </Grid>
                </Grid>
            </FormBox>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={success}
                autoHideDuration={3000}
                onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: "100%" }}>
                    Đăng ký hoàn tất!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Register;

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is required")
        .min(6, "Username must be at least 6 characters")
        .max(20, "Username must not exceed 20 characters")
        .matches(/^\w*$/, "Username must not include special characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password"), null], "Confirm Password does not match")
});

const imgLinks = [
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const CarouselItem = styled(Box)(({ theme }) => ({
    height: "100%",
    display: "flex",
    alignItems: "stretch",
    backgroundColor: "red",
    "& img": {
        objectFit: "cover !important"
    }
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
    zIndex: "-998"
}));

const Logo = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "5%",
    left: "2%"
}));

const StyledSignUpButton = styled(Button)(({ theme }) => ({
    borderRadius: "10px",
    textTransform: "capitalize",
    padding: "1rem 1.5rem",
    marginTop: "0.5rem",
    width: "100%",
    backgroundColor: "#4194CB",
    "&:hover": {
        backgroundColor: "#4194CB"
    }
}));

const StyledTextField = styled(TextField, {
    shouldForwardProp: (prop) => prop !== "error"
})(({ theme, error }) => ({
    "& label.Mui-focused": {
        color: "black"
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "black"
    },
    "& .MuiOutlinedInput-root": {
        color: "black",
        borderRadius: "0 8px 8px 0",
        "& fieldset": {
            borderColor: "black"
        },
        "& ::placeholder": {
            color: "black"
        },
        "&:hover fieldset": {
            borderColor: "var(--palette-02)"
        },
        "&.Mui-focused fieldset": {
            borderColor: "black"
        }
    },
    position: error ? "relative" : "",
    animation: error ? "shake .1s linear" : "initial",
    animationIterationCount: error ? "3" : "initial",
    "@keyframes shake": {
        "0%": { left: "-5px" },
        "100%": { right: "-5px" }
    }
}));

const StyledTypo = styled(Typography)(({ theme }) => ({
    fontSize: "0.8rem"
}));

const ButtonBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0.5rem",
    gap: "0.5rem"
}));

const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: "8px 0 0 8px",
    color: "#fff",
    backgroundColor: "#4194CB"
}));

const IconGrid = styled(Grid)(({ theme }) => ({
    backgroundColor: "#fff",
    borderRadius: "8px 0 0 8px",
    height: "100%"
}));

const FormBox = styled(Box)(({ theme }) => ({
    width: "50%",
    backgroundColor: "#fff",
    padding: "6% 8%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
}));
