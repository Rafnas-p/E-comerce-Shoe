import React, { useContext} from 'react';
import AdminNav from './AdminNav';
import ProductFilter from './Prodectfilter';
import Addproduct from './Addproduct';
import './admin.css';
import { ShopContext } from '../Context/Shop-contex';

function Admin() {
 
 
const {products, setProducts}=useContext(ShopContext)
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  return (
    <>
       <AdminNav/>
      <div>
        <h1>Prodect deatials</h1>
        <Addproduct onAddProduct={handleAddProduct} />
        <ProductFilter
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>
    </>
  );
}

export default Admin;
