import styled from "styled-components";
import axios from "axios";
import { mobile } from "../responsive";
import DialogStock from "./DialogStock";
import React, { Component } from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export default class DialogStockComponent extends Component {
    state = {
        stock: [],
        products: []
    }

    getProducts() {
        axios.get(`http://localhost:8080/api/products/products1`)
            .then(res => {
                const products = res.data;
                this.setState({ products: products });
                this.state.products.map((products) =>
                    axios.get(`http://localhost:8080/api/stock/stock/getStock/${products.name}`)
                        .then(res => {
                            const stock = res.data;
                            this.setState({ stock: stock });
                        })
                )

            })
            
    }
    componentDidMount() {
        this.getProducts();
    };

    render() {
        return (
            <Container>
                {this.state.stock.map((stock) => (
                    <DialogStock stock={stock} key={stock._id} />
                ))}
            </Container>

        )
    }


}