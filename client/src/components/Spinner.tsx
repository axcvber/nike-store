import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'
import styled from 'styled-components'
import { Flex } from '../theme'

interface ISpinner {
  width?: number
  height?: number
  margin?: number
  radius?: number
  color?: string
}

export const Spinner: React.FC<ISpinner> = ({ width = 10, height = 40, margin = 5, radius = 2, color = '#111' }) => {
  return (
    <StyledSpinner>
      <ScaleLoader color={color} width={width} height={height} radius={radius} margin={margin} />
    </StyledSpinner>
  )
}

const StyledSpinner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .css-1xdhyk6 {
    display: flex;
    align-items: center;
  }
`
