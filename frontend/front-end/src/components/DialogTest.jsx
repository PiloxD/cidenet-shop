import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Select from "react-select";
import styled from "styled-components";
import { mobile } from "../responsive";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PaletteIcon from '@mui/icons-material/Palette';
import InfoIcon from '@mui/icons-material/Info';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@material-ui/core";


const DialogDivImg = styled.div`
flex: 2;
  display: flex;
  align-items: start;
  justify-content: flex-start;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const BoxInput = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
justify-content: center;
`;
const DialogDiv = styled.div`
flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}

`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  ${mobile({ padding: "10px 0px" })}
`;

const QuantityText = styled.h1`
`;


const DialogTest = ({ product, handleClose, refreshPage, open, Transition, Form, ImageDialog, FilterText, Option, Input }) => {

    const [stocks, setStocks] = useState([]);
    const [stockId, setStockId] = useState("");
    const [disponibilidad, setDisponibilidad] = useState(0);
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState(0)
    const { isLogged } = useUser()
    const navigate = useNavigate()
    const emailUser = window.localStorage.getItem('loggedAppUser')
    const email = JSON.parse(emailUser)
    const options = [
        { value: "XS", label: "XS" },
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
        { value: "XL", label: "XL" }
    ];
    const displayItem = selected => {
        const item = options.find(x => x.value === selected);
        return item ? item : { value: "", label: "" };
    };

    const customStyles = value => ({
        control: (provided, state) => ({
            ...provided,
            alignItems: "baseline",
            backgroundColor: value ? "gray" : "white"
        })
    });

    const getStocks = async () => {
        try {
            const url = `http://localhost:8080/api/stock/stock/getStock/${product.name}`;
            const res = await axios.get(url);

            setStocks(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getStocks();
    }, []);

    useEffect(() => {
        updateDisponibilidad();
    }, [size]); 

    const onSubmit = async e => {
        if (!isLogged) {
            return navigate('/login'), swal({
                title: "¡Por favor inicia sesión!",
                text: "Debes iniciar sesión para agregar productos al carrito",
                icon: "warning"
            });
        }
        e.preventDefault();
        await axios.post('http://localhost:8080/api/cart/create/productsCart', {
            email: email.email,
            name: product.name,
            stock: quantity,
            size: size,
            price: product.price,
            imgURL: product.imgURL,
            color: product.color
        })
        if (disponibilidad<quantity){
            return  swal({
                title: "¡Producto agregado!",
                text: "Se ha agregado tu producto al carrito, puedes visualizarlo en la pestaña de arriba en la barra de navegación :)",
                icon: "error"
            });
            
            
        }else {
            const result = disponibilidad - quantity
            await axios.put(`http://localhost:8080/api/stock/stock/update/${stockId}/${result}`)
            setDisponibilidad(result)
            swal({
                title: "¡Producto agregado!",
                text: "Se ha agregado tu producto al carrito, puedes visualizarlo en la pestaña de arriba en la barra de navegación :)",
                icon: "success"
            });
        }
    }
    const updateSize = (value) => {
        setSize(value);
    }

    const updateDisponibilidad = () => {
        stocks.map(stock => {
            if (stock.size === size) {
                setDisponibilidad(stock.stock)
                setStockId(stock._id)
            }
        })
    }

    const onChangeSelect = e => {
        updateSize(e.value);
    }
    const addQuantity = () => {
        if (quantity <= (disponibilidad - 1)) {
            setQuantity(quantity + 1);
        }
    }
    const removeQuantity = () => {
        if (quantity >= 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose, refreshPage}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>{product.name}  </DialogTitle>
                <Wrapper>
                    <DialogDivImg>
                        <img height="300px" src={product.imgURL} />
                    </DialogDivImg>
                    <DialogDiv>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <InfoIcon /> {product.desc}
                            </DialogContentText>
                            <DialogContentText>
                                <LocalAtmIcon />Precio: $ {product.price}
                            </DialogContentText>
                            <DialogContentText>
                                <PaletteIcon />Color: {product.color}
                            </DialogContentText>
                            <DialogContentText>
                                <BookmarkIcon />Marca: {product.marca}
                            </DialogContentText>
                        </DialogContent>
                    </DialogDiv>
                    <DialogContentText>
                        <FilterText>
                            <DialogContentText onChange>
                                Talla:
                                <Select
                                    options={options}
                                    styles={customStyles(size)}
                                    onChange={onChangeSelect}
                                    value={displayItem(size)}
                                />
                            </DialogContentText>
                        </FilterText>
                    </DialogContentText>
                </Wrapper>
                <Wrapper>
                    <DialogDiv>
                        <DialogContentText>
                            <Form>
                                <BoxInput>
                                    Cantidad:
                                    <IconButton>
                                        <RemoveIcon onClick={removeQuantity} />
                                    </IconButton>
                                    <QuantityText>{quantity}</QuantityText>
                                    <IconButton>
                                        <AddIcon onClick={addQuantity} />
                                    </IconButton>
                                </BoxInput>
                            </Form>
                            Disponibles: {disponibilidad}
                        </DialogContentText>
                    </DialogDiv>
                </Wrapper>

                <DialogActions>
                    <Button onClick={handleClose, refreshPage} >Cerrar</Button>
                    <Button onClick={onSubmit}  >Agregar al carrito</Button>
                </DialogActions>
            </Dialog >
        </>
    )
}

export default DialogTest