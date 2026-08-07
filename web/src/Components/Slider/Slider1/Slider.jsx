import React, { useState } from 'react'
import './Slider.css'
import dataSlider from './dataSlider'
import BtnSlider from './BtnSlider'

function Slider() {
  const [slideIndex, setSlideIndex] = useState(1)

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1)
    } else {
      setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
    } else {
      setSlideIndex(dataSlider.length)
    }
  }

  const moveDot = index => {
    setSlideIndex(index)
  }

  return (
    <div className="container-slider">
      {dataSlider.map((obj, index) => (
        <div
          key={obj.id}
          className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
        >
          <img src={`/Imgs/img${index + 1}.jpg`} alt="slide" />
        </div>
      ))}

      <BtnSlider moveSlide={nextSlide} direction="next" />
      <BtnSlider moveSlide={prevSlide} direction="prev" />

      <div className="container-dots">
        {Array.from({ length: dataSlider.length }).map((_, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active-anim" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Slider
