import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import App from './App'
import { theme } from './theme'

const qc = new QueryClient()




// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${(props) => props.theme.font};
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }
  h2 {
    color: ${(props) => props.theme.colors.highlight};
  }
`

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
