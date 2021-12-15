import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link }  from 'react-router-dom';


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
 
  
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


const Navbar2 = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <NavLink to="/Login">
            <Logo>Cidenet Shop</Logo>
          </NavLink>
        </Left>
      </Wrapper>
    </Container>
  );
};

export default Navbar2;
