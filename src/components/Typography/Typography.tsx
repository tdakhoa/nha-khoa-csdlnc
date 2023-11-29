import React from "react";
import { styled, Typography as MuiTypography } from "@mui/material";

const StyledTypography = styled(MuiTypography)<TypographyProps>(
    ({ theme, color, size, weight, transform, format }) => ({
        margin: 0,
        textTransform: transform === "uppercase" ? "uppercase" : "none",
        color: color === "primary" ? "var(--palette-01)" : color === "secondary" ? "var(--palette-02)" : color,
        fontSize:
            size?.lg === "h1"
                ? "var(--text-h1)"
                : size?.lg === "h2"
                ? "var(--text-h2)"
                : size?.lg === "h3"
                ? "var(--text-h3)"
                : size?.lg === "h4"
                ? "var(--text-h4)"
                : size?.lg === "h5"
                ? "var(--text-h5)"
                : size?.lg === "h6"
                ? "var(--text-h6)"
                : size?.lg === "p"
                ? "var(--text-para)"
                : size?.lg === "small"
                ? "var(--text-small)"
                : size?.lg === "tiny"
                ? "var(--text-tiny)"
                : size?.lg,
        fontWeight:
            weight?.lg === "extraBold"
                ? 800
                : weight?.lg === "bold"
                ? 700
                : weight?.lg === "semiBold"
                ? 600
                : weight?.lg === "medium"
                ? 500
                : weight?.lg === "regular"
                ? 400
                : weight?.lg === "light"
                ? 300
                : 300,
        textAlign:
            format?.lg == "left"
                ? "left"
                : format?.lg == "center"
                ? "center"
                : format?.lg == "right"
                ? "right"
                : format?.lg == "justify"
                ? "justify"
                : "inherit",
        [theme.breakpoints.down("lg")]: {
            fontSize:
                size?.md === "h1"
                    ? "var(--text-h1)"
                    : size?.md === "h2"
                    ? "var(--text-h2)"
                    : size?.md === "h3"
                    ? "var(--text-h3)"
                    : size?.md === "h4"
                    ? "var(--text-h4)"
                    : size?.md === "h5"
                    ? "var(--text-h5)"
                    : size?.md === "h6"
                    ? "var(--text-h6)"
                    : size?.md === "p"
                    ? "var(--text-para)"
                    : size?.md === "small"
                    ? "var(--text-small)"
                    : size?.md === "tiny"
                    ? "var(--text-tiny)"
                    : "inherit",
            fontWeight:
                weight?.md === "extraBold"
                    ? 800
                    : weight?.md === "bold"
                    ? 700
                    : weight?.md === "semiBold"
                    ? 600
                    : weight?.md === "medium"
                    ? 500
                    : weight?.md === "regular"
                    ? 400
                    : weight?.md === "light"
                    ? 300
                    : "inherit",
            textAlign:
                format?.md == "left"
                    ? "left"
                    : format?.md == "center"
                    ? "center"
                    : format?.md == "right"
                    ? "right"
                    : format?.md == "justify"
                    ? "justify"
                    : "inherit"
        },
        [theme.breakpoints.down("md")]: {
            fontSize:
                size?.xs === "h1"
                    ? "var(--text-h1)"
                    : size?.xs === "h2"
                    ? "var(--text-h2)"
                    : size?.xs === "h3"
                    ? "var(--text-h3)"
                    : size?.xs === "h4"
                    ? "var(--text-h4)"
                    : size?.xs === "h5"
                    ? "var(--text-h5)"
                    : size?.xs === "h6"
                    ? "var(--text-h6)"
                    : size?.xs === "p"
                    ? "var(--text-para)"
                    : size?.xs === "small"
                    ? "var(--text-small)"
                    : size?.xs === "tiny"
                    ? "var(--text-tiny)"
                    : "inherit",
            fontWeight:
                weight?.xs === "extraBold"
                    ? 800
                    : weight?.xs === "bold"
                    ? 700
                    : weight?.xs === "semiBold"
                    ? 600
                    : weight?.xs === "medium"
                    ? 500
                    : weight?.xs === "regular"
                    ? 400
                    : weight?.xs === "light"
                    ? 300
                    : "inherit",
            textAlign:
                format?.xs == "left"
                    ? "left"
                    : format?.xs == "center"
                    ? "center"
                    : format?.xs == "right"
                    ? "right"
                    : format?.xs == "justify"
                    ? "justify"
                    : "inherit"
        }
    })
);

interface Devices {
    xs?: string;
    md?: string;
    lg?: string;
}
interface TypographyProps {
    component?: string;
    color?: string;
    size?: Devices;
    weight?: Devices;
    transform?: string;
    format?: Devices;
    sx?: object;
    children: React.ReactNode;
}

interface InputProps {
    component?: string;
    color?: string;
    size?: Devices | string;
    weight?: Devices | string;
    transform?: string;
    format?: Devices | string;
    sx?: object;
    children: React.ReactNode;
}

const Typography = ({
    component = "p",
    color = "inherit",
    size,
    weight,
    transform = "none",
    format,
    sx = {},
    children,
    ...props
}: InputProps) => {
    if (typeof weight === "string") weight = { lg: weight, md: weight, xs: weight };
    else
        weight = {
            lg: weight?.lg || "regular",
            md: weight?.md || weight?.lg,
            xs: weight?.xs || weight?.md || weight?.lg
        };
    if (typeof size === "string") size = { lg: size, md: size, xs: size };
    else size = { lg: size?.lg || "p", md: size?.md || size?.lg, xs: size?.xs || size?.md || size?.lg };
    if (typeof format === "string") format = { lg: format, md: format, xs: format };
    else
        format = {
            lg: format?.lg || "inherit",
            md: format?.md || format?.lg,
            xs: format?.xs || format?.md || format?.lg
        };
    return (
        <StyledTypography
            component={component}
            color={color}
            size={size}
            weight={weight}
            transform={transform}
            format={format}
            sx={sx}
            {...props}>
            {children}
        </StyledTypography>
    );
};

export default Typography;
