import { Badge } from "@material-ui/core";
import { ExitToApp, Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import  ExitToAppIcon  from  '@mui/icons-material/ExitToApp';
import { Link }  from 'react-router-dom';


const Container = styled.div`
  height: 80px;
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
  padding-left: 5px;

`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  border-radius: 5px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
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

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <NavLink to="/">
          <Logo>Cidenet Shop</Logo>
          </NavLink>
          
          
        </Left>
        <Right>
          <SearchContainer>
            <Input placeholder="Buscar" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
          <NavLink to="/Products1" >
          <MenuItem><h3>Hombre</h3></MenuItem>
          </NavLink>
          <NavLink to="/Products2">
          <MenuItem><h3>Mujer</h3></MenuItem>
          </NavLink>
          <NavLink to= "/Cart">
          <MenuItem>
            <Badge badgeContent={0} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </NavLink>
          <MenuItem>
          <NavLink to="/Login"   >
            <ExitToAppIcon/>
          </NavLink>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
