import styled from "styled-components";
import Navbar2 from "../components/Navbar.login.register";
import { mobile } from "../responsive";
import React, { Component } from "react";
import axios from "axios";
import swal from 'sweetalert';


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
  flex-wrap: wrap;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 45px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  flex-wrap: wrap;
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
`;

export default class Register extends Component {
  state = {
      username: '',
      email: '',
      password: ''
  }
   
  onChangeUsername = (e)  => {
      this.setState({
          username: e.target.value
      })

  }
  onChangeEmail = (e)  => {
      this.setState({
          email: e.target.value
      })

  }
  onChangePassword = (e)  => {
      this.setState({
          password: e.target.value
      })

  }

  onSubmit = async e => {
      e.preventDefault();
      await axios.post('http://localhost:8080/api/auth/register', {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
      })
      console.log(e);
      

      
      swal({
        title: "¡Listo!",
        text: "Su usuario ha sido registrado",
        icon: "success"
    });

  }



  render() {
      const isEnabled = this.state.username.length > 0 && this.state.email.length > 0 && this.state.password.length > 0;
      return (
        <div>
          <Navbar2/>
          <Container>
          <Wrapper>
            <Title>Registrarse</Title>
            <Form onSubmit = {this.onSubmit}>
              <Input type = "text" onChange={this.onChangeUsername} placeholder="Usuario" />
              <Input type = "email"  onChange={this.onChangeEmail}  placeholder="Correo" />
              <Input type = "password" onChange={this.onChangePassword} placeholder="Contraseña" />
              <Agreement>
              Al hacer clic en "Crear", aceptas nuestras condiciones y  la política de tratamiento datos personales.   <b> Ley 1581 de 2012</b>
              </Agreement>
              <Button  button="true" disabled={!isEnabled} type="submit">Crear</Button>
            </Form>
          </Wrapper>
        </Container>
        </div>
        
      );
    };
  }
    
