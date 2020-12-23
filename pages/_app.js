import '../styles/globals.css'
import "../assets/styles/app.scss";
import Sidebar from  "../components/sidebar"

function MyApp({ Component, pageProps }) {
  return <>
  <Sidebar array={["home", "calculators", "links"]}></Sidebar>
  <Component {...pageProps} />
  </>
}

export default MyApp
