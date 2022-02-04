import styled from "styled-components";
import Navbar from "../components/Navbar";
import Outstanding from "../components/Outstanding";
import Footer from "../components/Footer";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { Checkbox } from '@mui/material';


const Container = styled.div``;



const Products1 = () => {

  return (
    <Container>
      <Navbar />
      <Products />
      <Outstanding/>
      <Footer />
    </Container>
  );
};

export default Products1;

/* <Filter>
<FilterText>Filtrar:</FilterText>
<Select>
  <Option disabled selected>
    Color
  </Option>
  <Option>Todos</Option>
  <Option>Blanco</Option>
  <Option>Negro</Option>
  <Option>Rojo</Option>
  <Option>Azul</Option>
  <Option>Amarillo</Option>
  <Option>Verde</Option>
</Select>
<Select>
  <Option disabled selected>
    Talla
  </Option>
  <Option>Todas</Option>
  <Option>XS</Option>
  <Option>S</Option>
  <Option>M</Option>
  <Option>L</Option>
  <Option>XL</Option>
</Select>
</Filter> */