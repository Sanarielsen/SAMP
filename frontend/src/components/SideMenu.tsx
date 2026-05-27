import { useNavigate, useLocation } from "react-router";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CloseIcon from '@mui/icons-material/Close';
import HotelClassIcon from '@mui/icons-material/HotelClass';
import InfoIcon from '@mui/icons-material/Info';
import AllInboxIcon from '@mui/icons-material/AllInbox';

import { 
  ContainerMenu,
  MenuItem,
  NavBody,
  NavClose,
  NavHeader 
} from "@/styles/menuContainer";

interface SideMenuProps {
  open: boolean;
  handleChangeStatus: () => void;
}

export default function SideMenu({ open, handleChangeStatus }: SideMenuProps) {

  const location = useLocation();
  const navigate = useNavigate();

  function handleChangePage(targetPage: string) {
    navigate(targetPage);
    handleChangeStatus();
  }

  return (
    <ContainerMenu $active={open}>
      <NavClose onClick={ () => handleChangeStatus() }>
        <CloseIcon />
      </NavClose>
      <NavHeader>
        <AccountCircleIcon color='inherit' fontSize='large' />
        <p> Seja bem-vindo, Samuel Henrique </p>
      </NavHeader>
      <NavBody>
        <MenuItem
          $active={location.pathname === "/clientes"}
          onClick={() => handleChangePage("/clientes")}
        >
          <ApartmentIcon />
          <span> Clientes </span>
        </MenuItem>
        <MenuItem
          $active={location.pathname === "/representantes"}
          onClick={() => handleChangePage("/representantes")}
        >
          <HotelClassIcon />
          <span> Representantes </span>
        </MenuItem>
        <MenuItem
          $active={location.pathname === "/oss"}
          onClick={() => handleChangePage("/oss")}
        >
          <AllInboxIcon />
          <span> O.S </span>
        </MenuItem>
        <MenuItem
          $active={location.pathname === "/sobre"}
          onClick={() => handleChangePage("/sobre")}
        >
          <InfoIcon />
          <span> Sobre </span>
        </MenuItem>
      </NavBody>
    </ContainerMenu>
  )
}