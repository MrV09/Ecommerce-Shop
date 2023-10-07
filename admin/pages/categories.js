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
const [properties, setProperties] = useState([]);

useEffect(() => {
    fetchCategories();
}, []);

function fetchCategories(){
    axios.get('/api/categories').then(result => {
        setCategories(result.data);
    });
}

async function saveCategory(ev){
    ev.preventDefault();
    const data = {name, parentCategory,properties:properties.map(property => ({name:property.name,values:property.values.split(',')})),};
    if(editedCategory){
        data._id = editedCategory._id;
        await axios.put('/api/categories', data);
        setEditedCategory(null);
    } else {
        await axios.post('/api/categories', data);
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
}

function editCategory(category){
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(category.properties);
}

function deleteCategory(category){
    Swal.fire({
        title: 'Deleting Category!',
        text: `Do you really want to delete '${category.name}'?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel!',
        confirmButtonText: 'Confirm!',
        confirmButtonColor: '#0B5DCD'
    }).then(async result => {
        if(result.isConfirmed){
            const {_id} = category;
            await axios.delete('/api/categories?_id='+_id);
            fetchCategories();
        }
    });
}

function addProperty(){
    setProperties(old => {
        return [...old, {name: '', values: ''}];
    });
}

function updatePropertyName(index, property, newName){
    setProperties(old => {
        const properties = [...old];
        properties[index].name = newName;
        return properties;
    });
}

function updatePropertyValues(index, property, newValues){
    setProperties(old => {
        const properties = [...old];
        properties[index].values = newValues;
        return properties;
    });
}

function removeProperty(indexToRemove){
    setProperties(old => {
        return [...old].filter((p,index) => {
            return index !== indexToRemove;
        });
    });
}

    return(
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit Category: ${editedCategory.name}` : 'New Category Name'}</label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-1">
                <input className="h-16" type="text" placeholder={"Category name"} value={name} onChange={ev => setName(ev.target.value)}/>
                <select className="" value={parentCategory} onChange={ev => setParentCategory(ev.target.value)}>
                    <option value="">No parent category</option>
                    {categories.length > 0 && categories.map(category => (
                        <option value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                </div>
                <div className="mb-4">
                    <label className="block">Properties</label>
                    <button onClick={addProperty} type="button" className="btn_primary text-sm mb-2">Add new property</button>
                    {properties.length > 0 && properties.map((property, index) => (
                        <div className="flex gap-1 mb-2">
                            <input className="mb-0" type="text" value={property.name} onChange={ev => updatePropertyName(index, property, ev.target.value)} placeholder="Property name"/>
                            <input className="mb-0" type="text" value={property.values} onChange={ev => updatePropertyValues(index, property, ev.target.value)} placeholder="Values, separated by ','"/>
                            <button type="button" onClick={() => removeProperty(index)} className="btn_primary">Remove</button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2 h-12">
                {editedCategory && (
                    <button type="button" onClick={() => {setEditedCategory(null); setName(''); setParentCategory(''); setProperties([]);}} className="btn_primary">Cancel</button>
                )}
                <button type="submit" className="btn_primary h-12 py-1">Add Category!</button>
                </div>
            </form>
            {!editedCategory && (
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
            )}         
        </Layout>
    );
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal} />
));