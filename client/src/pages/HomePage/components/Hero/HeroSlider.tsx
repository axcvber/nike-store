import React from 'react'
import styled from 'styled-components'
import { Navigation, EffectCube } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/swiper.min.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-cube'
// import 'swiper/modules/navigation/navigation.min.css'
// import 'swiper/modules/effect-cube/effect-cube.min.css'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import rotateIcon from '../../../../image/icons/rotate.png'
import { ButtonLink, Title } from '../../../../theme'

const slides = [
  {
    images: [
      'https://res.cloudinary.com/doea7ahfk/image/upload/v1624709758/first_irpm1s.png',
      'https://res.cloudinary.com/doea7ahfk/image/upload/v1624703364/second_avud68.png',
      'https://res.cloudinary.com/doea7ahfk/image/upload/v1624706007/third_hzhsew.png',
    ],
    title: 'Air Max 97',
    price: '3 600',
    path: 'slide1',
  },
  {
    images: [
      'https://res.cloudinary.com/doea7ahfk/image/upload/v1624701775/first_xj57oa.png',
      'https://res.cloudinary.com/doea7ahfk/image/upload/v1624703016/second_y0xvwq.png',
      'https://res.cloudinary.com/doea7ahfk/image/upload/v1624704484/third_nqvt1s.png',
    ],
    title: 'Air Max 96 II',
    price: '2 500',
    path: 'slide2',
  },
  {
    images: [
      'https://res.cloudinary.com/doea7ahfk/image/upload/v1624705003/first_pbdyn4.png',
      'https://res.cloudinary.com/doea7ahfk/image/upload/v1624705717/second_mlufd9.png',
      'https://res.cloudinary.com/doea7ahfk/image/upload/v1624705877/third_rykcvx.png',
    ],
    title: 'Nike Air Tuned Max',
    price: '4 200',
    path: 'slide3',
  },
]

export const HeroSlider = () => {
  const [productLink, setProductLink] = React.useState<string>(slides[0].path)
  const prevRef = React.useRef(null)
  const nextRef = React.useRef(null)
  const rotateRef = React.useRef(null)
  return (
    <StyledSwiper
      modules={[Navigation]}
      autoHeight
      wrapperTag='ul'
      allowTouchMove={false}
      speed={600}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      onBeforeInit={(swiper: any) => {
        swiper.params.navigation.prevEl = prevRef.current
        swiper.params.navigation.nextEl = nextRef.current
      }}
      onSlideChangeTransitionStart={() => {
        let slides = Array.from(document.querySelectorAll('.heroSlide'))
        const activeSlide = slides.find((item: Element) => item.classList.contains('swiper-slide-active'))
        if (activeSlide) {
          const slideArr = activeSlide.getAttribute('data-href')
          if (slideArr) {
            setProductLink(slideArr)
          }
        }
      }}
    >
      {slides.map((slide, inx) => (
        <SwiperSlide key={`slide-${inx}`} className='heroSlide' tag='li' data-href={slide.path}>
          <HeroImage>
            <Swiper
              modules={[Navigation, EffectCube]}
              wrapperTag='ul'
              className='sliderImages'
              effect='cube'
              cubeEffect={{
                slideShadows: true,
                shadow: false,
              }}
              speed={600}
              allowTouchMove
              loop
              loopedSlides={2}
              navigation={{
                prevEl: rotateRef.current,
              }}
              onBeforeInit={(swiper: any) => {
                swiper.params.navigation.prevEl = rotateRef.current
              }}
              breakpoints={{
                992: {
                  allowTouchMove: false,
                },
              }}
            >
              {slide.images.map((img, inx) => (
                <SwiperSlide key={`slide-image-${inx}`} className='slideImage' tag='li'>
                  <img src={img} alt={`Slide ${inx}`} />
                </SwiperSlide>
              ))}

              <RotateBtn ref={rotateRef}>
                <img width={35} src={rotateIcon} alt='rotate' />
              </RotateBtn>
            </Swiper>
          </HeroImage>

          <HeroTitleContainer>
            <Subtitle>Nike</Subtitle>
            <HeroTitle>{slide.title}</HeroTitle>
            <Subtitle>{slide.price} UAH</Subtitle>
          </HeroTitleContainer>
        </SwiperSlide>
      ))}

      <SwiperControl>
        <ArrowBtn ref={prevRef}>
          <IoIosArrowBack />
        </ArrowBtn>
        <HeroBtn to={productLink}>Купить</HeroBtn>
        <ArrowBtn ref={nextRef}>
          <IoIosArrowForward />
        </ArrowBtn>
      </SwiperControl>
    </StyledSwiper>
  )
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  position: relative;
  padding: 20px 0 20px 0 !important;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
    max-width: 500px;
  }
  .heroSlide {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    @media screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
      flex-direction: column-reverse;
    }
  }
  .swiper-button-disabled {
    opacity: 0.4;
  }
`

const SwiperControl = styled.div`
  user-select: none;
  padding: 30px 0 0 60px;
  display: flex;
  align-items: center;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
    justify-content: center;
    padding-left: 0;
  }
`
const ArrowBtn = styled.div`
  svg {
    display: flex;
    color: ${(props) => props.theme.colors.primary};
    font-size: 50px;
    cursor: pointer;
  }
`
const HeroBtn = styled(ButtonLink)`
  margin: 0 60px;
  font-size: 25px;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    margin: 0 20px;
    font-size: 20px;
  }
`
const HeroImage = styled.div`
  user-select: none;
  width: 600px;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.xl}) {
    width: 500px;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
    width: 100%;
    margin-top: 20px;
  }

  .sliderImages {
    width: 100%;
    height: 100%;
  }

  .slideImage {
    height: 100%;
    display: flex;
    justify-content: center;
    img {
      max-width: 100%;
      max-height: 400px;
      display: block;
      object-fit: cover;
    }
  }
`

const HeroTitleContainer = styled.div`
  max-width: 350px;
  word-wrap: break-word;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.primary};
  @media screen and (max-width: ${(props) => props.theme.breakpoints.xl}) {
    max-width: 250px;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
    max-width: 100%;
    text-align: center;
  }
`
const HeroTitle = styled(Title)`
  margin: 20px 0;
  font-family: ${(props) => props.theme.fonts.third};
  font-weight: 700;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin: 10px 0;
  }
`
const Subtitle = styled.span`
  font-size: 40px;
  font-family: ${(props) => props.theme.fonts.main};
  @media screen and (max-width: ${(props) => props.theme.breakpoints.xl}) {
    font-size: 35px;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 25px;
  }
`

const RotateBtn = styled.div`
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 9;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
    display: none;
  }
`
