import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
import { SessionProvider} from "next-auth/react";

const GlobalStyles = createGlobalStyle`
  url('https://fonts.googleapis.com/css2?family=Kanit&family=Roboto:wght@100&display=swap');
  body{
    padding: 0;
    margin: 0;
    font-family: 'Kanit', sans-serif;
    font-family: 'Roboto', sans-serif;
    background-color: #f0f0f0;
  }
`;

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>   
      </SessionProvider>   
    </>
  );
}
