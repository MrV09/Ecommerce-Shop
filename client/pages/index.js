import FeaturedProduct from "@/components/FeaturedProduct";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

const Bg = styled.div`
  background: rgb(169,255,157);
  background: linear-gradient(90deg, rgba(169,255,157,1) 0%, rgba(106,233,138,1) 42%, rgba(0,244,44,1) 100%);
  
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
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit: 8});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    }
  }
}
