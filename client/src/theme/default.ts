import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  fonts: {
    main: "'Roboto', sans-serif",
    secondary: "'Ubuntu', sans-serif",
    third: "'Oswald', sans-serif",
  },
  colors: {
    bg: {
      primary: '#fff',
      secondary: '#ECECEC',
    },
    primary: '#111111',
    secondary: '#8d8d8d',
    borderColor: '#e5e5e5',
    gray: '#bcbcbc',
    error: '#fe0000',
    success: '#4aaf2d',
  },
  transition: '0.2s ease-in-out',
  breakpoints: {
    xs: '0',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
}
export { theme }
