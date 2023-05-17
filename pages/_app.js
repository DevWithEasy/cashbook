import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from '../store/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </PersistGate>
  </Provider>
}
export default MyApp
