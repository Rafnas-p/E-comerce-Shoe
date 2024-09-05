
import React, { useContext, useState } from 'react';
import { Card, Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import './collection.css';
import { ShopContext } from '../../Context/Shop-contex';
import { useNavigate } from 'react-router';

function Collection() {
  const [filter, setFilter] = useState('all');
  const { addToCart, cartItems, products } = useContext(ShopContext); 
  const navigate = useNavigate();

  const isLogged = JSON.parse(localStorage.getItem('isLoggedIn'));

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleViewDetails = (id) => {
    navigate(`/productDetails/${id}`); // Corrected path
  };

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(product => product.type === filter);

  return (
    <Container>
      <h1 className="text-4xl font-extrabold text-center my-4 
               bg-gradient-to-r from-red-500 via-red-600 to-red-700 
               text-transparent bg-clip-text 
               shadow-lg py-2 px-4 rounded-md">
  Shope
</h1>

      <Dropdown onSelect={handleFilterChange} className="filter-dropdown">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter by Category
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="all">All</Dropdown.Item>
          <Dropdown.Item eventKey="men">Men</Dropdown.Item>
          <Dropdown.Item eventKey="women">Women</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Row>
        {filteredProducts.map((iteme) => {
          const cartItemAmount = cartItems[iteme.id]; 
          return (
            <Col key={iteme.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="product-item shadow p-3 mb-5 bg-body-tertiary rounded">
                
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

                  <Button variant='primary' className='addTocartBttn' onClick={() => isLogged ? addToCart(iteme.id) : (alert('Please Login'), navigate('/login'))}>
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

export default Collection;
