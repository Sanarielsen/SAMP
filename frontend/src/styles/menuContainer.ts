import styled from 'styled-components'


interface ItemProps {
  $active?: boolean;
}

export const ContainerMenu = styled.div<ItemProps>`
  
  display: ${({ $active }) => ($active ? "block" : "none")};
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: white;

  width: 100%;
  height: 100%;

  /* Desktop */
  position: relative;

  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md - 1}px) {
      position: fixed;
      inset: 0;
      z-index: 999;
    }
  `}
`;

export const NavClose = styled.div`

  padding: 16px;
`

export const NavHeader = styled.div`

  padding: 16px;
  text-align: center;

  & > * {
    margin: 16px;
  }
`

export const NavBody = styled.ul`

  display: flex;
  flex-direction: column;

  padding: 16px 0;
`;

export const MenuItem = styled.li<ItemProps>`

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 16px;

  border: 1px solid white;

  background-color: ${props => props.theme.palette.primary.light};
  color: white;

  &:hover {
    background-color: ${props => props.theme.palette.primary.contrastText};
    color: ${(props) => props.theme.palette.common.black};
  };

  background-color: ${({ $active, theme }) =>
    $active ? theme.palette.common.white : theme.palette.primary.light};

  color: ${({ $active, theme }) =>
  $active ? theme.palette.common.black : theme.palette.common.white};
`;
