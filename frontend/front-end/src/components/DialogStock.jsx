import DialogContentText from '@mui/material/DialogContentText';
import { mobile } from "../responsive";
import styled from "styled-components";


const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  size: 30;
  
`;

const Input = styled.input`
  flex: 1;
  min-width: 20%;
  margin: 10px 10px 0px 0px;
  flex-wrap: wrap;
  padding: 5px;
  border-radius: 5px;
  size: 40;
`;

const FilterText = styled.span`
  font-size: 1px;
  font-weight: 60;
  margin-right: 5px;
  align-items: center;
  justify-content: center;
  ${mobile({ marginRight: "0px" })}
`;
const Select = styled.select`
  padding: 1px;
  margin-right: 5px;
  border-radius: 5px;
  border-color: white;
  margin: 0px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1px;
  align-items: center;
  justify-content: center;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option`
  margin: 5px 0px;
  font-size: 25px;
  font-weight: 50;
  letter-spacing: 3px;
  align-items: center;
  justify-content: center;
`;

const DialogStock = ({ stock }) => {
  
  return (
    <div key={stock._id} >
      <DialogContentText>
        <FilterText>
          <DialogContentText>
            Talla: 
            <Select>
              <Option> {stock.size} </Option>
            </Select>
          </DialogContentText>
        </FilterText>
      </DialogContentText>
      <DialogContentText>
        <Form>
          <Input placeholder='Stock' />
        </Form>
        Disponibles: {stock.stock}
      </DialogContentText>
    </div>
  )
}
export default DialogStock;