import React from 'react'
import { Navigation, Pagination, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import styled from 'styled-components'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export const SuggestSlider = () => {
  const prevRef = React.useRef(null)
  const nextRef = React.useRef(null)
  return (
    <StyledSuggestSlider
      modules={[Navigation, Scrollbar, Pagination]}
      spaceBetween={16}
      slidesPerView={'auto'}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      onBeforeInit={(swiper: any) => {
        swiper.params.navigation.prevEl = prevRef.current
        swiper.params.navigation.nextEl = nextRef.current
      }}
      scrollbar={{
        dragSize: 240,
      }}
      allowTouchMove={false}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide className='suggestSlide'>Slide 1</SwiperSlide>
      <SwiperSlide className='suggestSlide'>Slide 2</SwiperSlide>
      <SwiperSlide className='suggestSlide'>Slide 3</SwiperSlide>
      <SwiperSlide className='suggestSlide'>Slide 4</SwiperSlide>
      <SwiperSlide className='suggestSlide'>Slide 5</SwiperSlide>
      <SwiperSlide className='suggestSlide'>Slide 6</SwiperSlide>
      <SwiperSlide className='suggestSlide'>Slide 7</SwiperSlide>
      <ArrowSuggestSlider className='left-arrow' ref={prevRef}>
        <IoIosArrowBack />
      </ArrowSuggestSlider>
      <ArrowSuggestSlider className='right-arrow' ref={nextRef}>
        <IoIosArrowForward />
      </ArrowSuggestSlider>
      <SliderScrollbar className='suggestScrollbar'></SliderScrollbar>
    </StyledSuggestSlider>
  )
}

const SliderScrollbar = styled.div`
  .suggestSlide {
    width: 10px;
    height: 5px;
    background-color: black;
  }
`

const ArrowSuggestSlider = styled.button`
  height: 40px;
  width: 40px;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  &.left-arrow {
    left: 40px;
  }
  &.right-arrow {
    right: 40px;
  }
  svg {
    font-size: 20px;
  }
`

const StyledSuggestSlider = styled(Swiper)`
  width: 100%;
  position: relative;
  padding-bottom: 30px !important;
  /* 
  padding: 20px 0 20px 0; */
  /* @media screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
    max-width: 500px;
  } */
  .suggestSlide {
    width: 300px;
    height: 400px;
    background-color: red;
  }

  .swiper-scrollbar {
    height: 2px !important;
    bottom: 0;
    background-color: #dfdfdf;
  }
  .swiper-scrollbar-drag {
    background-color: #4c4c4c;
  }
`
