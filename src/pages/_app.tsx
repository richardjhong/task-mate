import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import useApollo from '../hooks/useApollo.ts';
import Layout from '../components/Layout.tsx';

const App = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps);
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default App;