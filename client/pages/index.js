import FeaturedProduct from "@/components/FeaturedProduct";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

const Bg = styled.div`
background: rgb(142,255,135);
background: linear-gradient(90deg, rgba(142,255,135,1) 0%, rgba(30,175,26,1) 38%, rgba(8,190,50,1) 100%);
  height: 100vh;
`;

export default function Home({featuredProduct, newProducts}) {
  return (
      <Bg>
        <Header /> 
        <FeaturedProduct featuredProduct={featuredProduct} />
        <NewProducts products={newProducts} />
      </Bg>
  );
}

export async function getServerSideProps(){
  const featuredProductId = '65212944553b56fb83d5d90e';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit: 12});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    }
  }
}
