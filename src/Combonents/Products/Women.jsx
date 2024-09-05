import React, { useState, useContext } from 'react';
import { ProductData } from './Prodects';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { ShopContext } from "../../Context/Shop-contex";
import './collection.css';
import { useNavigate } from 'react-router-dom';
function Women() {
  // Filter products by type "women" and set initial state
  const [item, setItem] = useState(ProductData.filter(item => item.type === "women"));
  const { addToCart, cartItems } = useContext(ShopContext);
const navigate=useNavigate()
const handleViewDetails = (id) => {
  navigate(`/productDetails/${id}`); 
};
  return (
    <Container>
<h1 className="text-4xl font-extrabold text-center my-4 
               bg-gradient-to-r from-red-500 via-red-600 to-red-700 
               text-transparent bg-clip-text 
               shadow-lg py-2 px-4 rounded-md">
 Women
</h1>

      <Row>
        {item.map((iteme) => {
          const cartItemAmount = cartItems[iteme.id];
          return (
            <Col key={iteme.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
              <Card.Img 
                  variant="top" 
                  src={iteme.image} 
                  alt={iteme.title} 
                  onClick={() => handleViewDetails(iteme.id)} 
                  style={{ cursor: 'pointer' }} 
                />
                <Card.Body>
                  <Card.Title>{iteme.title}</Card.Title>
                  <Card.Text><strong>{iteme.name}</strong></Card.Text>
                  <Card.Text>{iteme.type}</Card.Text>
                  <Card.Text>₹{iteme.price}</Card.Text>
                 
                  <Button variant='primary' className='addTocartBttn' onClick={() => addToCart(iteme.id)}>
                    Add to Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Women;
