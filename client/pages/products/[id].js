import Box from "@/components/Box";
import { CartContext } from "@/components/CartContext";
import CartIcon from "@/components/CartIcon";
import CenterMenu from "@/components/CenterMenu";
import Header from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import ProductImages from "@/components/ProductImages";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: .8fr 1fr;
    gap: 40px;
    margin-top: 40px;
`;

const Title = styled.h1`
    font-size: 2rem;
`;

const Price = styled.div`
    display: flex;
    gap: 20px;
    font-size: 2rem;
    font-weight: bold;
    align-items: center;
`;

export default function ProductPage({product}){
    const {addProduct} = useContext(CartContext);

    return (
        <>
            <Header />
            <CenterMenu>
                <Wrapper>
                    <Box>
                        <ProductImages images={product.images}/>
                    </Box>
                    <div>
                        <Title>{product.name}</Title>
                        <p>{product.description}</p>
                        <Price>
                            <PrimaryButton onClick={() => addProduct(product._id)} size="l"><CartIcon />Add to Cart</PrimaryButton>
                            {product.price} lei
                        </Price>        
                    </div>
                </Wrapper>
            </CenterMenu>
        </>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    return{
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}