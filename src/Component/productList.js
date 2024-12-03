import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            let result = await fetch('http://localhost:5000/products',{
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            setProducts(result);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    const deleteProduct = async (_id) => {
        console.warn(_id);
        let result = await fetch(`http://localhost:5000/product/${_id}`, {
            method: 'DELETE',
            headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            try {
                let result = await fetch(`http://localhost:5000/search/${key}`,{
                    headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
                });
                result = await result.json();
                if (result) {
                    setProducts(result);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        } else {
            getProducts();
        }
    }
    
    return (
        <div className="product-list">
            <h1>Products</h1>
            <input 
                type='text' 
                placeholder='Search product, category and more...' 
                className='search-product-key'
                onChange={searchHandle}
            />

            <ul>
                <li>S.No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {products && products.length > 0 ? (
                products.map((item, index) => (
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>
                    </ul>
                ))
            ) : (
                <p>No products found</p>
            )}
        </div>
    );
};

export default ProductList;
