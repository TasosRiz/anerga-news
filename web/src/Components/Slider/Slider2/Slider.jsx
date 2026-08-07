import React from 'react'
import './Slider.css'


//Kane  to pio geniko

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// Swiper styles
//npm install swiper
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function Slider({ data, slidesPerView = 3, actionIcon }) {
  return (
    <div className="container swiper">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        navigation
        pagination={{ clickable: true }}
        className="card-wrapper"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
          <div className="card-item">
            <img src={item.image} alt={item.title} className="card-image" />
            <p className={`badge ${item.badgeClass}`}>
              {item.badge}
            </p>
            <h2 className="card-title">{item.title}</h2>
            <button className="card-button">
              <img src={actionIcon} alt="action" />
             </button>
          </div>
        </SwiperSlide>
      ))}
      </Swiper>
    </div>
  )
}

export default Slider
