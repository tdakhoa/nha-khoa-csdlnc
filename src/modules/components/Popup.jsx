import * as React from "react";
import { useRouter } from "next/router";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useSnackbar } from "notistack";

import { Button } from "../../components";

const Popup = (props) => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const { content, snackbar, open, setOpen } = props;

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (link, title, variant) => {
        setOpen(false);
        if (link !== "") router.push(link);
        if (title !== "")
            enqueueSnackbar(title, {
                variant: variant,
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                }
            });
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{content.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{content.description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button bgcolor="gray" onClick={handleClose}>
                        Thoát
                    </Button>
                    <Button
                        bgcolor="secondary"
                        onClick={() => handleClick(content.link || "", snackbar.title || "", snackbar.variant)}>
                        Tiếp tục
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Popup;
