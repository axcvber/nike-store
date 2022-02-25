import React from 'react'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Flex } from '../theme'
import styled from 'styled-components'

interface IRcSlider {
  onSelectPrice: (slideValue: Array<number>) => void
  range: Array<number>
  query: Array<number>
}

export const RcSlider: React.FC<IRcSlider> = ({ range, query, onSelectPrice }) => {
  const [slideValue, setSlideValue] = React.useState({
    min: query[0],
    max: query[1],
  })

  React.useEffect(() => {
    setSlideValue({ min: query[0], max: query[1] })
  }, [query])

  const onSliderChange = (value: any) => {
    // console.log(value)
    setSlideValue({ min: value[0], max: value[1] })
  }

  const onMinChange = (value: any) => {
    setSlideValue((prev) => ({ min: +value, max: prev.max }))
  }

  const onMaxChange = (value: any) => {
    setSlideValue((prev) => ({ max: +value, min: prev.min }))
  }

  const onSend = () => {
    if (slideValue) {
      onSelectPrice([slideValue.min, slideValue.max])
    }
  }

  const keyUpHandler = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      onSend()
    }
  }

  return (
    <RangeWrapper>
      <Flex justify='space-between' padding='0 0 15px 0' alignItems='center'>
        <PriceInput>
          <label>от</label>
          <input
            type='text'
            style={{ width: 50 }}
            value={slideValue.min}
            onKeyUp={(e) => keyUpHandler(e)}
            onChange={(e) => onMinChange(e.target.value)}
          />
        </PriceInput>
        <PriceInput>
          <label>до</label>
          <input
            type='text'
            style={{ width: 50 }}
            value={slideValue.max}
            onKeyUp={(e) => keyUpHandler(e)}
            onChange={(e) => onMaxChange(e.target.value)}
          />
        </PriceInput>
      </Flex>
      <Range
        value={[slideValue.min, slideValue.max]}
        min={range[0]}
        max={range[1]}
        onChange={onSliderChange}
        onAfterChange={onSend}
        allowCross={false}
      />
    </RangeWrapper>
  )
}

const RangeWrapper = styled.div`
  width: 100%;
  .rc-slider {
    width: 90%;
    margin: 0 auto;
    .rc-slider-track {
      background-color: ${({ theme }) => theme.colors.primary};
    }
    .rc-slider-handle {
      top: 50%;
      transform: translate(-50%, -50%) !important;
      margin-top: 0;
      width: 18px;
      height: 18px;
      background-color: #fff;
      border: solid 2px ${({ theme }) => theme.colors.primary};
      &:hover,
      &:active,
      &.rc-slider-handle-dragging {
        box-shadow: 0 0 3px ${({ theme }) => theme.colors.primary} !important;
        border-color: ${({ theme }) => theme.colors.primary} !important;
      }
    }
  }
`

const PriceInput = styled.div`
  display: flex;
  align-items: flex-end;
  width: 50%;
  input {
    min-width: 75px;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    outline: none;
    padding: 3px 8px;
    border-radius: 3px;
  }
  label {
    margin-right: 5px;
    margin-bottom: 3px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.secondary};
  }
  &:last-child {
    justify-content: flex-end;
  }
`
