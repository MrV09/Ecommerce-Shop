import CenterMenu from "@/components/CenterMenu";
import Header from "@/components/Header";
import styled from "styled-components";
import {useSession, signOut, signIn} from "next-auth/react";
import PrimaryButton from "@/components/PrimaryButton";
import Box from "@/components/Box";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import Order from "@/components/Order";

const Title = styled.h1`
    font-size: 2em;
    font-weight: bold;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1.2fr .8fr;
    gap: 40px;
    margin: 40px 0;
`;

const Bg = styled.div`
    background: rgb(169,255,157);
    background: linear-gradient(90deg, rgba(169,255,157,1) 0%, rgba(106,233,138,1) 42%, rgba(0,244,44,1) 100%);
    height: 100vh;
`;

export default function AccountPage(){
    const {data:session} = useSession();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [orders, setOrders] = useState([]);

    async function logout(){
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL,
        });
    }

    async function login(){
        await signIn('google');
    }

    function saveData(){
        const data = {name, phone, email, city, address, postCode};
        axios.put('/api/client_data', data);
    }

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
        axios.get('/api/orders').then(response => {
            setOrders(response.data);
        });
    }, [session]);

    return(
        <Bg>
            <Header />
            <CenterMenu>
                <Wrapper>
                    <div>
                        <Box>
                            <div>
                                <Title>Orders History</Title>
                                {orders.length === 0 && (
                                    <p>Sign in to see your orders!</p>
                                )}
                                {orders.length > 0 && orders.map(o => (
                                    <Order {...o}/>
                                ))}
                            </div>
                        </Box>
                    </div>
                    <div>
                        <Box>
                            <Title>Account details</Title>
                            <Input type="text" placeholder="Name" value={name} name="name" onChange={ev => setName(ev.target.value)} />
                            <Input type="text" placeholder="Phone Number" value={phone} name="phone" onChange={ev => setPhone(ev.target.value)} />
                            <Input type="text" placeholder="E-mail" value={email} name="email" onChange={ev => setEmail(ev.target.value)} />
                            <Input type="text" placeholder="City" value={city} name="city" onChange={ev => setCity(ev.target.value)} />
                            <Input type="text" placeholder="Address" value={address} name="address" onChange={ev => setAddress(ev.target.value)} />
                            <Input type="text" placeholder="Post Code" value={postCode} name="postCode" onChange={ev => setPostCode(ev.target.value)} />                                               
                            <PrimaryButton size="l" onClick={saveData} >Save Details</PrimaryButton>
                            <hr />
                            {session && (
                                <PrimaryButton onClick={logout} type="red" size="l">Sign out</PrimaryButton>
                            )}
                            {!session && (
                                <PrimaryButton onClick={login} size="l">Sing in</PrimaryButton>
                            )}
                        </Box> 
                    </div>
                </Wrapper>
            </CenterMenu>        
        </Bg>
    );

}