import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyles = createGlobalStyle`
${normalize}

* {
  -webkit-tap-highlight-color: transparent;
  /* -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; */
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


body { 
  font-family: ${(props) => props.theme.fonts.main};
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

h1,h2,h3,h4,h5,h6 {
  margin: 0;
}
button {
  border: none;
  outline: none;
}

a {
  text-decoration: none;
}
`
