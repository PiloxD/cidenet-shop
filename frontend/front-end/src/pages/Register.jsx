import styled from "styled-components";
import Navbar2 from "../components/Navbar.login.register";
import { mobile } from "../responsive";
import React, { Component } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton } from "@mui/material";
import DialogPassword from "../components/DialogPassword"
import LinkIcon from '@mui/icons-material/Link';

const url1581Law = "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981#:~:text=La%20presente%20ley%20tiene%20por,el%20art%C3%ADculo%2015%20de%20la"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://image.freepik.com/foto-gratis/chica-alegre-cabello-castano-rizado-bailando-sobre-fondo-morado-expresion-cara-besos_197531-7071.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: light-white;
  ${mobile({ width: "75%" })}

`;

const Title = styled.h1`
  font-size: 45px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 50%;
  margin: 10px 0px;
  padding: 10px;
  border-radius: 5px;
`;

const Agreement = styled.span`
  font-size: 15px;
  margin: 20px 0px;
`;
const Button = styled.button`
  min-width: 30%;
  max-width: 40%;
  border: none;
  padding: 10px 15px;
  background-color: #9377CB;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}

`;
const Filter = styled.div`
  flex: 1;
  margin: 5px;
  height: 10px;
  display: flex;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 10px;
  font-weight: 100;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 1px;
  margin-right: 20px;
  border-radius: 10px;
  border-color: white;
  margin: 10px 0px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 3px;
`;
const Option = styled.option`
  margin: 20px 0px;
  font-size: 15px;
  font-weight: 300;
  letter-spacing: 3px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}

`;
const DivHelp = styled.div`
flex-direction: row;
margin: 20px;
align-items: start;
justify-content: start;
display: flex;
`;


export default class Register extends Component {
  constructor() {
    super()
    this.handleDropdownChange = this.handleDropdownChange.bind(this);

  }
  state = {
    typedocument: '',
    document: Number,
    name: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
  }
  handleDropdownChange(e) {
    this.setState({
      typedocument: e.target.value
    })
  }

  onChangeDocument = (e) => {
    this.setState({
      document: e.target.value
    })

  }
  onChangeName = (e) => {
    this.setState({
      name: e.target.value
    })

  }
  onChangeLastname = (e) => {
    this.setState({
      lastname: e.target.value
    })

  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    })

  }
  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    })

  }

  handleConfirmPassword = async e => {
    this.setState({
      password2: e.target.value
    })

  };
  checkPassword = (valor) => {
    var myregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (myregex.test(valor)) {
      alert(valor + " es valido :-) !");
      return true;
    } else {
      alert(valor + " NO es valido!");
      return false;
    }
  }


  onSubmit = async e => {
    e.preventDefault();
    if ((this.state.password === this.state.password2)
      && (this.state.password.length >= 5)
      && (this.state.password.match(/[a-z]/))
      && (this.state.password.match(/[A-Z]/))
      && (this.state.password.match(/\d/))
      && (this.state.password !== '')) {
      await axios.post('http://localhost:8080/api/auth/register', {
        typedocument: this.state.typedocument,
        document: this.state.document,
        name: this.state.name,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      })
      swal({
        title: "¡Listo!",
        text: "Su usuario ha sido registrado",
        icon: "success"
      });
    } else {
      swal({
        title: "Contraseña inválida",
        icon: "error"
      });
    }
  }

  render() {
    return (
      <div>

        <Navbar2 />
        <Container>
          <Wrapper>
            <DivHelp>
              <Title>Registrarse
              </Title>
              <DialogPassword />
            </DivHelp>
            <Form onSubmit={this.onSubmit}>
              <Filter>
                <FilterText>
                  <Select onChange={this.handleDropdownChange}>
                    <Option value='CC'  > Cédula de ciudadanía </Option>
                    <Option value='TI' > Tarjeta de identidad </Option>
                  </Select>
                </FilterText>
              </Filter>
              <Input type="number" onChange={this.onChangeDocument} placeholder="Documento" />
              <Input type="text" onChange={this.onChangeName} placeholder="Nombre" />
              <Input type="text" onChange={this.onChangeLastname} placeholder="Apellido" />
              <Input type="email" onChange={this.onChangeEmail} placeholder="Correo" />
              <Input type="password" onChange={this.onChangePassword} placeholder="Contraseña" />
              <Input type="password" onChange={this.handleConfirmPassword} placeholder=" Confirmar Contraseña" />
              <Agreement>
                Al hacer clic en "Crear", aceptas nuestras condiciones y  la política de tratamiento datos personales.   <b> Ley 1581 de 2012</b>
                <a href={url1581Law} target='_blank'>
                  <LinkIcon />
                </a>
              </Agreement>
              <Button type="submit">Crear</Button>
            </Form>
          </Wrapper>
        </Container>
      </div >

    );
  };
}

