import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home2() {
  return (
    <>  
      <div className='home-container'>
        <div className='homeImg2'></div>
        <div className="about-us-section">
          <h2>About Us</h2>
          <p>
            Welcome to Wano Shops! We provide the finest selection of products designed for comfort and sustainability.
          </p>
          <p>
            Our products combine style, comfort, and environmental responsibility, using eco-friendly materials and ethical manufacturing processes.
          </p>
          <p>
            We are committed to reducing our environmental footprint and ensuring respect for both people and the planet.
          </p>
          <a href="/about" className="read-more-link">READ MORE</a>
        </div>
      </div>
    </>
  );
}

export default Home2;
