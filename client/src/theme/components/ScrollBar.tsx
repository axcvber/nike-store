import React from 'react'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import Scrollbars from 'react-custom-scrollbars'

export const ScrollBar: React.FC<{ children: React.ReactChild }> = ({ children }) => {
  return (
    <StyledScrollBar
      renderTrackVertical={(props) => <div {...props} className='track-vertical' />}
      renderThumbVertical={(props) => <div {...props} className='thumb-vertical' />}
      renderView={(props) => <div {...props} className='view' />}
    >
      {children}
    </StyledScrollBar>
  )
}

const StyledScrollBar = styled(Scrollbars)`
  height: 100%;

  /* .simplebar-scrollbar {
    &:before {
      background-color: ${({ theme }) => theme.colors.secondary};
      opacity: 1;
    } 
  }*/
  .track-vertical {
    top: 5px;
    bottom: 5px;
    right: 0;
  }
  .thumb-vertical {
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 5px;
  }

  .view {
    padding-right: 20px;
    /* padding-bottom: 10px; */
  }
`
