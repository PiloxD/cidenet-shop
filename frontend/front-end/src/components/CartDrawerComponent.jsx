import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import styled from "styled-components";
import { mobile } from "../responsive";
import CartItem from "./CartItem";
import axios from 'axios';
import { ShoppingCartOutlined } from "@material-ui/icons";
import SummaryCart from './SummaryCart';
import DialogAddress from './DialogAddress';
import { useState, useEffect } from 'react';



const Container = styled.div`
  ${mobile({ flexDirection: "column" })}
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
  ${mobile({ flexDirection: "column" })}


`;
const Botones = styled.div`
flex-direction: row-reverse;
margin: 20px;
align-items: center;
justify-content: center;
display: flex;
`;

const CartButtonH3 = styled.h3`
  color: black;

`;
const ButtonMUI = styled(Button)`
  color: white;
  align-items: center;
justify-content: center;
`;

export default function CartDrawer() {
  const [productsCart, setProductsCart] = React.useState([])
  const emailUser = window.localStorage.getItem('loggedAppUser')
  const email = JSON.parse(emailUser)
  const [state, setState] = React.useState({
    right: false,
  });


  const getProductsCart = async () => {
    try {
      const url = `http://localhost:8080/api/cart/productsCart1/byname/${email.email}`;
      const res = await axios.get(url);
      setProductsCart(res.data);

    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getProductsCart();
  }, []);

  window.localStorage.setItem('cartQuantity', productsCart.length)

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 900 }}
      role='dialog'
      onClick={toggleDrawer(anchor, false)}
    >
      {/* Productos en el carrito */}
      <List>
        <Container>
          <Wrapper>
            <Botones >
              <DialogAddress />
              <ButtonMUI variant="outlined"  > <CartButtonH3>Cerrar</CartButtonH3></ButtonMUI>
            </Botones>
          </Wrapper>
        </Container>
      </List>
    </Box>
  );
  return (
    <Container>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button style={{ color: "black" }} onClick={toggleDrawer(anchor, true)}> <ShoppingCartOutlined /> </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            variant='persistent'
          >
            <Title>Tu carrito de compras</Title>
            <Bottom>
              <Info>
                {productsCart.map((cart) => (
                  <CartItem getProductsCart={getProductsCart} cart={cart} key={cart._id} />
                ))}
              </Info>
              <div>
                <SummaryCart productsCart={productsCart} />
              </div>

            </Bottom>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </Container>
  );
}