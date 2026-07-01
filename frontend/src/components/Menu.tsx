import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import HotelClassIcon from '@mui/icons-material/HotelClass';
import InfoIcon from '@mui/icons-material/Info';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { 
  ContainerMenu,
  MenuItem,
  NavBody,
  NavClose,
  NavHeader 
} from "@/styles/menuContainer";


interface MenuProps {
  open: boolean
  isMobile: boolean
  handleChangeStatus: () => void
}

export default function Menu({
  open, isMobile, handleChangeStatus
}: MenuProps) {

  const location = useLocation();
  const navigate = useNavigate();
  const [openProcessos, setOpenProcessos] = useState(false);

  function handleChangePage(targetPage: string) {
    navigate(targetPage);
    handleChangeStatus();
  }

  return (
    <ContainerMenu $active={open}>
      { isMobile && (
        <NavClose onClick={ () => handleChangeStatus() }>
          <CloseIcon />
        </NavClose>
      )}
      <NavHeader>
        <AccountCircleIcon color='inherit' fontSize='large' />
        <p> Seja bem-vindo, Samuel Henrique </p>
      </NavHeader>
      <NavBody>
        <MenuItem
          $active={location.pathname.startsWith("/inicio")}
          onClick={() => handleChangePage("/inicio")}
        >
          <HomeIcon />
          <span> Inicio </span>
        </MenuItem>
        <MenuItem
          $active={location.pathname.startsWith("/cliente")}
          onClick={() => handleChangePage("/clientes")}
        >
          <ApartmentIcon />
          <span> Clientes </span>
        </MenuItem>
        <MenuItem
          $active={location.pathname.startsWith("/representante")}
          onClick={() => handleChangePage("/representantes")}
        >
          <HotelClassIcon />
          <span> Representantes </span>
        </MenuItem>
        <MenuItem
          $active={location.pathname.startsWith("/os")}
          onClick={() => handleChangePage("/oss")}
        >
          <AllInboxIcon />
          <span> O.S </span>
        </MenuItem>

        <MenuItem
          $active={
            location.pathname.startsWith("/processo") ||
            location.pathname.startsWith("/processos")
          }
          onClick={() => setOpenProcessos(v => !v)}
          style={{ justifyContent: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <InsertDriveFileIcon />
            <span> Processos </span>
          </div>
          {openProcessos ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </MenuItem>

        {openProcessos && (
          <>
            <MenuItem
              $active={location.pathname == "/processos/publicacoes"}
              onClick={() => handleChangePage("/processos/publicacoes")}
              style={{ paddingLeft: 32 }}
            >
              <span>Lista de publicações</span>
            </MenuItem>

            <MenuItem
              $active={location.pathname == "/processos/importados"}
              onClick={() => handleChangePage("/processos/importados")}
              style={{ paddingLeft: 32 }}
            >
              <span>Processos importados</span>
            </MenuItem>

            <MenuItem
              $active={location.pathname == "/processos/revistas"}
              onClick={() => handleChangePage("/processos/revistas")}
              style={{ paddingLeft: 32 }}
            >
              <span>Revistas importadas</span>
            </MenuItem>
          </>
        )}

        <MenuItem
          $active={location.pathname.startsWith("/sobre")}
          onClick={() => handleChangePage("/sobre")}
        >
          <InfoIcon />
          <span> Sobre </span>
        </MenuItem>
      </NavBody>
    </ContainerMenu>
  )
}
// ...existing code...