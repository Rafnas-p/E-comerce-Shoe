import React, { useState, useContext } from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { ShopContext } from './Context/Shop-contex';
import { ProductData } from './Products/Prodects';

function SearchBar() {
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart, cartItems } = useContext(ShopContext);
  // const [item, setItem] = useState(ProductData);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setSearchTerm(searchWord);

    if (searchWord.trim() === "") {
      setFilteredData([]);
    } else {
      const newFilteredData = ProductData.filter((value) =>
        value.name.toLowerCase().includes(searchWord.toLowerCase())
      );
      setFilteredData(newFilteredData);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredData([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Optional: Add functionality on Enter key press
    }
  };

  

  return (
    <div className='search'>
      <div className='searchInput'>
        <input
          type='text'
          placeholder='Search products...'
          value={searchTerm}
          onChange={handleFilter}
          onKeyPress={handleKeyPress}
        />
        <div className='searchIcon'>
          {filteredData.length === 0 && <SearchIcon />}
          {searchTerm && <CloseIcon className='clearIcon' onClick={clearSearch} />}
        </div>
      </div>

      {filteredData.length !== 0 && (
        <div className='dataResult'>
          <Container>
            <Row>
              {filteredData.slice(0, 4).map((value, key) => {
                const cartItemAmount = cartItems[value.id];
                return (
                  <Col key={value.id} sm={12} md={6} lg={4} className="mb-4">
                    <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
                      <Card.Img variant="top" src={value.image} alt={value.title} />
                      <Card.Body>
                        <Card.Title>{value.title}</Card.Title>
                        <Card.Text><strong>{value.name}</strong></Card.Text>
                        <Card.Text>{value.type}</Card.Text>
                        <Card.Text>₹{value.price}</Card.Text>
                        
                        <Button variant='primary' className='addTocartBttn' onClick={() => addToCart(value.id)}>
                          Add to Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}

export default SearchBar;


