import { useState } from "react";
import { styled, Box, Grid } from "@mui/material";
import { AccessTimeOutlined, CancelOutlined, SaveOutlined } from "@mui/icons-material";

import { Button, TextField, Typography } from "../components";
import ToggleDrawer from "./components/Drawer";
import TextEditor from "../components/Input/TextEditor";
import Popup from "./components/Popup";

const NewPost = () => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState({ title: "", description: "", link: "" });
    const [snackbar, setSnackbar] = useState({ title: "", variant: "default" });
    const [data, setData] = useState({ title: "", category: "", keyword: "", author: "" });

    const handleExit = () => {
        setOpen(true);
        setContent({
            title: "Bạn muốn tiếp tục không?",
            description: "Tiến trình của bạn sẽ không được lưu và sẽ mất vĩnh viễn.",
            link: "/admin/all-posts"
        });
    };
    const handleDraft = () => {
        setOpen(true);
        setContent({
            title: "Bạn muốn tiếp tục không?",
            description: "Bài viết này sẽ được lưu vào bản nháp để chỉnh sửa sau",
            link: "/admin/all-posts"
        });
        setSnackbar({
            title: "Đã lưu vào bản nháp",
            variant: "success"
        });
    };
    const handleSave = () => {
        setOpen(true);
        setContent({
            title: "Bạn muốn tiếp tục không?",
            description: "Bài viết này sẽ được lưu và đăng lên ngay lập tức",
            link: "/admin/all-posts"
        });
        setSnackbar({
            title: "Đã đăng",
            variant: "success"
        });
    };

    const handleChange = (e, i) => {
        if (i === 0) setData({ ...data, title: e.currentTarget.value });
        else if (i === 1) setData({ ...data, keyword: e.currentTarget.value });
        else if (i === 2) setData({ ...data, author: e.currentTarget.value });
    };

    return (
        <Root>
            <ToggleDrawer />
            <Box sx={{ padding: { xs: "5%", md: "2%" } }}>
                <Typography
                    size={{ lg: "h2", md: "h3" }}
                    weight="extraBold"
                    color="secondary"
                    format={{ lg: "left", md: "center" }}>
                    THÊM BÀI VIẾT
                </Typography>
                <InputContainer container spacing={{ xs: 0, md: 3 }} sx={{ mt: 2, gap: { xs: "1rem", md: 0 } }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Tiêu đề"
                            placeholder="Nhập tiêu đề bài viết"
                            value={data.title}
                            onChange={(e) => handleChange(e, 0)}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Từ khoá"
                            placeholder="Nhập các từ khoá của bài viết, mỗi từ khoá cách nhau một dấu phẩy, nhập tối đa 20 từ khoá "
                            numberOfRows={4}
                            value={data.keyword}
                            onChange={(e) => handleChange(e, 1)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextEditor label="Nội dung bài viết" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Tác giả"
                            placeholder="Nhập tác giả bài viết"
                            value={data.author}
                            onChange={(e) => handleChange(e, 2)}
                        />
                    </Grid>
                </InputContainer>
                <ButtonBox>
                    <Button
                        bgcolor="primary"
                        borderradius="10px"
                        endIcon={<SaveOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />}
                        onClick={handleSave}>
                        <Typography size="p">Lưu và đăng ngay</Typography>
                    </Button>
                    <Button
                        bgcolor="secondary"
                        borderradius="10px"
                        endIcon={<AccessTimeOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />}
                        onClick={handleDraft}>
                        <Typography size="p">Lưu thành bản nháp</Typography>
                    </Button>
                    <Button
                        bgcolor="gray"
                        borderradius="10px"
                        endIcon={<CancelOutlined sx={{ fontSize: "1.4rem", pl: "0.3rem" }} />}
                        onClick={handleExit}>
                        <Typography size="p">Huỷ và không lưu</Typography>
                    </Button>
                </ButtonBox>
            </Box>
            <Popup content={content} snackbar={snackbar} open={open} setOpen={setOpen} />
        </Root>
    );
};

export default NewPost;

const Root = styled(Box)(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("sm")]: {
        paddingBottom: "6rem"
    }
}));

const InputContainer = styled(Grid)(() => ({
    width: "100%",
    margin: 0
}));

const ButtonBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "end",
    gap: "2rem",
    marginTop: "2rem",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
        gap: "1rem"
    }
}));
