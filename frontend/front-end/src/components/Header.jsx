import React from "react";
import { Link } from 'react-router-dom';
import { ExitToApp } from "@material-ui/icons";
import useUser from "../hooks/useUser";
import styled from "styled-components";
import { mobile } from "../responsive";

const H1 = styled(Link)`
  text-decoration: none;
  color: black;
  ${mobile({ height: "70px" })}

`;

export default function Header() {

    const { isLogged, logout } = useUser()
    const handleClick = e => {
        e.preventDefault()
        logout()
    }
    return (
        <header>
            {
                isLogged
                    ?
                    <H1 to='#' onClick={handleClick}> <ExitToApp style={{ color: "black" }} /> </H1>
                    : <H1 to='/login' ><h3>Ingresar</h3></H1>
            }
        </header>
    )
}