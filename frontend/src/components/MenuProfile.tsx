import { useNavigate } from 'react-router';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ContactPageIcon from '@mui/icons-material/ContactPage';

export default function MenuProfile() {

  const navigate = useNavigate();

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem onClick={() => navigate('/perfil')}>
          <ListItemIcon>
            <ContactPageIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Perfil</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate('/admin/variaveis')}>
          <ListItemIcon>
            <FormatListBulletedAddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Gerenciar variaveis</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigate('/admin/usuarios')}>
          <ListItemIcon>
            <PeopleAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Gerenciar usuários</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => console.log("Deslogar da aplicacao")}>
          <ListItemIcon>
            <PowerSettingsNewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}