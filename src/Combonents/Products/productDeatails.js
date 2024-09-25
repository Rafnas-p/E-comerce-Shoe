import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap';
import { ShopContext } from "../../Context/Shop-contex";
import Cookie from 'js-cookie';

function ProductDetails() {
  const { id } = useParams(); 
  const { addToCart, cartItems } = useContext(ShopContext); 
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const isLogged = Cookie.get('token'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3002/users/product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product.');
        }
        const data = await response.json(); 
        setProduct(data); 
        setLoading(false); 
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product.");
        setLoading(false);
      }
    };

    fetchProduct(); 
  }, [id]);

  const handleAddToCart = () => {
    if (isLogged) {
      addToCart(product._id);
    } else {
      alert('Please log in to add to cart.');
      navigate('/login');
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <Container className="my-5 d-flex justify-content-center">
      {product && (
        <Card style={{ maxWidth: '20rem' }} className="shadow p-3 mb-5 bg-body-tertiary rounded">
          <Card.Img variant="top" src={product.image} alt={product.name} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Price: ₹{product.price}</Card.Text>
            <Button 
              variant='dark' 
              className='w-100' 
              onClick={handleAddToCart}
            >
              Add to Cart {cartItems[product._id] > 0 && `(${cartItems[product._id]})`}
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default ProductDetails;
