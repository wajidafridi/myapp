import Head from 'next/head'
import { useState } from 'react'
import styles from './index.module.scss'

export default function Home() {
    const [feedbackList, setFeedbackList] = useState([])
    return (
        <div className={styles.container}>
            <Head>
                <title>My App</title>
                <meta name="description" content="My first app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <h1 className={styles.title}>
                    My App
                </h1>
            </header>
            <main className={styles.main}>

                <div className={styles.inputContainer}>
                    <h5 className={styles.title}>Enter Feedback</h5>
                    <textarea className={styles.inputbox} />
                    <button className={styles.submitBtn}>Submit</button>
                </div>
                <div className={styles.feedbackList}>
                    <h5 className={styles.title}>Feedback</h5>
                    {feedbackList && feedbackList.length > 0 ? feedbackList.map((item, index) =>
                        <div key={index} className={styles.feedbackItem}>{item.description}</div>
                    ) : "No Record Found"}
                </div>

            </main>

            <footer className={styles.footer}>
                © 2022 My App. All rights reserved.
            </footer>
        </div>
    )
}
