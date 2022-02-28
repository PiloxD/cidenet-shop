import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styled from "styled-components";
import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import DialogTest from "./DialogTest"
import { mobile } from "../responsive";
import Slide from '@mui/material/Slide';



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
  border-color:#ffd932;
  border-style:solid;
  border-width:4px;
  border-radius: 10px;
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
const ImageDialog = styled.img`
  height: 5%;
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

const Option = styled.option`
  margin: 5px 0px;
  font-size: 25px;
  font-weight: 50;
  letter-spacing: 3px;
  align-items: center;
  justify-content: center;
`;


const OutstandingProducts = ({ product }) => {

  const [open, setOpen] = useState(false);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpen = async () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const refreshPage = () => {
    window.location.reload(false);
  };
  return (
    <Container key={product._id}  >
      <Image src={product.imgURL} />
      <Info>
        <Name >{product.name} </Name>
        <Price  >${product.price}</Price>
        <IconButton onClick={handleClickOpen}>
          <Icon>
            <OpenInNewIcon />
          </Icon>
        </IconButton>
      </Info>
      <div>
        <DialogTest
          product={product}
          open={open}
          handleClose={handleClose}
          refreshPage={refreshPage}
          Transition={Transition}
          Form={Form}
          ImageDialog={ImageDialog}
          FilterText={FilterText}
          Option={Option}
          Input={Input} />
      </div>
    </Container>
  );
};

export default OutstandingProducts;

