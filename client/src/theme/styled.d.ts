import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      main: string
      secondary: string
      third: string
    }
    colors: {
      bg: {
        primary: string
        secondary: string
      }
      primary: string
      secondary: string
      borderColor: string
      gray: string
      error: string
      success: string
    }
    transition: string
    breakpoints: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
  }
}
