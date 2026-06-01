import { useState } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Popover, Tooltip } from '@mui/material';

import { ButtonIcon, ContainerHeader } from '@/styles/headerContainer';
import SideMenu from '@/components/SideMenu';
import MenuProfile from './MenuProfile';


export default function HeaderMenu() {

  const [active, setActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

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
          <ButtonIcon onClick={handleProfileClick}>
            <AccountCircleIcon color='inherit' fontSize='large' />
          </ButtonIcon>
        </Tooltip>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleProfileClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuProfile />
        </Popover>
      </ContainerHeader>
    </>
  )
}
