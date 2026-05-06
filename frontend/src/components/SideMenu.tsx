import { useState } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CloseIcon from '@mui/icons-material/Close';
import HotelClassIcon from '@mui/icons-material/HotelClass';
import InfoIcon from '@mui/icons-material/Info';

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

  const [active, setActive] = useState("clients");

  console.log("Menu: ", open)

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
          $active={active === "clients"}
          onClick={() => setActive("clients")}
        >
          <ApartmentIcon />
          <span> Clientes </span>
        </MenuItem>
        <MenuItem
          $active={active === "representantes"}
          onClick={() => setActive("representantes")}
        >
          <HotelClassIcon />
          <span> Representantes </span>
        </MenuItem>
        <MenuItem
          $active={active === "about"}
          onClick={() => setActive("about")}
        >
          <InfoIcon />
          <span> Sobre </span>
        </MenuItem>
      </NavBody>
    </ContainerMenu>
  )
}