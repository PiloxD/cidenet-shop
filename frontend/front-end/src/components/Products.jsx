import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { mobile } from "../responsive";
import React, { Component } from "react";
import { Search } from "@material-ui/icons";
import { Divider } from "@material-ui/core";

const FilterContainer = styled.div`
flex: 1;
margin: 10px;
height: 300px;
flex-direction: column;
display: flex;
width: 100%;
min-width: 100%;
align-items: center;
justify-content: center;
${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
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
  font-size: 30px;
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
const SearchDiv = styled.div`
  display: inline-flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 25px;
  border-radius: 5px;
  padding: 5px;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  padding: 10px;
  margin: 5px 5px 5px 5px;
  border-radius: 5px;
  ${mobile({ width: "50px" })}
`;

export default class Products extends Component {
  constructor() {
    super()
    this.state.gender = 'todos';
    this.state.sizef = 'todos';
    this.state.colorf = 'todos';
    this.state.search = '';
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }
  state = {
    products: [],
    stock: [],
    gender: '',
    sizef: '',
    colorf: '',
    search: ''

  }


  handleDropdownChange(e) {
    this.state.gender = e.target.value;
    this.getProducts();

  }
  handleChange1(event) {
    this.state.sizef = event.target.value;
    this.getProducts();

  }
  handleChange2(evento) {
    this.state.colorf = evento.target.value;
    this.getProducts();

  }
  onChangeSearch(even) {
    this.state.search = even.target.value;
    this.getProductsBySearchBar();
  }
  getProductsBySearchBar() {
    if (this.state.search === '' || this.state.search === null) {
      axios.get(`http://localhost:8080/api/products/products1`)
        .then(res => {
          const products = res.data;
          this.setState({ products: products });
        })
    } else {
      axios.get(`http://localhost:8080/api/products/filter/input/${this.state.search}`)
        .then(res => {
          const products = res.data;
          this.setState({ products: products });
        })
    }
  }

  getProducts() {
    if ((this.state.gender === null
      || this.state.gender === ''
      || this.state.gender === 'todos')
      && (this.state.sizef === null
        || this.state.sizef === ''
        || this.state.sizef === 'todos')
      && (this.state.colorf === null
        || this.state.colorf === ''
        || this.state.colorf === 'todos')) {
      axios.get(`http://localhost:8080/api/products/products1`)
        .then(res => {
          const products = res.data;
          this.setState({ products: products });
        })
    }
    else if ((this.state.sizef === null
      || this.state.sizef === ''
      || this.state.sizef === 'todos')
      && (this.state.colorf === null
        || this.state.colorf === ''
        || this.state.colorf === 'todos')) {
      axios.get(`http://localhost:8080/api/products/filter/${this.state.gender}`)
        .then(res => {
          const products = res.data;
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
        <FilterContainer>
          <Filter>
            <FilterText>
              <Select onChange={this.handleDropdownChange}>
                <Option value='todos'  > Todos </Option>
                <Option value='hombre'  > Hombre </Option>
                <Option value='mujer' > Mujer </Option>
              </Select>
            </FilterText>
          </Filter>
          <SearchDiv>
            <SearchContainer>
              <Input type="text" onChange={this.onChangeSearch} size='30' placeholder="Buscar" />
              <Search style={{ color: "white", fontSize: 26 }} />
            </SearchContainer>
          </SearchDiv>
        </FilterContainer>
        <ProductsContainer>
          {this.state.products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </ProductsContainer>
      </Container>
    );
  };
}
