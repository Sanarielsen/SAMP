import { IconButton } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ToastContainer from "@/components/Toast";
import { useState } from "react";


type CopyButtonProps = {
  value: string;
};

export function CopyButton({
  value,
}: CopyButtonProps) {
  const [toast, setToast] = useState(false);

  async function handleCopy() {
    setToast(true)
    await navigator.clipboard.writeText(value);
  }

  return (
    <>
      <IconButton onClick={handleCopy}>
        <ContentCopyIcon fontSize="large" />
      </IconButton>

      <ToastContainer
        open={toast}
        message={"Endereco copiado."}
        severity="success"
        onClose={() => setToast(false)}
      />
    </>
    
  );
}