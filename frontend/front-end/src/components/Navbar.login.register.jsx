import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom';


const Container = styled.div`
  height: 80px;
  background: white;
  ${mobile({ height: "70px" })}
`;
const NavLink = styled(Link)`
  text-decoration:none;
  color: black;
  ${mobile({ height: "70px" })}
 
  
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
 
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

`;


const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Navbar2 = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <NavLink to="/">
            <Logo>Cidenet Shop</Logo>
          </NavLink>
        </Left>
        <Right>
          <MenuItem>
            <NavLink to="/Login" > 
              <h3>Autenticarse</h3>
            </NavLink>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};
export default Navbar2;
