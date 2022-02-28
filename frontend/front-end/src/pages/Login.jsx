import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar2 from "../components/Navbar.login.register";
import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import swal from "sweetalert";
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import useUser from "../hooks/useUser";
import loginService from "../services/login";
import { Link } from 'react-router-dom';


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
const Logo = styled.h3`
  font-weight: bold;
  color: black;
  padding: 15px;
  text-decoration:none;
  ${mobile({ fontSize: "24px" })}
`;

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([])
  const navigate = useNavigate()
  const { login, isLogged } = useUser()


  useEffect(() => {
    if (isLogged) navigate('/')
  }, [isLogged, navigate])



  const onChangeEmail = (e) => {
    setEmail(
      e.target.value
    )
  }
  const onChangePassword = (e) => {
    setPassword(
      e.target.value
    )
  }

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        email,
        password
      })

      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      setUser(user)
      console.log("user: ", user);
    } catch (e) {
    }
    await axios.post('http://localhost:8080/api/auth/login', {
      email,
      password
    })
    if ((window.localStorage.getItem('loggedAppUser') === '{"message":"User Not Found","code":400}') ||
      (email === '' || email === null)) {
      swal({
        title: "¡Error!",
        text: "Este usuario no existe",
        icon: "error"
      });
      window.localStorage.removeItem('loggedAppUser')
      navigate('/login')
    }
    else swal({
      title: "¡Bienvenido!",
      text: "Ha ingresado correctamente",
      icon: "success"
    });

    login({ email, password })

  }

  const { token } = user;

  console.log(token)

  return (
    <div>
      <Navbar2 />
      <Container>
        <Wrapper>
          <Title>Ingresar</Title>
          <Form onSubmit={onSubmit}>
            <Input type="email" onChange={onChangeEmail} placeholder="Email" />
            <Input type="password" onChange={onChangePassword} placeholder="Contraseña" />
            <Button variant="contained" color="primary" type="submit"   >INGRESAR</Button>
            <Link to="/Register"><Logo>¿No tienes cuenta?
            </Logo></Link>
          </Form>
        </Wrapper>
      </Container>
    </div>

  );
}
