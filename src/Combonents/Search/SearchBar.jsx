// import React, { useState, useContext } from 'react';
// import './SearchBar.css';
// import SearchIcon from '@mui/icons-material/Search';
// import CloseIcon from '@mui/icons-material/Close';
// import { Card, Container, Row, Col, Button } from 'react-bootstrap';
// import { ShopContext } from '../../Context/Shop-contex';
// import { ProductData } from '../Products/Prodects';

// function SearchBar() {
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const { addToCart, cartItems } = useContext(ShopContext);
//   // const [item, setItem] = useState(ProductData);

//   const handleFilter = (event) => {
//     const searchWord = event.target.value;
//     setSearchTerm(searchWord);

//     if (searchWord.trim() === "") {
//       setFilteredData([]);
//     } else {
//       const newFilteredData = ProductData.filter((value) =>
//         value.name.toLowerCase().includes(searchWord.toLowerCase())
//       );
//       setFilteredData(newFilteredData);
//     }
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//     setFilteredData([]);
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       // Optional: Add functionality on Enter key press
//     }
//   };

  

//   return (
//     <div className='search'>
//       <div className='searchInput'>
//         <input
//           type='text'
//           placeholder='Search products...'
//           value={searchTerm}
//           onChange={handleFilter}
//           onKeyPress={handleKeyPress}
//         />
//         <div className='searchIcon'>
//           {filteredData.length === 0 && <SearchIcon />}
//           {searchTerm && <CloseIcon className='clearIcon' onClick={clearSearch} />}
//         </div>
//       </div>

//       {filteredData.length !== 0 && (
//         <div className='dataResult'>
//           <Container>
//             <Row>
//               {filteredData.slice(0, 4).map((value, key) => {
//                 const cartItemAmount = cartItems[value.id];
//                 return (
//                   <Col key={value.id} sm={12} md={6} lg={4} className="mb-4">
//                     <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
//                       <Card.Img variant="top" src={value.image} alt={value.title} />
//                       <Card.Body>
//                         <Card.Title>{value.title}</Card.Title>
//                         <Card.Text><strong>{value.name}</strong></Card.Text>
//                         <Card.Text>{value.type}</Card.Text>
//                         <Card.Text>₹{value.price}</Card.Text>
                        
//                         <Button variant='primary' className='addTocartBttn' onClick={() => addToCart(value.id)}>
//                           Add to Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
//                         </Button>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 );
//               })}
//             </Row>
//           </Container>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchBar;



import React, { useState, useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { ShopContext } from '../../Context/Shop-contex';
import { ProductData } from '../Products/Prodects';

function SearchBar() {
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart, cartItems } = useContext(ShopContext);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setSearchTerm(searchWord);

    if (searchWord.trim() === '') {
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

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="flex items-center border-b border-gray-300 py-2">
        <input
          type="text"
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleFilter}
        />
        <div className="flex items-center">
          {filteredData.length === 0 && <SearchIcon className="text-gray-400" />}
          {searchTerm && <CloseIcon className="text-gray-400 cursor-pointer" onClick={clearSearch} />}
        </div>
      </div>

      {/* Display Search Results */}
      {filteredData.length !== 0 && (
        <div className="absolute w-full bg-white shadow-lg max-h-60 overflow-y-auto mt-1 rounded-lg z-10">
          {filteredData.slice(0, 4).map((value) => {
            const cartItemAmount = cartItems[value.id];
            return (
              <div key={value.id} className="p-2 hover:bg-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{value.title}</p>
                  <p className="text-xs text-gray-500">{value.name}</p>
                </div>
                <button
                  className="bg-blue-500 text-white text-xs py-1 px-2 rounded"
                  onClick={() => addToCart(value.id)}
                >
                  Add to Cart {cartItemAmount > 0 && `(${cartItemAmount})`}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;



