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

const Bg = styled.div`
    background: rgb(169,255,157);
    background: linear-gradient(90deg, rgba(169,255,157,1) 0%, rgba(106,233,138,1) 42%, rgba(0,244,44,1) 100%);
`;

export default function ProductsPage({products}){
    return (
        <Bg>
            <Header />
            <CenterMenu>
                <Title>All Products</Title>
                <ProductsGrid products={products} />
            </CenterMenu>
        </Bg>   
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