import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom';
import CartDrawerComponent from './CartDrawerComponent';
import Header from "./Header";
import { useState } from "react";

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
  padding-left: 5px;
  ${mobile({ flex: 2, justifyContent: "center" })}
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
  const [] = useState(0)
  const cartQuantity = window.localStorage.getItem('cartQuantity')
  const quantity = JSON.parse(cartQuantity)
  return (
    <Container>
      <Wrapper>
        <Left>
          <MenuItem>
            <NavLink to="/">
              <Logo>Cidenet Shop</Logo>
            </NavLink>
          </MenuItem>
        </Left>
        <Right>
          <MenuItem>
            <NavLink to="/Products1" >
              <h3>Productos</h3>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <CartDrawerComponent >
                <ShoppingCartOutlined />
              </CartDrawerComponent>
            </Badge>
          </MenuItem>
          <MenuItem>
            <Header></Header>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
