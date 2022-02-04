import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styled from "styled-components";
import React, { useState, Component } from "react";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { mobile } from "../responsive";
import Slide from '@mui/material/Slide';
import DialogStockComponent from './DialogStockComponent';

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
  margin: 10px;
  min-width: 280px;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffd6;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;
const Image = styled.img`
  height: 38%;
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


const OutstandingProducts = ({ products }) => {


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const refreshPage = () => {
    window.location.reload(false);
  };


  return (
    <Container key={products._id}  >
      <Image src={products.imgURL} />
      <Info>
        <Name src={products.name}>{products.name}  </Name>
        <Price src={products.price} >${products.price}</Price>
        <IconButton onClick={handleClickOpen}>
          <Icon>
            <OpenInNewIcon />
          </Icon>
        </IconButton>
      </Info>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose, refreshPage}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{products.name}</DialogTitle>
          <DialogContent>
            <ImageDialog src={products.imgURL} />
            <DialogContentText id="alert-dialog-slide-description">
              {products.desc}
            </DialogContentText>
            <DialogContentText>
              $ {products.price}
            </DialogContentText>
            <DialogContentText>
              Color:  {products.color}
            </DialogContentText>
            <DialogContentText>
              Marca: {products.marca}
            </DialogContentText>
            <DialogStockComponent />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose, refreshPage} >Cerrar</Button>
            <Button onClick={handleClose}>Agregar al carrito</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
};

export default OutstandingProducts;

