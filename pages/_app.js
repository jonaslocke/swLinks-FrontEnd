import '../styles/globals.css'
import "../assets/styles/app.scss";
import Sidebar from  "../components/sidebar"

function MyApp({ Component, pageProps }) {
  return <>
  <Sidebar></Sidebar>
  <Component {...pageProps} />
  </>
}

export default MyApp
