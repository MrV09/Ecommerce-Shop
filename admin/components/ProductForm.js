import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ProductForm({_id,name:existingName,description:existingDescription,price:existingPrice,images:existingImages,category:existingCategory,}){
    const [name, setName] = useState(existingName || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [category, setCategory] = useState(existingCategory || '');
    const [goTOProducts, setGoToProducts] = useState(false);
    const [categories, setCategories] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data); 
        })
    }, []);

    async function saveProduct(ev){
        ev.preventDefault();
        const product = {
            name,
            description,
            price,
            images,
            category,
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

    const allProperties = [];
    if(categories.length > 0 && category){
        let categoryInfo = categories.find(({_id}) => _id === category);
        allProperties.push(...categoryInfo.properties);
        while(categoryInfo?.parent?._id){
            const parentCat = categories.find(({_id}) => _id === categoryInfo?.parent?._id);
            allProperties.push(...parentCat.properties);
            categoryInfo = parentCat;
        }
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Product Name</label>
            <input type="text" placeholder="Product name" value={name} onChange={ev => setName(ev.target.value)}/>
            <label>Product Category</label>
            <select value={category} onChange={ev => setCategory(ev.target.value)}>
                <option value="">No Category</option>
                {categories.length > 0 && categories.map(category => (
                    <option value={category._id}>{category.name}</option>
                ))}
            </select>
            {allProperties.length > 0 && allProperties.map(property => (
                <div className="flex gap-2">
                    <div>
                        {property.name}
                    </div>
                </div>
            ))}
            <label>Images</label>
            <div className="mb-2 flex gap-2 py-2">
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
            <label>Product Price (in RON)</label>
            <input type="number" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)} />
            <button type="submit" className="btn_primary">Save Product</button>
        </form>
    )
}