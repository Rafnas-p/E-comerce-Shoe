import React, { useContext, useState } from "react";
import "./admin.css";
import Cookie from "js-cookie";
const Addproduct = ({setRefresh}) => {
  const token = Cookie.get("token");
  

  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    type: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting product:", newProduct);

    try {
      const response = await fetch("http://localhost:3002/admin/creatProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      
      console.log("Product added response:", data);
      setRefresh(data)

      setNewProduct({
        name: "",
        type: "",
        price: "",
        image: "",
        description: "",
      });


      setShowForm(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
   

  return (
    <>
      <button className="btn-dlt" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add New Product"}
      </button>

      {showForm && (
        <div className="add-product-form">
          <h2>Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                name="type"
                value={newProduct.type}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">Add Product</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Addproduct;
