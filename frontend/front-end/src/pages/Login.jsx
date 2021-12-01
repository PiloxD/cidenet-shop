import styled from "styled-components";
import {mobile} from "../responsive";
import Navbar2 from "../components/Navbar.login.register";
import React, { Component } from "react";
import axios from 'axios';
import swal from "sweetalert";
import Button from '@material-ui/core/Button';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://image.freepik.com/foto-gratis/adorable-mujer-positiva-saltando-riendo-modelo-mujer-adorable-chaqueta-vaquera-gran-tamano-bailando_197531-20500.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: light white;
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
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
`;



const Link = styled.a`
  margin: 10px 5px;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
`;

export default class Login extends Component {
  
  state = {
      email: '',
      password: ''
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
      await axios.post('http://localhost:8080/api/auth/login', {
          email: this.state.email,
          password: this.state.password
        
      
      })
      swal({
        title: "¡Bienvenido!",
        text: "Ha ingresado correctamente",
        icon: "success"
    });
      console.log(e);
      

      
      }
      
      render () {
        const isEnabled = this.state.email.length > 0 && this.state.password.length > 0;
        
        return (
          <div>
            <Navbar2/>
            <Container>
            <Wrapper>
              <Title>Ingresar</Title>
              <Form onSubmit = {this.onSubmit}>
                <Input type = "email" onChange={this.onChangeEmail} placeholder="Email" />
                <Input type = "password" onChange={this.onChangePassword} placeholder="Contraseña" />
                <Button variant="contained"  color = "primary"  disabled={!isEnabled} type="submit"  href = "/" >INGRESAR</Button>
                <Link href="/Register">¿No tienes cuenta?</Link>
              </Form>
            </Wrapper>
          </Container>
          </div>
          
        );
      };
      }
