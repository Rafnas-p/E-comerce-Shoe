import React, { useState, useContext, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { ShopContext } from "../../Context/Shop-contex";
import './collection.css';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import { FiHeart } from 'react-icons/fi';

function Men() {
  const { addToCart, cartItems, products, addwishlist, wishlist } = useContext(ShopContext);
  const [item, setItem] = useState([]);
  const isLogged = Cookie.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    setItem(products.filter(item => item.type === "men"));
  }, [products]);

  const handleViewDetails = (id) => {
    navigate(`/productDetails/${id}`); 
  };

  const handleWishlistToggle = (productId) => {
    if (isLogged) {
      addwishlist(productId);
    } else {
      alert('Please log in to add to wishlist.');
      navigate('/login');
    }
  };

  return (
    <Container>
      <h1 className="text-4xl font-extrabold text-center my-4 
                 bg-gradient-to-r from-red-500 via-red-600 to-red-700 
                 text-transparent bg-clip-text 
                 shadow-lg py-2 px-4 rounded-md">
        Men
      </h1>

      <Row>
        {item.map((iteme) => {
          const cartItemAmount = cartItems[iteme._id];
          const itemInWishlist = wishlist && wishlist.some(wishItem => 
            wishItem && wishItem._id && wishItem._id.equals(iteme._id)
          );

          return (
            <Col key={iteme._id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="shadow p-3 mb-5 bg-body-tertiary rounded relative">
                <div className="relative">
                  <Card.Img 
                    variant="top" 
                    src={iteme.image} 
                    alt={iteme.title} 
                    onClick={() => handleViewDetails(iteme._id)} 
                    className="cursor-pointer" 
                  />
                  <FiHeart
                    size={24}
                    onClick={() => handleWishlistToggle(iteme._id)}
                    className={`absolute top-2 right-2 cursor-pointer transition-colors duration-200 ${itemInWishlist ? 'text-red-500 fill-current' : 'text-gray-500 fill-none'}`}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{iteme.title}</Card.Title>
                  <Card.Text><strong>{iteme.name}</strong></Card.Text>
                  <Card.Text>{iteme.type}</Card.Text>
                  <Card.Text>₹{iteme.price}</Card.Text>
                  <Button variant='primary' className='addTocartBttn' onClick={() => isLogged ? addToCart(iteme._id) : (alert('Please Login'), navigate('/login'))}>
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
