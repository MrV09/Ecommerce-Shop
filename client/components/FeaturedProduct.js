import styled from "styled-components";
import CenterMenu from "./CenterMenu";
import PrimaryButton from "./PrimaryButton";
import ButtonLink from "./ButtonLink";
import CartIcon from "./CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
    background-color: #ACF38F;
`;

const Title = styled.h1`
    font-weight: normal;
    font-size: 3rem;
    margin: 0;
    text-align: center;
    padding: 50px 0;
`;

const Description = styled.p`
    font-size: 1rem;
`;

const Wrapper = styled.div`
    display: flex;
    grid-template-columns: 1.1fr 1.1fr;
    gap: 30px;
    img{
        padding: 10px 10px 10px 10px;
        max-width: 100%;
        max-height: 80%;
    }
    margin: 0 0 20px 0;
`;

const Column = styled.div`
    dispaly: flex;
    align-items: center;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`;

export default function FeaturedProduct({featuredProduct}) {
    const {addProduct} = useContext(CartContext);
    function addFeaturedToCart(){
        addProduct(featuredProduct._id);
    }

    return (
        <Bg>
            <CenterMenu>
                <Wrapper>
                    <Column>
                        <div>
                            <Title>{featuredProduct.name}</Title>
                            <Description>{featuredProduct.description}</Description>
                            <ButtonsWrapper>
                                <ButtonLink href={'/products/'+featuredProduct._id}>Read More...</ButtonLink>
                                <PrimaryButton size='l' onClick={addFeaturedToCart}> 
                                    <CartIcon />
                                    Add to cart
                                </PrimaryButton>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src="https://vlad-ecommerce.s3.eu-north-1.amazonaws.com/1696671718380.jpg"/>
                    </Column>
                </Wrapper>
            </CenterMenu>
        </Bg>
    );
}