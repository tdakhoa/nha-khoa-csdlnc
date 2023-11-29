import React from "react";
import { Box } from "@mui/material";

import Typography from "../Typography/Typography";
import TinyApp from "./TinyApp";

const TextField = ({ label = "", sx = {}, ...props }: TextFieldProps) => {
    return (
        <Box sx={{ ...sx }} {...props}>
            <Typography size="p" weight="bold" sx={{ marginBottom: "0.8rem" }}>
                {label}
            </Typography>
            <TinyApp />
        </Box>
    );
};

export default TextField;

interface TextFieldProps {
    label?: string;
    sx?: object;
    children?: React.ReactNode;
}
