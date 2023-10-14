import styled from "styled-components";
import CenterMenu from "./CenterMenu";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
    font-weight: bold;
    font-size: 2rem;
    margin: 0;
`;

export default function NewProducts({products}) {
    return (
    <CenterMenu>
        <Title>New Arrivals</Title>
        <ProductsGrid products={products} />
    </CenterMenu>
    );
}