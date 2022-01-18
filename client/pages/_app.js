import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar.component';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/styles.css" />
      </Head>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
      />
      <Component {...pageProps} />;
    </>
  );
}
export default MyApp;
