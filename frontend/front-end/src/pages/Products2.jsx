import styled from "styled-components";
import Navbar from "../components/Navbar";
import Outstanding from "../components/Outstanding";
import Footer from "../components/Footer";
import Products from "../components/Products";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h2`
  margin: 20px;
  text-align: center;

`;

const Filter = styled.div`
  margin: 20px;
  text-align: center;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border-radius: 10px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const Products2 = () => {
  return (
    <Container>
      <Navbar />
      <Title>Mujer</Title>

        <Filter>
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
        </Filter>
      <Products />
      <Outstanding />
      <Footer />
    </Container>
  );
};

export default Products2;
