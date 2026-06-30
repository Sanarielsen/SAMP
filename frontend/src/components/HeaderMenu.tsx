import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import {
  Popover, 
  Tooltip 
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

import { useAuth } from '@/auth/AuthProvider';
import MenuProfile from '@/components/MenuProfile';
import { 
  ButtonIcon, 
  ContainerHeader 
} from '@/styles/headerContainer';
import Menu from './Menu';

interface HeaderMenuProp {
  isMobile: boolean
}


export default function HeaderMenu({ isMobile }: HeaderMenuProp) {

  const { token } = useAuth()
  const navigate = useNavigate()

  const [active, setActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  if (!token) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <Menu open={active} isMobile={true} handleChangeStatus={() => setActive(false)} />
      <ContainerHeader>
        { isMobile && (
        <Tooltip title="Menu">
          <ButtonIcon onClick={ () => setActive(true) }>
            <MenuIcon color='inherit' />
          </ButtonIcon>
        </Tooltip>
        ) }
        <Tooltip title="Inicio SAMP">
          <ButtonIcon onClick={ () => navigate(`/inicio`) }>
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