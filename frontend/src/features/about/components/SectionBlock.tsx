import { Box, Typography } from "@mui/material"


interface SectionBlockProps {
  title: string,
  subtitle: string,
  redirect?: string
}

export default function SectionBlock({
  title, subtitle, redirect
}: SectionBlockProps) {
  return (
    <Box component="section" sx={{ p: 2 }}>
      <Typography
        variant="h4"
        component="h1"
      > 
        {title}
      </Typography>

      { redirect ? ( 
        <Typography 
          variant="subtitle1"
          component="a"
          href={redirect}
          target="_blank"
          rel="noopener noreferrer"
        > 
          {subtitle}
        </Typography>
      ) : (
        <Typography 
          variant="subtitle1"
          component="span"
        > 
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}