import styled from "styled-components";
import CenterMenu from "./CenterMenu";
import ProductBox from "./ProductBox";

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 30px;
    height: 100%;
    
`;

const Title = styled.h2`
    font-weight: bold;
    font-size: 2rem;
    margin: 0;
`;

export default function NewProducts({products}) {
    return (
    <CenterMenu>
        <Title>New Arrivals</Title>
        <ProductsGrid>
            {products?.length > 0 && products.map(product => (
                <ProductBox {...product} />
            ))}
        </ProductsGrid>
    </CenterMenu>
    );
}