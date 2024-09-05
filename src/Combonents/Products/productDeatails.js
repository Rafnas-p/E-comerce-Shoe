// ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductData } from './Prodects'; // Import the product data
import { Card, Container } from 'react-bootstrap'; // Import Bootstrap components

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Find the product details based on the ID from the imported data
    const fetchProduct = () => {
      const productFound = ProductData.find((product) => product.id === parseInt(id));
      if (productFound) {
        setProduct(productFound);
      } else {
        console.error('Product not found');
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5 d-flex justify-content-center"> {/* Center the card */}
      <Card style={{ maxWidth: '20rem' }} className="shadow p-3 mb-5 bg-body-tertiary rounded"> {/* Set max-width for a smaller card */}
        <Card.Img variant="top" src={product.image} alt={product.name} /> {/* Display the product image */}
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Price: ₹{product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetails;
