import React from 'react'
import { Featured } from './components/Featured'
import { Hero } from './components/Hero/Hero'
import { Container } from '../../theme'
import { SuggestSlider } from '../ProductPage/components/SuggestSlider'
const HomePage = () => {
  return (
    <Container as='main'>
      <Hero />
      <Featured />
      <SuggestSlider />
    </Container>
  )
}
export default HomePage
