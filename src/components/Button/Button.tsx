import React from "react";
import { styled, Button as MuiButton } from "@mui/material";

const Button = ({
    onClick,
    bgcolor = "primary",
    borderradius = "30px",
    disabled,
    children,
    startIcon,
    endIcon,
    sx = {},
    ...props
}: ButtonProps) => {
    return (
        <MyButton
            bgcolor={bgcolor}
            borderradius={borderradius}
            disabled={disabled}
            sx={sx}
            onClick={onClick}
            {...props}>
            {startIcon}
            {children}
            {endIcon}
        </MyButton>
    );
};

export default Button;

interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    bgcolor: string;
    borderradius?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    sx?: object;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
}

const MyButton = styled(MuiButton)((props: ButtonProps) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: props.borderradius,
    cursor: "pointer",
    padding: "0.5rem 1rem",
    minWidth: "0",
    color: "white",
    textTransform: "initial",
    backgroundColor:
        props.bgcolor === "primary"
            ? "var(--palette-01)"
            : props.bgcolor === "secondary"
            ? "var(--palette-02)"
            : props.bgcolor === "white"
            ? "var(--palette-06)"
            : props.bgcolor,
    border: "2px solid transparent",
    fontFamily: "Nunito",
    "&:hover": {
        backgroundColor: "transparent",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor:
            props.bgcolor === "primary"
                ? "var(--palette-01)"
                : props.bgcolor === "secondary"
                ? "var(--palette-02)"
                : props.bgcolor === "white"
                ? "var(--palette-06)"
                : props.bgcolor,
        color:
            props.bgcolor === "primary"
                ? "var(--palette-01)"
                : props.bgcolor === "secondary"
                ? "var(--palette-02)"
                : props.bgcolor === "white"
                ? "var(--palette-06)"
                : props.bgcolor
    }
}));
