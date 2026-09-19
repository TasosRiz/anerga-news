import React, { useRef } from "react";
import "./Slider.css";

const Slider = ({
    children,
    direction = "horizontal",
    scrollAmount = 320,
}) => {
    const sliderRef = useRef(null);

    const isVertical = direction === "vertical";

    const scrollPrevious = () => {
        sliderRef.current?.scrollBy({
            [isVertical ? "top" : "left"]: -scrollAmount,
            behavior: "smooth",
        });
    };

    const scrollNext = () => {
        sliderRef.current?.scrollBy({
            [isVertical ? "top" : "left"]: scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className={`slider slider-${direction}`}>
            <button
                type="button"
                className="slider-arrow slider-arrow-previous"
                onClick={scrollPrevious}
                aria-label="Previous"
            >
                {isVertical ? "↑" : "‹"}
            </button>

            <div
                className={`slider-track slider-track-${direction}`}
                ref={sliderRef}
            >
                {children}
            </div>

            <button
                type="button"
                className="slider-arrow slider-arrow-next"
                onClick={scrollNext}
                aria-label="Next"
            >
                {isVertical ? "↓" : "›"}
            </button>
        </div>
    );
};

export default Slider;