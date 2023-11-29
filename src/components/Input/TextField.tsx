import React, { ChangeEventHandler } from "react";
import { TextField as MuiTextField, Box, styled } from "@mui/material";

import Typography from "../Typography/Typography";

const TextField = ({
    label = "",
    placeholder = "",
    value = "",
    numberOfRows = 1,
    sx = {},
    disabled,
    children,
    endIcon,
    onChange,
    ...props
}: TextFieldProps) => {
    return (
        <Box sx={{ ...sx }} {...props}>
            <Typography size="p" weight="bold" sx={{ marginBottom: "0.8rem" }}>
                {label}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <MyTextField
                    hiddenLabel
                    placeholder={placeholder}
                    variant="filled"
                    fullWidth
                    multiline={numberOfRows > 1}
                    maxRows={numberOfRows}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                />
                {endIcon}
            </Box>
            {children}
        </Box>
    );
};

export default TextField;

interface TextFieldProps {
    label?: string;
    placeholder?: string;
    value?: string;
    numberOfRows?: number;
    sx?: object;
    children?: React.ReactNode;
    disabled?: boolean;
    endIcon?: JSX.Element;
    onChange?: ChangeEventHandler;
}

const MyTextField = styled(MuiTextField)(() => ({
    "& .MuiFilledInput-root": {
        borderRadius: 10,
        fontFamily: "'Nunito', san-serif",
        padding: "auto 0.6rem",
        "&:before": {
            border: "none !important"
        },
        "&::after": {
            border: "none !important"
        }
    }
}));
