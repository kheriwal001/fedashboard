import React, { useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";


const UpdateProduct = () => {
    const [name, setProduct] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    const getProductDetails = useCallback(async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result);
        setProduct(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }, [params.id]);

    useEffect(() => {
        getProductDetails();
    },[getProductDetails]);

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        if (result) {
            navigate('/'); // Redirect after update
        }
    };

    return (
        <div>
            <h1 className="addProdHeading">Update Product</h1>
            <input
                className="inputbox box"
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setProduct(e.target.value)}
            />
            <input
                className="inputbox box"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                className="inputbox box"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                className="inputbox box"
                type="text"
                placeholder="Enter company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <button className="submitbutton btn" onClick={updateProduct}>Update Product</button>
        </div>
    );
};

export default UpdateProduct;
