import { Box, Container } from "@mui/material";
// @ts-ignore
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  backgroundImage?: string;
  noBackground?: boolean;
}

export default function Layout({
  children,
  backgroundImage = "/default-bg.jpg",
  noBackground = false,
}: LayoutProps) {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Background Image Layer */}
      {!noBackground && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(1px)", // blur amount
            transform: "scale(1.05)", // prevents edge blur gaps
            zIndex: 0,
          }}
        />
      )}

      {/* Dark Gradient Overlay */}
      {!noBackground && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
            zIndex: 1,
          }}
        />
      )}

      {/* Main Content */}
      <Container sx={{ flex: 1, py: 4, position: "relative", zIndex: 2, display: "flex", justifyContent: "center" }}>
        {children}
      </Container>
    </Box>
  );
}
