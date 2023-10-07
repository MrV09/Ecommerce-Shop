import { useRouter } from "next/router";
import {useState} from "react";
import axios from "axios";

export default function ProductForm({_id,name:existingName,description:existingDescription,price:existingPrice,images:existingImages,}){
    const [name, setName] = useState(existingName || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [goTOProducts, setGoToProducts] = useState(false);
    const router = useRouter();

    async function saveProduct(ev){
        ev.preventDefault();
        const product = {
            name,
            description,
            price,
            images,
        };
        if(_id){     
            await axios.put('/api/products', {...product, _id});
        } else {
            await axios.post('/api/products', product);
        }
        setGoToProducts(true);
    }
    if(goTOProducts){
        router.push('/products');
    }
    async function uploadImages(ev){
        const files = ev.target?.files;
        if(files?.length > 0){
            const data = new FormData();
            for(const file of files){
                data.append('file', file);
            }
            const response = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...response.data.links];
            });
        }
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Product Name</label>
            <input type="text" placeholder="Product name" value={name} onChange={ev => setName(ev.target.value)}/>
            <label>Images</label>
            <div className="mb-2 flex-wrap gap-2 py-2">
                {!!images?.length && images.map(link =>(
                    <div key={link} className="h-20 rounded-lg">
                        <img src={link} />
                    </div>
                ))}
                <label className="cursor-pointer w-20 h-20 bg-blue-300 border font-bold flex items-center text-center">
                    <div>Add new photo +</div>
                    <input type="file" onChange={uploadImages} className="hidden"/>
                </label>
                {!images?.length && (
                   <div>No images</div> 
                )}
            </div>
            <label>Product Description</label>
            <textarea placeholder="Description" value={description} onChange={ev => setDescription(ev.target.value)} ></textarea>
            <label>Product Price (in EUR)</label>
            <input type="number" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)} />
            <button type="submit" className="btn_primary">Save Product</button>
        </form>
    )
}