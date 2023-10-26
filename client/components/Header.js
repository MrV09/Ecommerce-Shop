import Link from "next/link";
import styled from 'styled-components';
import CenterMenu from "./CenterMenu";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
    background: rgb(142,255,135);
    background: linear-gradient(90deg, rgba(142,255,135,1) 0%, rgba(30,175,26,1) 38%, rgba(8,190,50,1) 100%);
`;
const Logo = styled(Link)`
    width: 100px;
    height: 100px;
    img{
        max-width: 100%;
        max-height: 100px;
    }
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`;
const StyledNav = styled.nav`
    display: flex;
    gap: 15px;
`;
const NavLink = styled(Link)`
    color: #24920B;
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(7px);
    padding: 5px 10px;
    border-radius: 30px;
    font-weight: 600;
    text-decoration: none;
    align-self: center;
`;

export default function Header() {
    const {cartProducts} = useContext(CartContext);
    return (
        <StyledHeader>
            <CenterMenu>
                <Wrapper>
                    <div>
                        <Logo href={'/'}>
                            <img src="https://vlad-ecommerce.s3.eu-north-1.amazonaws.com/logo_alb.png" />
                        </Logo>
                    </div>
                    <StyledNav>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>All Products</NavLink>
                        <NavLink href={'/account'}>My Account</NavLink>
                        <NavLink href={'/cart'}>Shopping Cart ({cartProducts.length})</NavLink>
                    </StyledNav>
                </Wrapper>    
            </CenterMenu>
        </StyledHeader>
    );
}