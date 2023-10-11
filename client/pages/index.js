import FeaturedProduct from "@/components/FeaturedProduct";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

const Bg = styled.div`
  background-color: #222;
  height: 100vh;
`;

export default function Home({featuredProduct}) {
  return (
      <Bg>
        <Header /> 
        <FeaturedProduct featuredProduct={featuredProduct} />
      </Bg>
  );
}

export async function getServerSideProps(){
  const featuredProductId = '65212944553b56fb83d5d90e';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  return {
    props: {featuredProduct: JSON.parse(JSON.stringify(featuredProduct))},
  }
}
