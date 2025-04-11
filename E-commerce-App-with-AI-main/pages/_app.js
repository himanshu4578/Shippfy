import { ProductProvider } from '../context/ProductContext';

function MyApp({ Component, pageProps }) {
    return (
        <ProductProvider>
            <Component {...pageProps} />
        </ProductProvider>
    );
}

export default MyApp; 