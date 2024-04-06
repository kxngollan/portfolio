import React from "react";
import "./PhotoGroup.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { PhotoArray } from "./PhotoArray";

const PhotoGroup = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageGoBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : PhotoArray.length - 1
    );
    console.log(currentIndex);
  };

  const imageGoForward = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < PhotoArray.length - 1 ? prevIndex + 1 : 0
    );
    console.log(currentIndex);
  };

  return (
    <div className="container">
      <div className="photo-swiper">
        <div className="card-groups">
          <div className="card-group">
            {PhotoArray[0].photos.map((photo, i) => (
              <React.Fragment key={i}>
                <div
                  className={`little-card card ${
                    currentIndex === 0 ? "" : "hidden"
                  }`}
                  style={{
                    backgroundImage: `url(${photo.little})`,
                    backgroundSize: "100% 100%",
                  }}
                ></div>
                <div
                  className={`big-card card ${
                    currentIndex === 0 ? "" : "hidden"
                  }`}
                  style={{
                    backgroundImage: `url(${photo.big})`,
                    backgroundSize: "100% 100%",
                  }}
                ></div>
              </React.Fragment>
            ))}
          </div>
          <div className="card-group">
            {PhotoArray[1].photos.map((photo, i) => (
              <React.Fragment key={i}>
                <div
                  className={`little-card card ${
                    currentIndex === 1 ? "" : "hidden"
                  }`}
                  style={{
                    backgroundImage: `url(${photo.little})`,
                    backgroundSize: "100% 100%",
                  }}
                ></div>
                <div
                  className={`big-card card ${
                    currentIndex === 1 ? "" : "hidden"
                  }`}
                  style={{
                    backgroundImage: `url(${photo.big})`,
                    backgroundSize: "100% 100%",
                  }}
                ></div>
              </React.Fragment>
            ))}
          </div>
          <div className="card-group">
            {PhotoArray[2].photos.map((photo, i) => (
              <React.Fragment key={i}>
                <div
                  className={`little-card card ${
                    currentIndex === 2 ? "" : "hidden"
                  }`}
                  style={{
                    backgroundImage: `url(${photo.little})`,
                    backgroundSize: "100% 100%",
                  }}
                ></div>
                <div
                  className={`big-card card ${
                    currentIndex === 2 ? "" : "hidden"
                  }`}
                  style={{
                    backgroundImage: `url(${photo.big})`,
                    backgroundSize: "100% 100%",
                  }}
                ></div>
              </React.Fragment>
            ))}
          </div>
          <div className="card-group">
            {PhotoArray[3].photos.map((photo, i) => (
              <React.Fragment key={i}>
                <div
                  className={`little-card card ${
                    currentIndex === 3 ? "" : "hidden"
                  }`}
                  style={{
                    backgroundImage: `url(${photo.little})`,
                    backgroundSize: "100% 100%",
                  }}
                ></div>
                <div
                  className={`big-card card ${
                    currentIndex === 3 ? "" : "hidden"
                  }`}
                  style={{
                    backgroundImage: `url(${photo.big})`,
                    backgroundSize: "100% 100%",
                  }}
                ></div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="photo-describe">
          <h2>{PhotoArray[currentIndex].title}</h2>
          <p>{PhotoArray[currentIndex].describe}</p>
        </div>
        <div className="photo-btn">
          <button onClick={imageGoBack}>
            <FaArrowLeft />
          </button>
          <button onClick={imageGoForward}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoGroup;
