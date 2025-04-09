import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
interface ButtonProps {
  type?: "button" | "reset" | "submit";
  children: React.ReactNode; // The children can be any valid React node (text, elements, etc.)
  onClick?: () => void; // Optional onClick handler
  className?: string; // Optional custom class names
  variant?: "text" | "outlined" | "contained"; // Optional variant property
  startIcon?: React.ReactNode; // Optional start icon
}
const CustomButton: React.FC<ButtonProps> = ({
  type,
  children,
  onClick,
  className,
  variant,
  startIcon,
}) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        type={type}
        onClick={onClick}
        variant={variant || "contained"}
        className={className}
        startIcon={startIcon}
      >
        {children}
      </Button>
    </Stack>
  );
};

export default CustomButton;
