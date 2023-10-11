import styled from "styled-components";
import CenterMenu from "./CenterMenu";
import PrimaryButton from "./PrimaryButton";
import ButtonLink from "./ButtonLink";

const Bg = styled.div`
background: rgba(255,255,255,0.3);
backdrop-filter: blur(2px);
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
                                <PrimaryButton size='l'> 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
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