import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 80px;
    height: 100%;
    background: rgb(169,255,157);
    background: linear-gradient(90deg, rgba(169,255,157,1) 0%, rgba(106,233,138,1) 42%, rgba(0,244,44,1) 100%);
`;

export default function ProductsGrid({products}){

    return (
        <StyledProductsGrid>
            {products?.length > 0 && products.map(product => (
                <ProductBox key={product._id} {...product} />
            ))}
        </StyledProductsGrid>
    );
}