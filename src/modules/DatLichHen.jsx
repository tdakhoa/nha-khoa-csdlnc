import { useState } from "react";
import { styled, Box, Grid, Avatar, DialogTitle, Dialog } from "@mui/material";
import { CancelOutlined, SaveOutlined } from "@mui/icons-material";

import ToggleDrawer from "./components/Drawer";
import { Button, TextField, Typography } from "../components";
import Popup from "./components/Popup";

const DatLichHen = () => {
    const [open, setOpen] = useState(false);
    const [render, setRender] = useState(false);
    const [data, setData] = useState(fetchData);
    const [content, setContent] = useState({ title: "", description: "", link: "" });
    const [snackbar, setSnackbar] = useState({ title: "", variant: "default" });

    const handleExit = () => {
        setOpen(true);
        setContent({
            title: "Bạn muốn tiếp tục không?",
            description: "Tiến trình của bạn sẽ không được lưu và sẽ mất vĩnh viễn.",
            link: "/quan-ly-cuoc-hen"
        });
    };
    const handleDraft = () => {
        setOpen(true);
        setContent({
            title: "Bạn chắc chắn chứ?",
            description: "Hãy kiểm tra lại mọi thông tin và chắc chắn không có sai sót.",
            link: "/quan-ly-cuoc-hen"
        });
        setSnackbar({
            title: "Đã lưu",
            variant: "success"
        });
    };

    const handleChange = (e, i) => {
        fetchData[i].value = e.currentTarget.value;
        setData(fetchData);
        setRender(!render);
    };

    return (
        <Root>
            <ToggleDrawer />
            <MainContainer>
                <Typography
                    size={{ lg: "h3", md: "h4" }}
                    weight="extraBold"
                    color="secondary"
                    format={{ lg: "left", md: "center" }}>
                    Đặt lịch hẹn
                </Typography>
                <InputContainer container spacing={3}>
                    {data.map((item, i) => (
                        <Grid item xs={12} sm={6} key={i}>
                            <TextField label={item.label} value={item.value} onChange={(e) => handleChange(e, i)} />
                        </Grid>
                    ))}
                </InputContainer>
                <ButtonBox sx={{ display: "flex" }}>
                    <Button
                        bgcolor="secondary"
                        borderradius="10px"
                        endIcon={<SaveOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />}
                        onClick={handleDraft}>
                        <Typography size="p">Đặt lịch hẹn</Typography>
                    </Button>
                    <Button
                        bgcolor="gray"
                        borderradius="10px"
                        endIcon={<CancelOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />}
                        onClick={handleExit}>
                        <Typography size="p">Huỷ lịch hẹn</Typography>
                    </Button>
                </ButtonBox>
            </MainContainer>
            <Popup content={content} snackbar={snackbar} open={open} setOpen={setOpen} />
        </Root>
    );
};

export default DatLichHen;

const fetchData = [
    { label: "Tên bệnh nhân", value: "Trần Khoa" },
    { label: "Nha sĩ", value: "Nguyễn Hoàng Phú" },
    { label: "Trợ khám", value: "Hoàng Văn Lân" },
    { label: "Phòng", value: "P001" },
    { label: "Thời gian", value: "14:00" },
    { label: "Tình trạng", value: "Cuộc hẹn mới" }
];

const Root = styled(Box)(({ theme }) => ({
    display: "flex",
    paddingBottom: "5%",
    [theme.breakpoints.down("sm")]: {
        paddingBottom: "7rem"
    }
}));

const InputContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
    marginLeft: "0",
    padding: "12px 16px",
    [theme.breakpoints.down("sm")]: {
        paddingLeft: 0
    }
}));

const ButtonBox = styled(Box)(({ theme }) => ({
    flexDirection: "row-reverse",
    justifyContent: "end",
    gap: "2rem",
    marginTop: "2rem",
    [theme.breakpoints.down("md")]: {
        marginTop: "1rem"
    },
    [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
        marginTop: "1rem"
    }
}));

const MainContainer = styled(Box)(({ theme }) => ({
    padding: "2%",
    [theme.breakpoints.down("sm")]: {
        padding: "5% 2%"
    }
}));
