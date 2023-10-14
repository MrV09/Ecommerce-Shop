import CenterMenu from "@/components/CenterMenu";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

const Title = styled.h1`
    font-size: 2em;
    font-weight: bold;
`;

export default function ProductsPage({products}){
    return (
        <>
            <Header />
            <CenterMenu>
                <Title>All Products</Title>
                <ProductsGrid products={products} />
            </CenterMenu>
        </>   
    );
}

export async function getServerSideProps(){
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    return {
        props:{
            products: JSON.parse(JSON.stringify(products)),
        }
    };
}