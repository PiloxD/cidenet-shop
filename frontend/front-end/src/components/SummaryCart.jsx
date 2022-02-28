import React, { useState, useEffect, Component, useContext } from "react";
import styled from "styled-components";

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 20vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.h4``;

const SummaryCart = ({ productsCart }) => {

  let total = 0;

  productsCart.forEach(element => {
    total += (element.price * element.stock);
    window.localStorage.setItem('total', JSON.stringify(total))
  });

  return (
    <Summary>
      <SummaryTitle>Resumen de compra</SummaryTitle>
      <SummaryItem type="total">
        <SummaryItemText>Total:
          <SummaryItemPrice> $ {total}</SummaryItemPrice>
        </SummaryItemText>
      </SummaryItem>
    </Summary>
  )
}

export default SummaryCart;