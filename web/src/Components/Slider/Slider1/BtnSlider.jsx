import React from "react";
import "./Slider.css";

function BtnSlider({ moveSlide, direction }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img
        src={direction === "next" ? "/icons/right-arrow.png" : "/icons/left-arrow.png"}
        alt={direction === "next" ? "Next slide" : "Previous slide"}
      />
    </button>
  );
}

export default BtnSlider;
