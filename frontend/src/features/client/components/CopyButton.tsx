import { IconButton } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type CopyButtonProps = {
  value: string;
};

export function CopyButton({
  value,
}: CopyButtonProps) {
  async function handleCopy() {
    await navigator.clipboard.writeText(value);
  }

  return (
    <IconButton onClick={handleCopy}>
      <ContentCopyIcon fontSize="large" />
    </IconButton>
  );
}