import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { ButtonIcon, ContainerHeader } from '@/styles/headerContainer';
import { Tooltip } from '@mui/material';
import SideMenu from './SideMenu';

export default function HeaderMenu() {

  const [active, setActive] = useState(false);

  return (
    <>
      <SideMenu open={active} handleChangeStatus={() => setActive(false)} />
      <ContainerHeader>
        <Tooltip title="Menu">
          <ButtonIcon onClick={ () => setActive(true) }>
            <MenuIcon color='inherit' />
          </ButtonIcon>
        </Tooltip>
        <Tooltip title="Inicio SAMP">
          <ButtonIcon>
            <img src="/samp_logo_white.svg" width="48" height="48" />
          </ButtonIcon>
        </Tooltip>
        <Tooltip title="Perfil">
          <ButtonIcon>
            <AccountCircleIcon color='inherit' fontSize='large' />
          </ButtonIcon>
        </Tooltip>
      </ContainerHeader>
    </>
  )
}