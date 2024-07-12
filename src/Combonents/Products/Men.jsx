import React, { useState, useContext } from 'react';
import { ProductData } from './Prodects';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { ShopContext } from "../Context/Shop-contex";
import './collection.css';
function Men() {
  const [item, setItem] = useState(ProductData.filter(product => product.type === "men"));
  const { addToCart, cartItems } = useContext(ShopContext);


  return (
    <Container>
      <h1 className='text-danger text-center my-4'>Men</h1>
      <Row>
        {item.map((iteme) => {
          const cartItemAmount = cartItems[iteme.id];
          return (
            <Col key={iteme.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
                <Card.Img variant="top" src={iteme.image} alt={iteme.title} />
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

export default Men;
