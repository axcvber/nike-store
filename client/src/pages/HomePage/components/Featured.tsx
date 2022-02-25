import React from 'react'
import styled from 'styled-components'
import img from '../../../image/featured.jpg'
import { ButtonLink, H1, P } from '../../../theme'

const StyledFeatured = styled.section`
  width: 100%;
  position: relative;
  margin: 20px 0;
  img {
    max-width: 100%;
    object-fit: cover;
    object-position: 0 0;
    display: block;
    @media screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
      min-height: 500px;
    }
  }
`

const FeaturedContent = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  max-width: 400px;
  padding: 40px;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
    padding: 20px;
  }
`

const FeaturedSubtitle = styled(P)`
  max-width: 260px;
  margin: 10px 0 20px 0;
`

export const Featured = () => {
  return (
    <StyledFeatured>
      <img src={img} alt='featured_image' />
      <FeaturedContent>
        <H1 color='white'>Всегда на повторе</H1>
        <FeaturedSubtitle color='white'>Build your rotation with shoes always $100 & under.</FeaturedSubtitle>
        <ButtonLink color='white' to='/shop'>
          В магазин
        </ButtonLink>
      </FeaturedContent>
    </StyledFeatured>
  )
}
