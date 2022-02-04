import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { mobile } from "../responsive";
import React, { Component } from "react";
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { Search } from "@material-ui/icons";

const CheckboxContainer = styled.div`
flex: 1;
margin: 10px;
height: 300px;
display: flex;
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
const SearchDiv = styled.div``;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: inline-flex;
  align-items: center;
  margin-left: 25px;
  border-radius: 5px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
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
    // else if (this.state.gender === 'hombre'){
    //   axios.get(`http://localhost:8080/api/products/filter/hombre/${this.state.sizef}/${this.state.colorf}`)
    //     .then(res => {
    //       const products = res.data;
    //       console.log(res)
    //       this.setState({ products: products });
    //     })
    // }
    // else if (this.state.gender === 'mujer'){
    //   axios.get(`http://localhost:8080/api/products/filter/hombre/${this.state.sizef}/${this.state.colorf}`)
    //     .then(res => {
    //       const products = res.data;
    //       console.log(res)
    //       this.setState({ products: products });
    //     })
    // }
  }
  componentDidMount() {
    this.getProducts()
  };




  render() {
    return (
      <Container>
        <SearchDiv>
          <SearchContainer>
            <Input type="text" onChange={this.onChangeSearch} placeholder="Buscar" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </SearchDiv>
        <Filter>

          <FilterText>
            <Select onChange={this.handleDropdownChange}>
              <Option value='todos'  > Todos </Option>
              <Option value='hombre'  > Hombre </Option>
              <Option value='mujer' > Mujer </Option>
            </Select>
          </FilterText>
        </Filter>
        {/* <CheckboxContainer>
          <Box sx={{ display: 'flex' }}>
            <FormControl onChange={this.handleChange1} sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Talla</FormLabel>
              <FormGroup>
                <FormControlLabel

                  control={
                    <Checkbox name="XS" />
                  }
                  label="XS"
                  value='XS'
                />
                <FormControlLabel
                  control={
                    <Checkbox name="S" />
                  }
                  label="S"
                  value='S'
                />
                <FormControlLabel
                  control={
                    <Checkbox name="M" />
                  }
                  label="M"
                  value='M'
                />
                <FormControlLabel
                  control={
                    <Checkbox name="L" />
                  }
                  label="L"
                  value='L'
                />
                <FormControlLabel
                  control={
                    <Checkbox name="XL" />
                  }
                  label="XL"
                  value='XL'
                />
              </FormGroup>
              <FormHelperText>Filtrar por talla</FormHelperText>
            </FormControl>
            <FormControl onChange={this.handleChange2} component="fieldset" sx={{ m: 3 }} variant="standard">
              <FormLabel component="legend">Color</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox name="azul" />
                  }
                  label="Azul"
                  value='azul'
                />
                <FormControlLabel
                  control={
                    <Checkbox name="blanco" />
                  }
                  label="Blanco"
                  value='blanco'
                />
                <FormControlLabel
                  control={
                    <Checkbox name="negro" />
                  }
                  label="Negro"
                  value='negro'
                />
                <FormControlLabel
                  control={
                    <Checkbox name="rojo" />
                  }
                  label="Rojo"
                  value='rojo'
                />
                <FormControlLabel
                  control={
                    <Checkbox name="rosado" />
                  }
                  label="Rosado"
                  value='rosado'
                />
              </FormGroup>
              <FormHelperText>Filtrar por color</FormHelperText>
            </FormControl>
          </Box>
        </CheckboxContainer> */}
        <ProductsContainer>
          {this.state.products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </ProductsContainer>
      </Container>
    );
  };
}
