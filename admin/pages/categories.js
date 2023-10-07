import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import {withSwal} from "react-sweetalert2";
import Swal from "sweetalert2";

function Categories(swal){
const [editedCategory, setEditedCategory] = useState(null);
const [name, setName] = useState("");
const [parentCategory, setParentCategory] = useState("");
const [categories, setCategories] = useState([]);

useEffect(() => {
    fetchCategories();
}, []);

function fetchCategories(){
    axios.get('/api/categories').then(result => {
        setCategories(result.data);
    });
}

async function saveCategory(ev){
    const data = {name, parentCategory};
    ev.preventDefault();
    if(editedCategory){
        data._id = editedCategory._id;
        await axios.put('/api/categories', data);
        setEditedCategory(null);
    } else {
        await axios.post('/api/categories', data);
    }
    setName("");
    fetchCategories();
}

function editCategory(category){
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
}

function deleteCategory(category){
    Swal.fire({
        title: 'Deleting Category!',
        text: `Do you really want to delete '${category.name}'?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel!',
        confirmButtonText: 'Confirm!',
        confirmButtonColor: '#0B5DCD'
    }).then(result => {

    }).catch(error => {

    });
}

    return(
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit Category: ${editedCategory.name}` : 'New Category Name'}</label>
            <form onSubmit={saveCategory} className="flex gap-2">
                <input className="mb-0 h-16" type="text" placeholder={"Category name"} value={name} onChange={ev => setName(ev.target.value)}/>
                <select className="mb-0" value={parentCategory} onChange={ev => setParentCategory(ev.target.value)}>
                    <option value="">No parent category</option>
                    {categories.length > 0 && categories.map(category => (
                        <option value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button type="submit" className="btn_primary h-16 py-1">Add Category!</button>
            </form>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td className="font-bold">Category name</td>
                        <td className="font-bold">Parent Category</td>
                        <td className="font-bold w-32">Modify Category</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td>
                                <div className="flex justify-center">
                                    <button onClick={() => editCategory(category)} className="btn_primary mr-2">Edit</button>
                                    <button onClick={() => deleteCategory(category)} className="btn_red">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal} />
));