import { UserProvider } from '../context';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar.component';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || EmptyLayout;
  return (
    <UserProvider>
      <Head>
        <link rel="stylesheet" href="/css/styles.css" />
      </Head>
      <Navbar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
      />
      {/* <Component {...pageProps} />; */}
    </UserProvider>
  );
}

const EmptyLayout = ({ children }) => <>{children}</>;

export default MyApp;
