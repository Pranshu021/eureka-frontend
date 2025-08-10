// src/pages/NotFound.tsx
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Box>
        <Typography variant="h2">Oops! 404 PAGE NOT FOUND!</Typography>
    </Box>
  );
}
