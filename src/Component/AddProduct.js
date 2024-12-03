import React from "react";

const AddProduct = () => {
    const [name, setProduct] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);

    const addProduct = async () => {
        // Validation to ensure no field is empty
        if (!name || !price || !category || !company) {
            setError(true);
            return;
        }
        
        // Retrieve user ID from localStorage
        const userID = JSON.parse(localStorage.getItem('user'))._id;

        // Send product data to the backend
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'POST',
            body: JSON.stringify({ name, price, category, company, userID }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            
            }
        });

        result = await result.json();
        console.warn(result);

        // Optional: Reset form fields and clear errors
        if (result) {
            setProduct('');
            setPrice('');
            setCategory('');
            setCompany('');
            setError(false);
            // You can add a success message here if desired
        }
    }

    return (
        <div>
            <h1 className="addProdHeading">Add Product</h1>
            <input
                className="inputbox box"
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setProduct(e.target.value)}
            />
            {error && !name && <span className="invalid-input">Enter a valid name</span>}

            <input
                className="inputbox box"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className="invalid-input">Enter a valid price</span>}

            <input
                className="inputbox box"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            {error && !category && <span className="invalid-input">Enter a valid category</span>}

            <input
                className="inputbox box"
                type="text"
                placeholder="Enter company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            {error && !company && <span className="invalid-input">Enter a valid company</span>}

            <button className="submitbutton btn" onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;
