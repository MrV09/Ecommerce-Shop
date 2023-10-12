import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr .7fr;
    gap: 40px;
    margin-top: 30px;
`;

const Box = styled.div`
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(235,241,235,1) 49%, rgba(217,217,217,1) 100%);
    border-radius: 10px;
    padding: 30px;
`;

const ProductNameCell = styled.td`
    align-items: center; 
`;

const ProductImageCell = styled.td`
    img{
        max-width: 100px;
        max-height: 150px;
    }
`;


export default function CartPage(){
    const {cartProducts} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if(cartProducts.length > 0){
            axios.post('/api/cart', {ids:cartProducts}).then(response => {
                setProducts(response.data);
            })
        }
    }, [cartProducts]);
    return(
        <>
            <Header />
            <ColumnsWrapper>
                <Box>
                    <h2>Cart</h2>
                    {!cartProducts?.length && (
                        <div>Your cart is empty!</div>
                    )}
                    {products?.length > 0 && (
                    <Table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr>
                                    <ProductImageCell>
                                        <img src={product.images[0]} alt="" />
                                    </ProductImageCell>
                                    <ProductNameCell>
                                        {product.name}
                                    </ProductNameCell>
                                    <td>{cartProducts.filter(id => id === product._id).length}</td>
                                    <td>{product.price}</td>
                                </tr>     
                            ))}   
                        </tbody>
                    </Table>
                    )}
                </Box>
                {!!cartProducts?.length && (
                    <Box>
                        <h2>Order Information</h2>
                        <PrimaryButton size="l">Checkout</PrimaryButton>
                    </Box>
                )}
            </ColumnsWrapper>
        </>
    );
}