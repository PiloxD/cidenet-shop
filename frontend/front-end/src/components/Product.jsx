import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styled from "styled-components";
import React, { Component } from "react";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F5F3FF;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Image = styled.img`
  height: 50%;
  z-index: 2;
`;
const Price = styled.h3`
  position: absolute;
  top: 38px;
  justify-content: center;
  color: #23B001;

`;

const Name = styled.h2`
  position: absolute;
  top: 10px;
  justify-content: center;
  color: black;

`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Product = ({ products }) => {
  return (
    <Container key={products.id}>
      <Image src={products.imgURL} />
      <Info>
        <Name src={products.name}>{products.name}</Name>
        <Price src={products.price} >${products.price}</Price>
        <Icon>
          <OpenInNewIcon />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;

