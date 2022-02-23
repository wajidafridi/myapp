import Head from 'next/head'
import styles from '../styles/home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My App</title>
        <meta name="description" content="My first app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          My App
        </h1>
      </main>

      <footer className={styles.footer}>
        © 2022 My App. All rights reserved.
      </footer>
    </div>
  )
}
