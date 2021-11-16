import Layout from "../components/Layout"
import Head from 'next/head'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
