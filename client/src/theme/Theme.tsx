import React, { ReactChild, ReactElement } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from './default'
import { GlobalStyles } from './global'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

interface ThemeProps {
  children: ReactChild
}

export const Theme: React.FC<ThemeProps> = ({ children }): ReactElement => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Page>{children}</Page>
  </ThemeProvider>
)
