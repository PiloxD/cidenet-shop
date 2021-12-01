import styled from "styled-components";
import { mobile } from "../responsive";
import CopyrightIcon from '@mui/icons-material/Copyright';

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Title = styled.h1`
  font-size: 25px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-weight: 500;
`;
const Desc = styled.p`
  margin: 50px 20px;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 3px;
`;



const Footer = () => {
  return (
    <Container>
      <Title> <Desc>Todos los derechos reservados    </Desc>
        Copyright <CopyrightIcon/></Title>
    </Container>
  );
};

export default Footer;
