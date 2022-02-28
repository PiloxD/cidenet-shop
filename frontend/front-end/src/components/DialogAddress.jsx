import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from "styled-components";
import axios from "axios";
import swal from "sweetalert";


const Container = styled.div`
  display: flex;
  margin: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
`;
const ButtonMUI = styled(Button)`
  color: white;
`;
const CartButtonH3 = styled.h3`
  color: black;

`;
export default function DialogAddress() {
  const [open, setOpen] = React.useState(false);
  const [city, setCity] = React.useState('');
  const [address, setAddress] = React.useState('');

  const emailUser = window.localStorage.getItem('loggedAppUser')
  const tokenInfo = JSON.parse(emailUser)

  const totalToken = window.localStorage.getItem('total')
  const total = JSON.parse(totalToken)

  const cartQuantity = window.localStorage.getItem('cartQuantity')
  const quantity = JSON.parse(cartQuantity)


  console.log(city, address)
  const handleClickBuy = async e => {
    e.preventDefault()
    try {
      const email = tokenInfo.email
      if ((city !== '') && (address !== '') && (city !== null) && (address !== null)) {
        await axios.post('http://localhost:8080/nodemailer/send-email', {
          email,
          city,
          address,
          total
        })
        await axios.delete(`http://localhost:8080/api/cart/productsCart/delete/${email}`)
        swal({
          title: "¡Gracias por tu compra!",
          icon: "success"
        });
      }else{
        swal({
          title: "Debes rellenar los campos",
          icon: "warning"
        });

      }
    } catch (error) {
      console.log(error)

    }
    setOpen(false)
  }
  const handleClickOpen = () => {
    if (quantity !== 0) {
      setOpen(true);
    } else {
      swal({
        title: "Tu carrito está vacío",
        icon: "warning"
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeCity = (e) => {
    setCity(
      e.target.value
    )
  }
  const onChangeAddress = (e) => {
    setAddress(
      e.target.value
    )
  }

  return (
    <Container>
      <ButtonMUI variant="outlined" onClick={handleClickOpen}>
        <CartButtonH3>Comprar</CartButtonH3>
      </ButtonMUI>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          Agrega la dirección de entrega
        </DialogTitle>
        <DialogContent>
          <Form>
            <div>
              <Input onChange={onChangeCity} placeholder='Ciudad' />
            </div>
            <div>
              <Input onChange={onChangeAddress} placeholder='Dirección' />
            </div>
          </Form>
          <DialogContentText id="alert-dialog-description">
            Recibirás un correo con los detalles de tu compra
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
          <Button onClick={handleClickBuy}>Confirmar pedido</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}