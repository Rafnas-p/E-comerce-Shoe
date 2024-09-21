import React, { useContext, useState ,useEffect} from 'react';
import { Card, Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import './collection.css';
import { ShopContext } from '../../Context/Shop-contex';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FiHeart } from 'react-icons/fi';

function Collection() {
  const [filter, setFilter] = useState('all');
  const { addToCart, cartItems, products, addwishlist, wishlist } = useContext(ShopContext); 
  const[item,setItem]=useState([])
  const navigate = useNavigate();
  const isLogged = Cookies.get('token');

  useEffect(() => {
    setItem(products.filter(item => item.type === "women"));
  }, [products]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleViewDetails = (id) => {
    navigate(`/productDetails/${id}`);
  };

  const handleWishlistToggle = (productId) => {
    addwishlist(productId);
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
        Shop
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
      {item.map((iteme) => {
          const cartItemAmount = cartItems[iteme._id];
          const itemInWishlist = wishlist && wishlist.some(wishItem => 
            wishItem && wishItem._id && wishItem._id.equals(iteme._id)
          );
          return (
            <Col key={iteme._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="product-item shadow p-3 mb-5 bg-body-tertiary rounded">
                <div className="relative">
                  <Card.Img 
                    variant="top" 
                    src={iteme.image} 
                    alt={iteme.title} 
                    onClick={() => handleViewDetails(iteme._id)} 
                    style={{ cursor: 'pointer' }} 
                  />
                  <FiHeart
                    size={24}
                    onClick={() => handleWishlistToggle(iteme._id)}
                    className={`absolute top-2 right-2 cursor-pointer transition-colors duration-200 ${itemInWishlist ? 'text-red-500 fill-current' : 'text-gray-500 fill-none'}`}
                    style={{ fill: itemInWishlist ? 'red' : 'none' }} 
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

export default Collection;
