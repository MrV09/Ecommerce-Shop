import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function DeleteProductPage(){
    const router = useRouter();
    const {id} = router.query;
    const [productInfo, setProductInfo] = useState();//[name, setName] = useState('');
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data);
    });
}, [id]);

    function goBack(){
        router.push('/products');
    }

    async function deleteProduct(){
        await axios.delete('/api/products?id='+id);
        goBack();
    }

    return (
        <Layout>
            <h1 className="text-center">Do you really want to delete this product: "{productInfo?.name}" ?</h1>
            <div className="flex gap-5 justify-center">
                <button className="btn_red" onClick={deleteProduct}>Yes!</button>
                <button className="btn_primary" onClick={goBack}>No!</button>
            </div>
        </Layout>
    );
}