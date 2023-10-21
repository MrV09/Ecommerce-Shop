import { CartContext } from "@/components/CartContext";
import CenterMenu from "@/components/CenterMenu";
import Header from "@/components/Header";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import Table from "@/components/Table";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {css} from "styled-components";

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
    ${props => props.type === 'confirmation' && css`
        text-align: center;
    `}
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

const Bg = styled.div`
    background: rgb(169,255,157);
    background: linear-gradient(90deg, rgba(169,255,157,1) 0%, rgba(106,233,138,1) 42%, rgba(0,244,44,1) 100%);
    height: 100vh;
`;


export default function CartPage(){
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const {data: session} = useSession();

    useEffect(() => {
        if(cartProducts.length > 0){
            axios.post('/api/cart', {ids:cartProducts}).then(response => {
                setProducts(response.data);
            })
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    useEffect(() => {
        if(typeof window === 'undefined'){
            return;
        }
        if(window?.location.href.includes('success')){
            setIsSuccess(true);
            clearCart();
        }
    }, []);

    useEffect(() => {
        if (!session) {
          return;
        }
        axios.get('/api/client_data').then(response => {
          setName(response.data.name);
          setPhone(response.data.phone);
          setEmail(response.data.email);
          setCity(response.data.city);
          setAddress(response.data.address);
          setPostCode(response.data.postCode);
        });
      }, [session]);

    function addMoreProducts(id){
        addProduct(id);
    }

    function removeProducts(id){
        removeProduct(id);
    }

    async function goToPayment(){
        const response = await axios.post('/api/checkout', {
            name,phone,email,city,address,postCode,
            cartProducts,
        });
        if(response.data.url){
            window.location = response.data.url;
        }
    }

    async function startConfetti(){
        await confetti();
    }

    let total = 0;
    for(const productId of cartProducts){
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    if(isSuccess){
        return(
            <>
                <Header />
                <CenterMenu>
                    <Box type="confirmation">
                        <h2>Thank you for your order!</h2>
                        <p>Check your email for more information</p>
                    </Box>
                </CenterMenu>
            </>
        )
    }

    return(
        <Bg>
            <Header />
            <CenterMenu>
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
                            <Input type="text" placeholder="Name" value={name} name="name" onChange={ev => setName(ev.target.value)} />
                            <Input type="text" placeholder="Phone Number" value={phone} name="phone" onChange={ev => setPhone(ev.target.value)} />
                            <Input type="text" placeholder="E-mail" value={email} name="email" onChange={ev => setEmail(ev.target.value)} />
                            <Input type="text" placeholder="City" value={city} name="city" onChange={ev => setCity(ev.target.value)} />
                            <Input type="text" placeholder="Address" value={address} name="address" onChange={ev => setAddress(ev.target.value)} />
                            <Input type="text" placeholder="Post Code" value={postCode} name="postCode" onChange={ev => setPostCode(ev.target.value)} />                                               
                            <PrimaryButton size="l" onClick={goToPayment} >Checkout</PrimaryButton>
                    </Box>
                )}
            </ColumnsWrapper>
            </CenterMenu>
        </Bg>
    );
}