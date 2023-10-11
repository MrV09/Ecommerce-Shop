import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";
import CartIcon from "./CartIcon";

const ProductWrapper = styled.div`

`;

const Box = styled.div`
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(235,241,235,1) 49%, rgba(217,217,217,1) 100%);
    padding: 20px;
    height: 150px;
    width: 150px;
    justify-content: center;
    display: flex;
    border-radius: 10px;
    img{
        max-width: 100%;
        max-height: 150px;
    }
`;

const Title = styled.h2`
    font-weight: bold;
    font-size: 0.9rem;
    margin: 0;
    height: 30px;
`;

const TitleBox = styled.div`
    margin-top: 10px;
`;

const InfoBox = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Price = styled.h2`
    font-weight: bold;
    font-size: 1rem;
    margin: 0;
`;

export default function ProductBox({_id, name, description, price, images,}) {
    return (
        <ProductWrapper>
            <Box>
                <img src={images[0]} alt=""/>
            </Box>
            <TitleBox>
                <Title>
                    {name}
                </Title>
            </TitleBox>
            <InfoBox>
                <Price>
                    {price} lei
                </Price>
                <PrimaryButton size="s"><CartIcon /></PrimaryButton>
            </InfoBox>
        </ProductWrapper>
    );
}