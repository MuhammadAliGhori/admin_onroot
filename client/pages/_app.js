import "../style/global.css";
import Layout from "../components/Layout";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import Head from "next/head";
import { GoogleMapApiKey } from "../apiConfig";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { DataProvider } from "../website/DataContext";

export default function App({ Component, pageProps }) {
  console.log(pageProps, "pbrop");
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleMapApiKey}&libraries=places`;
    script.async = true; // Load script asynchronously
    document.head.appendChild(script);
    return () => {
      // Clean up the script element when the component unmounts
     // document.head.removeChild(script);
    };
  }, []);
  return (
    <>
    <GoogleOAuthProvider clientId="857509053172-0i159gn8a4alj7otkbmitj3q11lporau.apps.googleusercontent.com">

      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAX815OLgYZi7EbfQOgbBn6XeyCzwexMlM&libraries=places`}
        ></script>
      </Head>
      <Layout>
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </Layout>
      </GoogleOAuthProvider>
    </>
  );
}
