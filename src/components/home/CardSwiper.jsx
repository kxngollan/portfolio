"use client";

import { useEffect, useRef, useState } from "react";
import "./CardSwiper.css";
import "./CardImages.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CardSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const groupsRef = useRef([]);

  useEffect(() => {
    groupsRef.current = Array.from(
      document.getElementsByClassName("card-group")
    );
  }, []);

  const handleLoveClick = () => {
    if (groupsRef.current.length === 0) return;

    const nextIndex =
      activeIndex + 1 <= groupsRef.current.length - 1 ? activeIndex + 1 : 0;

    const currentGroup = document.querySelector(
      `[data-index="${activeIndex}"]`
    );
    const nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);

    currentGroup.dataset.status = "after";
    nextGroup.dataset.status = "becoming-active-from-before";

    setTimeout(() => {
      nextGroup.dataset.status = "active";
      setActiveIndex(nextIndex);
    });
  };

  const handleHateClick = () => {
    if (groupsRef.current.length === 0) return;

    const nextIndex =
      activeIndex - 1 >= 0 ? activeIndex - 1 : groupsRef.current.length - 1;

    const currentGroup = document.querySelector(
      `[data-index="${activeIndex}"]`
    );
    const nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);

    currentGroup.dataset.status = "before";
    nextGroup.dataset.status = "becoming-active-from-after";

    setTimeout(() => {
      nextGroup.dataset.status = "active";
      setActiveIndex(nextIndex);
    });
  };

  return (
    <div className="card-swiper">
      <div className="card-groups">
        <div className="card-group" data-index="0" data-status="active">
          <div className="little-card card"></div>
          <div className="big-card card"></div>
          <div className="little-card card"></div>
          <div className="big-card card"></div>
          <div className="little-card card"></div>
          <div className="big-card card"></div>
          <div className="little-card card"></div>
          <div className="big-card card"></div>
        </div>
        <div className="card-group" data-index="1" data-status="unknown">
          <div className="little-card card"></div>
          <div className="big-card card"></div>
          <div className="little-card card"></div>
          <div className="big-card card"></div>
          <div className="little-card card"></div>
          <div className="big-card card"></div>
          <div className="little-card card"></div>
          <div className="big-card card"></div>
        </div>
        <div className="card-group" data-index="2" data-status="unknown">
          <div className="little-card card"></div>
          <div className="big-card card"></div>
          <div className="little-card card"></div>
          <div className="big-card card"></div>
          <div className="little-card card"></div>
          <div className="big-card card"></div>
          <div className="little-card card"></div>
          <div className="big-card card"></div>
        </div>
        <div className="card-group" data-index="3" data-status="unknown">
          <div className="little-card card"></div>
          <div className="big-card card"></div>
          <div className="little-card card"></div>
          <div className="big-card card"></div>
          <div className="little-card card"></div>
          <div className="big-card card"></div>
          <div className="little-card card"></div>
          <div className="big-card card"></div>
        </div>
      </div>
      <div className="card-swiper-buttons">
        <button id="hate-button" onClick={handleHateClick}>
          <FaArrowLeft />
        </button>
        <button id="love-button" onClick={handleLoveClick}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CardSwiper;
