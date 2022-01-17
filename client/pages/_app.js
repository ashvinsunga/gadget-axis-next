import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar.component';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/styles.css" />
      </Head>
      <Navbar />
      <Component {...pageProps} />;
    </>
  );
}
export default MyApp;
