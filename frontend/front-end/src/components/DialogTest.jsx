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

const DialogDivImg = styled.div`
flex: 2;
  display: flex;
  align-items: start;
  justify-content: flex-start;
  ${mobile({ flex: 2, justifyContent: "center" })}



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

const DialogTest = ({ product, handleClose, refreshPage, open, Transition, Form, ImageDialog, FilterText, Option, Input }) => {
    const [stocks, setStocks] = useState([]);
    const [disponibilidad, setDisponibilidad] = useState(0);
    const [size, setSize] = useState("");
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
        const toArray = [];
        try {
            const url = `http://localhost:8080/api/stock/stock/getStock/${product.name}`;
            const res = await axios.get(url);

            console.log("res: ", res);
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

    // const prueba2 = stocks.map((stock) => {
    //     console.log("stock en prueba2: ", stock)
    // })

    const updateSize = (value) => {
        console.log("entro a prueba3")
        console.log("prueba3value: ", value)
        setSize(value);
    }

    const updateDisponibilidad = () => {
        console.log("entró a prueba4")
        stocks.map(stock => {
            console.log("prueba4 stock: ", stock)
            console.log("prueba4 size: ", size)
            if (stock.size === size) {
                setDisponibilidad(stock.stock)
            }
        })
    }

    const onChangeSelect = e => {
        updateSize(e.value);
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
                               <InfoIcon/> {product.desc}
                            </DialogContentText>
                            <DialogContentText>
                                <LocalAtmIcon/>Precio: $ {product.price}
                            </DialogContentText>
                            <DialogContentText>
                                <PaletteIcon/>Color: {product.color}
                            </DialogContentText>
                            <DialogContentText>
                               <BookmarkIcon/>Marca: {product.marca}
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
                                    {/* <Option value="XS">XS</Option>
                                        <Option value="S">S</Option>
                                        <Option value="M">M</Option>
                                        <Option value="L">L</Option>
                                        <Option value="XL">XL</Option> */}
                                    {/* </Select> */}
                                </DialogContentText>
                            </FilterText>
                        </DialogContentText>
                </Wrapper>
                <Wrapper>
                    <DialogDiv>
                        <DialogContentText>
                            <Form>
                                {/* <input placeholder="Ingresa cantidad deseada"></input> */}
                                <Input type="number" min={1} max={disponibilidad}  placeholder='Cantidad' />
                            </Form>
                            Disponibles: {disponibilidad}
                        </DialogContentText>
                    </DialogDiv>
                </Wrapper>

                <DialogActions>
                    <Button onClick={handleClose, refreshPage} >Cerrar</Button>
                    <Button onClick={handleClose}>Agregar al carrito</Button>
                </DialogActions>
            </Dialog >
        </>
    )
}

export default DialogTest