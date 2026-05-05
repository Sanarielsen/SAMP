import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { ButtonIcon, ContainerMenu } from '@/styles/HeaderMenuContainer';
import { Tooltip } from '@mui/material';

export default function HeaderMenu() {
  return (
    <ContainerMenu>
      <Tooltip title="Menu">
        <ButtonIcon>
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
    </ContainerMenu>
  )
}