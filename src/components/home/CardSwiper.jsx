"use client";

import { useState } from "react";
import "./CardSwiper.css";
import "./CardImages.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CardSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const cardGroups = [0, 1, 2, 3];

  const handleNextClick = () => {
    const nextIndex = (activeIndex + 1) % cardGroups.length;
    setActiveIndex(nextIndex);
  };

  const handlePrevClick = () => {
    const prevIndex = (activeIndex - 1 + cardGroups.length) % cardGroups.length;
    setActiveIndex(prevIndex);
  };

  return (
    <div className="card-swiper">
      <div className="card-groups">
        {cardGroups.map((_, index) => (
          <div
            key={index}
            className={`card-group ${index === activeIndex ? "active" : ""}`}
          >
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`${i % 2 === 0 ? "little-card" : "big-card"} card`}
                ></div>
              ))}
          </div>
        ))}
      </div>
      <div className="card-swiper-buttons">
        <button
          id="prev-button"
          onClick={handlePrevClick}
          aria-label="Previous cards"
        >
          <FaArrowLeft />
        </button>
        <button
          id="next-button"
          onClick={handleNextClick}
          aria-label="Next cards"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CardSwiper;
