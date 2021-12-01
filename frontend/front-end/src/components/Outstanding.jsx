import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product.detail";


const Title = styled.h3`
  margin: 20px;

`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const getProductsOutstanding = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Outstanding = () => {
  return (
    <getProductsOutstanding>
      <Title>Productos destacados: </Title>
      <Container>
      
        {popularProducts.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      
    </Container>

    </getProductsOutstanding>
    
  );
};

export default Outstanding;
