import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';

function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

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
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default ProductDetails;
