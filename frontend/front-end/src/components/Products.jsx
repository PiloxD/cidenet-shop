import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { mobile } from "../responsive";
import React, { Component } from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const ProductsContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    
`;
const Filter = styled.div`
  flex: 1;
  margin: 5px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 10px;
  font-weight: 600;
  margin-right: 20px;
  align-items: center;
  justify-content: center;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 1px;
  margin-right: 20px;
  border-radius: 10px;
  border-color: white;
  margin: 50px 0px;
  font-size: 45px;
  font-weight: 500;
  letter-spacing: 3px;
  align-items: center;
  justify-content: center;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option`
  margin: 40px 0px;
  font-size: 25px;
  font-weight: 500;
  letter-spacing: 3px;
  align-items: center;
  justify-content: center;
`;

export default class Products extends Component {
  constructor() {
    super()
    this.state.gender = 'todos';
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }
  state = {
    products: [],
    gender: ''

  }
  handleDropdownChange(e) {
    this.state.gender = e.target.value;
    this.getProducts();
  }

  getProducts() {
    if (this.state.gender === null || this.state.gender === '' || this.state.gender === 'todos') {
      axios.get(`http://localhost:8080/api/products/products1`)
        .then(res => {
          const products = res.data;
          console.log(res)
          this.setState({ products: products });
        })
    } else {
      axios.get(`http://localhost:8080/api/products/gender/${this.state.gender}`)
        .then(res => {
          const products = res.data;
          console.log(res)
          this.setState({ products: products });
        })
    }
  }
  componentDidMount() {
    this.getProducts()
  };

  render() {
    return (
      <Container>
        <Filter>
          <FilterText>
            <Select onChange={this.handleDropdownChange}>
              <Option value='todos'  > Todos </Option>
              <Option value='hombre'  > Hombre </Option>
              <Option value='mujer' > Mujer </Option>
            </Select>
          </FilterText>
        </Filter>
        <ProductsContainer>
          {this.state.products.map((products) => (
            <Product products={products} key={products.id} />
          ))}
        </ProductsContainer>
      </Container>
    );
  };
}
