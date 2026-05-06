import styled from 'styled-components'

interface ItemProps {
  $active?: boolean;
}

export const ContainerMenu = styled.div<ItemProps>`
  position: absolute;
  top: 0;
  left: 0;

  display: ${({ $active }) => ($active ? "block" : "none")};

  background: rgba(0.147, 0.004, 49.25);
  background-color: #0c0a09;

  width: 100%;
  height: 100%;

  color: white;

  .parent::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
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

  background-color: black;
  color: white;

`;

export const MenuItem = styled.li<ItemProps>`

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 16px;

  border: 1px solid white;

  background-color: black;
  color: white;

  &:hover {
    background-color: ${props => props.theme.palette.primary.contrastText};
    color: ${(props) => props.theme.palette.common.black};
  };

  background-color: ${({ $active, theme }) =>
    $active ? theme.palette.common.white : theme.palette.common.black};

  color: ${({ $active, theme }) =>
  $active ? theme.palette.common.black : theme.palette.common.white};
`;
