import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
const client = new QueryClient({
    defaultOptions: {
        queries: { refetchOnMount: false },
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={client}>
            <Component {...pageProps} />
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default MyApp;
