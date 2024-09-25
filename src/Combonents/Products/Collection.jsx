import React, { useContext, useState, useEffect, useMemo } from "react";
import { Card, Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import "./collection.css";
import { ShopContext } from "../../Context/Shop-contex";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FiHeart } from "react-icons/fi";

function Collection() {
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, cartItems, addwishlist, wishlist, getwihlist } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const isLogged = Cookies.get("token");

  const [localWishlist, setLocalWishlist] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3002/users/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        await getwihlist(); 
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
      }
    };

    fetchWishlist();
  }, []); 

  useEffect(() => {
    if (products.length) {
      const updatedWishlist = products.map((product) => ({
        id: product._id,
        inWishlist:
          Array.isArray(wishlist) &&
          wishlist.some((wishItem) => wishItem._id === product._id),
      }));
      setLocalWishlist(updatedWishlist);
    }
  }, [wishlist, products]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleViewDetails = (id) => {
    navigate(`/productDetails/${id}`);
  };

  const handleWishlistToggle = (productId) => {
    if (isLogged) {
      addwishlist(productId);
      setLocalWishlist((prev) =>
        prev.map((item) =>
          item.id === productId
            ? { ...item, inWishlist: !item.inWishlist }
            : item
        )
      );
    } else {
      alert("Please log in to add to wishlist.");
      navigate("/login");
    }
  };

  const filteredProducts = useMemo(() => {
    return filter === "all"
      ? products
      : products.filter((product) => product.type === filter);
  }, [filter, products]);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error)
    return <p className="text-center text-xl text-red-600">Error: {error}</p>;

  return (
    <Container>
      <h1 className="text-4xl font-extrabold text-left my-4 text-black shadow-lg py-2 px-4">
        Shop
      </h1>
      <Dropdown onSelect={handleFilterChange} className="mb-4">
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
          const cartItemAmount = cartItems[iteme._id];
          const itemInWishlist = localWishlist.find(
            (item) => item.id === iteme._id
          )?.inWishlist;

          return (
            <Col key={iteme._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="shadow-lg transition-transform duration-300 hover:scale-105 rounded-lg overflow-hidden">
                <div className="relative">
                  <Card.Img
                    variant="top"
                    src={iteme.image}
                    alt={iteme.title}
                    onClick={() => handleViewDetails(iteme._id)}
                    className="cursor-pointer object-cover h-48 w-full"
                  />
                  <FiHeart
                    size={24}
                    onClick={() => handleWishlistToggle(iteme._id)}
                    className={`absolute top-2 right-2 cursor-pointer transition-colors duration-200 ${
                      itemInWishlist ? "text-red-500" : "text-gray-500"
                    }`}
                    style={{ fill: itemInWishlist ? "red" : "none" }}
                  />
                </div>
                <Card.Body className="p-4">
                  <Card.Title className="text-lg font-semibold">
                    {iteme.title}
                  </Card.Title>
                  <Card.Text className="text-gray-700">
                    <strong>{iteme.name}</strong>
                  </Card.Text>
                  <Card.Text className="text-gray-500">{iteme.type}</Card.Text>
                  <Card.Text className="text-lg font-bold">
                    ₹{iteme.price}
                  </Card.Text>
                  <div className="flex justify-center">
                    <Button
                      variant="primary"
                      className="addTocartBttn w-32 sm:w-40 md:w-48 mt-2 py-2 text-lg bg-black text-white rounded-lg transition duration-400 hover:bg-gray-800"
                      onClick={() =>
                        isLogged
                          ? addToCart(iteme._id)
                          : (alert("Please Login"), navigate("/login"))
                      }
                    >
                      Add to Cart{" "}
                      {cartItemAmount > 0 && <>({cartItemAmount})</>}
                    </Button>
                  </div>
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
