import * as React from 'react';
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const Product = styled.div`
 display: flex;
 justify-content: space-between;
 ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
 flex: 2;
 display: flex;
`;

const Image = styled.img`
 width: 150px;
`;

const Details = styled.div`
 padding: 20px;
 display: flex;
 flex-direction: column;
 justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductColor = styled.div`
 width: 20px;
 height: 20px;
 border-radius: 50%;
 background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
 flex: 1;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`;

const ProductAmountContainer = styled.div`
 display: flex;
 align-items: center;
 margin-bottom: 20px;
`;

const ProductAmount = styled.div`
 font-size: 24px;
 margin: 5px;
 ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
 font-size: 20px;
 font-weight: 300;
 ${mobile({ marginBottom: "20px" })}
`;

const ProductPriceTotal = styled.h5`
`;

const CartItem = ({ cart, getProductsCart }) => {


    const [stocks, setStocks] = useState([]);
    const [disponibilidad, setDisponibilidad] = useState(0);


    const getStocks = async () => {
        try {
            const url1 = `http://localhost:8080/api/stock/stock/getStock/filter/${cart.name}/${cart.size}`;
            const res = await axios.get(url1);

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
    }, [stocks]);

    const updateDisponibilidad = () => {
        stocks.map(stock => {
                setDisponibilidad(stock.stock)
            }
        )
    }
    const subtotal = cart.price * cart.stock;

    const handleClickDelete = async e => {
        const url2 = `http://localhost:8080/api/cart/delete/${cart._id}`;
        await axios.delete(url2)
        axios.put(`http://localhost:8080/api/stock/stock/update/${cart.name}/${cart.size}/${cart.stock}`)
        getProductsCart()
    }

    return (
        <Product style={{ padding: "1rem" }}>
            <ProductDetail>
                <Image src={cart.imgURL} />
                <Divider />
                <Details>
                    <ProductName>
                        <b>Nombre del producto:</b> {cart.name}
                    </ProductName>
                    {/* <ProductName><b>Color:</b>
                        <ProductColor color={cart.color} />
                    </ProductName> */}
                    <ProductSize>
                        <b>Talla:</b> {cart.size}
                    </ProductSize>
                </Details>
            </ProductDetail>
            <PriceDetail>
                <ProductAmountContainer>
                    <ProductName>Cantidad:</ProductName>
                    <ProductAmount>{cart.stock}</ProductAmount>
                    <IconButton onClick={handleClickDelete}>
                        <DeleteIcon />
                    </IconButton>
                </ProductAmountContainer>
                <ProductPrice><ProductPriceTotal>Precio unidad: $ {cart.price}</ProductPriceTotal></ProductPrice>
                <ProductPrice><ProductPriceTotal>Subtotal: $ {subtotal}</ProductPriceTotal></ProductPrice>
            </PriceDetail>
            <Divider />
        </Product>
    )
}

export default CartItem;


