import styled from 'styled-components'

export const ContainerMenu = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 8px;

  height: 64px;

  background-color: ${(props) => props.theme.palette.primary.light};
`;

export const ButtonIcon = styled.button`
  
  all: unset;
  cursor: pointer;
  display: inline-block;

  color: white;
  padding: 0 8px;

  &:hover {
    color: ${ (props) => props.theme.palette.primary.contrastText };
  }
`