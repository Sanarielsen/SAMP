import { Typography } from "@mui/material"

import { formatStringToVisualDate } from "@/utils/fomartToVisualDate"


interface GroupTextDateProps {
  title: string,
  value: string | Date,
  observation?: string | null
}

export default function GroupTextDate({
  title, value, observation
}: GroupTextDateProps) {
  return (
    <>
      <Typography variant="caption">
        {title}
      </Typography>

      <Typography>
        {formatStringToVisualDate(value)}
      </Typography>

      {observation && (
        <Typography
          variant="caption"
          color="text.secondary"
        >
          {observation}
        </Typography>
      )}
    </>
  )
}