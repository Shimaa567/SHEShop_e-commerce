import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

const CarouselModel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} id="carousel">
      <Carousel.Item>
        <img
          className="d-block m-auto carousel-img"
          src="/images/slider.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h4>
            <img
              src="/images/fire.png"
              alt=""
              style={{ width: "30px", height: "30px", marginTop: "-11px" }}
            />
            Hot & New{" "}
          </h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block m-auto carousel-img"
          src="/images/slider3.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h4 style={{ color: "#f700ad" }}>​💄​👝​ Pretty & Simple</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block m-auto carousel-img"
          src="/images/slider1.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h4 style={{ color: "#d04013" }}>👗 Happy Friends Collection</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block m-auto carousel-img"
          src="/images/slider1.png"
          alt="Forth slide"
        />

        <Carousel.Caption>
          <h4 style={{ color: "#00cfff" }}> 🎀 Choose Your Identity !</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block  m-auto carousel-img"
          src="/images/slider4.jpg"
          alt="Fifth slide"
        />

        <Carousel.Caption>
          <h4 style={{ color: "#c02546" }}>
            📿✨ Every detail makes a difference
          </h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block  m-auto carousel-img"
          src="/images/slider2.jpg"
          alt="sixth slide"
        />
        <Carousel.Caption>
          <h4 style={{ color: "#005098" }}>👗 Your Elegance is our Passion</h4>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselModel;
