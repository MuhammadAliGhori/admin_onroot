import "../styles/globals.css";
import Layout from "../components/Layout";
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  console.log(pageProps, "pbrop");
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAX815OLgYZi7EbfQOgbBn6XeyCzwexMlM&libraries=places`}
        ></script>
      </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </>
  );
}
