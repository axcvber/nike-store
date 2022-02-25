import React from 'react'
import styled from 'styled-components'
import { Leftbar } from './Leftbar'
import { Rightbar } from './Rightbar'
import { HeroSlider } from './HeroSlider'
import { useMediaQuery } from 'react-responsive'

export const Hero = () => {
  const match = useMediaQuery({ maxWidth: '992px' })
  const table = useMediaQuery({ maxWidth: '768px' })
  return (
    <HeroContent>
      {!table && <Leftbar />}
      <HeroSlider />
      {!table && <Rightbar />}
      {!match && <NikeTitle>Nike</NikeTitle>}
    </HeroContent>
  )
}

const HeroContent = styled.section`
  width: 100%;
  min-height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.lg}) {
    min-height: auto;
    align-items: flex-start;
  }
`

const NikeTitle = styled.div`
  user-select: none;
  font-size: 130px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.gray};
  opacity: 0.4;
  position: absolute;
  height: 100%;
  top: -5%;
  left: 40%;
  text-transform: uppercase;
  width: 100px;
  word-wrap: break-word;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
