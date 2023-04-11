import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import useApollo from '../../hooks/useApollo.ts';

const App = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;