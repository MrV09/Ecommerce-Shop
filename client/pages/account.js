import CenterMenu from "@/components/CenterMenu";
import Header from "@/components/Header";
import styled from "styled-components";
import {useSession, signOut, signIn} from "next-auth/react";
import PrimaryButton from "@/components/PrimaryButton";

const Title = styled.h1`
    font-size: 2em;
    font-weight: bold;
`;

export default function AccountPage(){
    const {data:session} = useSession();

    async function logout(){
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL,
        });
    }

    async function login(){
        await signIn('google');
    }

    return(
        <>
            <Header />
            <CenterMenu>
                <Title>My Account</Title>
                {session && (
                    <PrimaryButton onClick={logout} type="red" size="l">Sign out</PrimaryButton>
                )}
                {!session && (
                    <PrimaryButton onClick={login} size="l">Sing in</PrimaryButton>
                )}
            </CenterMenu>        
        </>
    );

}