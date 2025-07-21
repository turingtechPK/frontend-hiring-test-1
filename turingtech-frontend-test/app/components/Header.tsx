import Image from "next/image";
import { Box, Typography } from "@mui/material";
import UserDetails from "./UserDetails";

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #6366f1 50%, #8b5cf6 75%, #a855f7 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "12px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.05)",
        backdropFilter: "blur(20px)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
          animation: "shimmer 3s ease-in-out infinite",
        },
        "@keyframes shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 12px",
          borderRadius: "10px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          marginRight: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          minHeight: "40px",
        }}
      >
        <Image
          src="/TT-Logo.png"
          alt="Turing Technologies"
          width={250}
          height={24}
          style={{ 
            filter: "brightness(0) invert(1)",
            objectFit: "contain",
            maxWidth: "100%",
            height: "auto"
          }}
        />
      </Box>

      <UserDetails />
    </Box>
  );
}
