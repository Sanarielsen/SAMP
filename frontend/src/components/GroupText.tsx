import { 
  IconButton, 
  Stack, 
  Tooltip, 
  Typography 
} from "@mui/material"

import InfoIcon from '@mui/icons-material/Info';


interface GroupTextProps {
  title: string,
  value: string,
  observation?: string | null
}

export default function GroupText({
  title, value, observation
}: GroupTextProps) {
  return (
    <>
      <Stack spacing={0.5}
        sx={{
          display: 'flex',
          alignItems: 'left'
        }}
      >
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {title}
          </Typography>
          {observation && (
            <Tooltip 
              title={observation}
              placement="right"
              arrow
              enterTouchDelay={0}
              leaveTouchDelay={3000}  
            >
              <IconButton size="small">
                <InfoIcon sx={{fontSize: 16}}
                />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Stack>

      <Typography>
        {value}
      </Typography>
    </>
  )
}