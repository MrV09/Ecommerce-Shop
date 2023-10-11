import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  url('https://fonts.googleapis.com/css2?family=Kanit&family=Roboto:wght@100&display=swap');
  body{
    padding: 0;
    margin: 0;
    font-family: 'Kanit', sans-serif;
    font-family: 'Roboto', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
