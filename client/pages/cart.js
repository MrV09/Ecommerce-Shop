import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import Input from "@/components/Input";
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

const QuantityCell = styled.td`
`;


export default function CartPage(){
    const {cartProducts, addProduct, removeProduct} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');

    useEffect(() => {
        if(cartProducts.length > 0){
            axios.post('/api/cart', {ids:cartProducts}).then(response => {
                setProducts(response.data);
            })
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    function addMoreProducts(id){
        addProduct(id);
    }

    function removeProducts(id){
        removeProduct(id);
    }

    let total = 0;
    for(const productId of cartProducts){
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    return(
        <>
            <Header />
            <ColumnsWrapper>
                <Box>
                    <h2>Order Summary</h2>
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
                                    <QuantityCell>
                                        <PrimaryButton size="xs" onClick={() => removeProducts(product._id)} >-</PrimaryButton>
                                        {cartProducts.filter(id => id === product._id).length}
                                        <PrimaryButton size="xs" onClick={() => addMoreProducts(product._id)} >+</PrimaryButton>
                                    </QuantityCell>
                                    <td>{(cartProducts.filter(id => id === product._id).length * product.price).toFixed(2)} lei</td>
                                </tr>     
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Total: {total.toFixed(2)} lei</td>    
                            </tr>  
                        </tbody>
                    </Table>
                    )}
                </Box>
                {!!cartProducts?.length && (
                    <Box>
                        <h2>Order Information</h2>
                        <form method="post" action="/api/checkout">
                            <Input type="text" placeholder="Name" value={name} name="name" onChange={ev => setName(ev.target.value)} />
                            <Input type="text" placeholder="Phone Number" value={phone} name="phone" onChange={ev => setPhone(ev.target.value)} />
                            <Input type="text" placeholder="E-mail" value={email} name="email" onChange={ev => setEmail(ev.target.value)} />
                            <Input type="text" placeholder="City" value={city} name="city" onChange={ev => setCity(ev.target.value)} />
                            <Input type="text" placeholder="Address" value={address} name="address" onChange={ev => setAddress(ev.target.value)} />
                            <Input type="text" placeholder="Post Code" value={postCode} name="postCode" onChange={ev => setPostCode(ev.target.value)} />                                               
                            <PrimaryButton size="l" type="submit" >Checkout</PrimaryButton>
                        </form>
                    </Box>
                )}
            </ColumnsWrapper>
        </>
    );
}