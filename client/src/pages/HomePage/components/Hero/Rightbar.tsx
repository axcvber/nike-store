import React from 'react'
import styled from 'styled-components'

export const Rightbar = () => {
  return (
    <RightBar>
      <RightBarItem>
        <RightBarLink href='https://www.facebook.com/nike' target='_blank' rel='noopener noreferrer'>
          Facebook
        </RightBarLink>
      </RightBarItem>
      <RightBarItem>
        <RightBarLink href='https://www.instagram.com/nike/' target='_blank' rel='noopener noreferrer'>
          Instagram
        </RightBarLink>
      </RightBarItem>
      <RightBarItem>
        <RightBarLink href='https://twitter.com/Nike' target='_blank' rel='noopener noreferrer'>
          Twitter
        </RightBarLink>
      </RightBarItem>
    </RightBar>
  )
}

const RightBar = styled.ul`
  user-select: none;
  display: flex;
  align-self: stretch;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  z-index: 99;
`

const RightBarItem = styled.li`
  writing-mode: vertical-rl;
  display: flex;
  align-items: flex-start;
  width: 30px;
  margin: 30px 0;
`

const RightBarLink = styled.a`
  color: ${(props) => props.theme.colors.secondary};
  transition: all ${(props) => props.theme.transition};
  &:hover {
    color: #000;
  }
`
