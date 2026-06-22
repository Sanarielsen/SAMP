import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import { useTheme, useMediaQuery } from "@mui/material";

export default function ViewportBadge() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const theme = useTheme();

  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const xl = useMediaQuery(theme.breakpoints.only("xl"));

  useEffect(() => {
    const update = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  if (
    import.meta.env.PROD ||
    !import.meta.env.VITE_SHOW_VIEWPORT_BADGE
  ) {
    return null;
  }

  const breakpoint =
    xs ? "xs" :
    sm ? "sm" :
    md ? "md" :
    lg ? "lg" :
    xl ? "xl" :
    "unknown";

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        px: 1.5,
        py: 0.75,
        borderRadius: 1,
        bgcolor: "grey.900",
        color: "common.white",
        fontSize: 12,
        fontFamily: "monospace",
        zIndex: 99999,
        pointerEvents: "none",
        opacity: 0.85,
      }}
    >
      {size.width} × {size.height} ({breakpoint})
    </Box>
  );
}