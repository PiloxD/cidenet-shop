import styled from "styled-components";
import OutstandingProducts from "./OutstandingProducts";
import axios from "axios";
import React, { Component } from "react";
import { mobile } from "../responsive";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const OutstandingContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
`;
const Wrapper = styled.div`

`;

const Title = styled.h3`
  font-size: 30px;
  font-weight: 700;
`;


export default class Outstanding extends Component {
  constructor() {
    super()
  }
  state = {
    products: []
  }
  getProducts() {
    axios.get(`http://localhost:8080/api/products/products1`)
      .then(res => {
        const products = res.data;
        const limit = 6;
        var view = products;
        view.sort((a,b)=> {
          if (a.views < b.views) {
            return  1;
          }
          if (a.views > b.views) {
            return -1;
          }
          return 0;
        } ); 
        this.setState({ 
          products: view.slice(0,limit) });
      })
  }
  componentDidMount() {
    this.getProducts()
  };

  render() {
    return (
      <Container>
        <Wrapper>
          <Title>
            Estos son los productos más buscados:
          </Title>
          <OutstandingContainer>
          {this.state.products.map((products) => (
            <OutstandingProducts products={products} key={products._id} />
          ))}
        </OutstandingContainer>
        </Wrapper>
        
      </Container>
    );
  };
}
